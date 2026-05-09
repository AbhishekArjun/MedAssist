import React, { useState, useRef, useEffect } from 'react';
import MessageBubble from './MessageBubble';
import ChatInput from './ChatInput';
import { generateWellnessResponse } from '../utils/mockAi';

export default function ChatContainer() {
  const [messages, setMessages] = useState([
    {
      id: '1',
      text: "Hello! I am MedAssist, your secure AI Healthcare Assistant. How can I help triage your symptoms today?",
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [voiceEnabled, setVoiceEnabled] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);
  
  // Clean up speech synthesis on unmount to prevent phantom talking
  useEffect(() => {
    return () => {
      if (window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  const speakText = (text) => {
    if (!voiceEnabled || !window.speechSynthesis) return;

    // Stop any current speaking
    window.speechSynthesis.cancel();

    // Strip markdown formatting for cleaner speech
    const cleanText = text.replace(/[*_~`#]/g, '');

    const utterance = new SpeechSynthesisUtterance(cleanText);
    
    // Look for a comforting, professional voice if available (like Google UK English Female)
    const voices = window.speechSynthesis.getVoices();
    const preferredVoice = voices.find(v => v.name.includes("Female") || v.name.includes("Samantha") || v.lang === "en-GB");
    if (preferredVoice) utterance.voice = preferredVoice;
    
    utterance.rate = 0.95; // Slightly slower, more clinical pacing
    utterance.pitch = 1.0;
    
    window.speechSynthesis.speak(utterance);
  };
  
  const toggleVoice = () => {
    if (voiceEnabled) {
      window.speechSynthesis.cancel();
    }
    setVoiceEnabled(!voiceEnabled);
  };
  
  const handlePrint = () => {
    window.print();
  };

  const handleSendMessage = async (text) => {
    if (!text.trim()) return;

    // Add user message
    const newUserMsg = {
      id: Date.now().toString(),
      text,
      sender: 'user',
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, newUserMsg]);
    setIsTyping(true);

    try {
      // Use dynamic hostname to avoid DNS conflicts between localhost, 127.0.0.1, and [::1]
      const hostname = window.location.hostname === '0.0.0.0' ? '127.0.0.1' : window.location.hostname;
      const response = await fetch(`http://${hostname}:3001/api/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: [...messages, newUserMsg] })
      });

      if (!response.ok) {
        throw new Error("Server error - " + response.statusText);
      }

      const contentType = response.headers.get('content-type') || '';
      if (contentType.includes('application/json')) {
        const data = await response.json();
        if (data.error) throw new Error(data.error);
        
        setSuggestions(data.suggestions || []);
        const newBotMsg = {
          id: (Date.now() + 1).toString(),
          text: data.text || "I'm having trouble retrieving medical data right now.",
          sender: 'bot',
          timestamp: new Date()
        };
        setMessages(prev => [...prev, newBotMsg]);
        speakText(newBotMsg.text);
      } else {
        // Streaming mode
        const reader = response.body.getReader();
        const decoder = new TextDecoder('utf-8');
        let botText = '';
        const botMsgId = (Date.now() + 1).toString();
        
        setMessages(prev => [...prev, {
          id: botMsgId,
          text: '',
          sender: 'bot',
          timestamp: new Date()
        }]);

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          
          const chunk = decoder.decode(value, { stream: true });
          const lines = chunk.split('\n').filter(line => line.trim() !== '');
          for (const line of lines) {
            if (line.includes('[DONE]')) break;
            if (line.startsWith('data: ')) {
               try {
                 const dataObj = JSON.parse(line.replace(/^data: /, ''));
                 if (dataObj.content) {
                   botText += dataObj.content;
                   setMessages(prev => prev.map(msg => 
                     msg.id === botMsgId ? { ...msg, text: botText } : msg
                   ));
                   scrollToBottom();
                 }
               } catch(e) {}
            }
          }
        }
        
        if (botText.includes('SUGGESTIONS:')) {
           const parts = botText.split('SUGGESTIONS:');
           botText = parts[0].trim();
           const suggestions = parts[1].split(';').map(s => s.trim().replace(/^[\s*-]+/, '')).filter(s => s.length > 0);
           setSuggestions(suggestions.slice(0, 3));
           setMessages(prev => prev.map(msg => 
             msg.id === botMsgId ? { ...msg, text: botText } : msg
           ));
        }
        
        speakText(botText);
      }
      
    } catch (error) {
      console.error("AI fetch error:", error);
      
      // FALLBACK LOGIC: Use the local mock AI if the server is unreachable
      const fallbackText = generateWellnessResponse(text);
      const isClinical = ['fever', 'headache', 'nausea', 'vomit', 'cough', 'cold', 'flu', 'sore throat', 'pain'].some(s => text.toLowerCase().includes(s));
      
      const botResponse = isClinical 
        ? `${fallbackText}\n\n*(Diagnostic Note: Backend connection failed. Running in offline triage mode. Error: ${error.message})*`
        : `${fallbackText}\n\n*(Note: Health database is currently offline)*`;

      const newBotMsg = {
        id: (Date.now() + 1).toString(),
        text: botResponse,
        sender: 'bot',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, newBotMsg]);
      setSuggestions(["What else should I do?", "When to see a doctor?"]);
      speakText(newBotMsg.text);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="chat-container">
      {/* Utility Bar for Unique capstone features */}
      <div className="chat-utilities hide-on-print">
        <button 
           className={`utility-btn ${voiceEnabled ? 'active' : ''}`} 
           onClick={toggleVoice}
           title="Toggle Voice Assistant"
        >
          {voiceEnabled ? '🔊 Voice On' : '🔈 Voice Off'}
        </button>
        <button 
           className="utility-btn btn-export" 
           onClick={handlePrint}
           title="Export Consultation Report"
        >
          📄 Export Report
        </button>
      </div>

      <div className="symptom-quick-actions hide-on-print">
        <button className="quick-action-btn" onClick={() => handleSendMessage("I have a fever and chills.")}>🌡️ Fever</button>
        <button className="quick-action-btn" onClick={() => handleSendMessage("I have a severe headache.")}>🤕 Headache</button>
        <button className="quick-action-btn" onClick={() => handleSendMessage("I am feeling nauseous.")}>🤢 Nausea</button>
        <button className="quick-action-btn" onClick={() => handleSendMessage("I need to refill my prescription.")}>💊 Rx Refill</button>
      </div>

      <div className="messages-area print-area">
        {/* Print-only header */}
        <div className="print-header">
           <h2>MedAssist Official Consultation Report</h2>
           <p>Date: {new Date().toLocaleDateString()}</p>
           <hr/>
        </div>

        {messages.map(msg => (
          <MessageBubble key={msg.id} message={msg} />
        ))}
        {isTyping && (
          <div className="typing-indicator" aria-label="Medical AI is typing">
            <div className="typing-dot"></div>
            <div className="typing-dot"></div>
            <div className="typing-dot"></div>
          </div>
        )}
        
        {!isTyping && suggestions.length > 0 && (
          <div className="ai-suggestions hide-on-print">
            {suggestions.map((theory, idx) => (
              <button 
                key={idx} 
                className="suggestion-chip" 
                onClick={() => {
                  handleSendMessage(theory);
                  setSuggestions([]);
                }}
              >
                {theory}
              </button>
            ))}
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>
      <div className="hide-on-print">
        <ChatInput onSend={handleSendMessage} disabled={isTyping} />
      </div>
    </div>
  );
}
