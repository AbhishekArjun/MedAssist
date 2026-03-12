import React, { useState, useRef, useEffect } from 'react';
import MessageBubble from './MessageBubble';
import ChatInput from './ChatInput';

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
      const response = await fetch('http://localhost:3001/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: [...messages, newUserMsg] })
      });

      if (!response.ok) {
        throw new Error("Server error - " + response.statusText);
      }

      const data = await response.json();
      
      if (data.error) {
         throw new Error(data.error);
      }

      const newBotMsg = {
        id: (Date.now() + 1).toString(),
        text: data.text || "I'm having trouble retrieving medical data right now.",
        sender: 'bot',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, newBotMsg]);
      speakText(newBotMsg.text);
      
    } catch (error) {
      console.error("AI fetch error:", error);
      const errorMsg = `Error connecting to medical database! Details: ${error.message}`;
      setMessages(prev => [
        ...prev, 
        {
          id: (Date.now() + 1).toString(),
          text: errorMsg,
          sender: 'bot',
          timestamp: new Date()
        }
      ]);
      speakText("Error connecting to medical database.");
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
        <div ref={messagesEndRef} />
      </div>
      <div className="hide-on-print">
        <ChatInput onSend={handleSendMessage} disabled={isTyping} />
      </div>
    </div>
  );
}
