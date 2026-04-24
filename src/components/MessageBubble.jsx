import React from 'react';
import { parseMedicalTerms } from '../utils/glossary';

export default function MessageBubble({ message }) {
  const isBot = message.sender === 'bot';
  const parsedContent = parseMedicalTerms(message.text);

  return (
    <div className={`message-wrapper ${isBot ? 'bot-wrapper' : 'user-wrapper'}`}>
      <div className={`message-bubble ${isBot ? 'bot-bubble' : 'user-bubble'}`}>
        <div className="message-text">
          {Array.isArray(parsedContent) ? parsedContent.map((part, i) => (
            typeof part === 'string' ? part : (
              <span key={i} className="medical-term" data-definition={part.definition}>
                {part.term}
              </span>
            )
          )) : message.text}
        </div>
        <div className="message-time">
          {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </div>
      </div>
    </div>
  );
}
