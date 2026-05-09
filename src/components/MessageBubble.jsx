import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { parseMedicalTerms } from '../utils/glossary';

export default function MessageBubble({ message }) {
  const isBot = message.sender === 'bot';

  // For the user, we can still use the medical term parser on plain text.
  // For the bot, we render Markdown to give it that rich ChatGPT feel.
  const renderUserContent = () => {
    const parsedContent = parseMedicalTerms(message.text);
    if (Array.isArray(parsedContent)) {
      return parsedContent.map((part, i) => (
        typeof part === 'string' ? part : (
          <span key={i} className="medical-term" data-definition={part.definition}>
            {part.term}
          </span>
        )
      ));
    }
    return message.text;
  };

  return (
    <div className={`message-wrapper ${isBot ? 'bot-wrapper' : 'user-wrapper'}`}>
      <div className={`message-bubble ${isBot ? 'bot-bubble' : 'user-bubble'}`}>
        <div className="message-text">
          {isBot ? (
            <ReactMarkdown remarkPlugins={[remarkGfm]} className="markdown-body">
              {message.text}
            </ReactMarkdown>
          ) : (
            renderUserContent()
          )}
        </div>
        <div className="message-time">
          {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </div>
      </div>
    </div>
  );
}
