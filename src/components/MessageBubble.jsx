import React from 'react';

export default function MessageBubble({ message }) {
  const formatTime = (date) => {
    return new Intl.DateTimeFormat('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    }).format(date);
  };

  return (
    <div className={`message-wrapper ${message.sender}`}>
      <div className="message-bubble">
        {message.text}
      </div>
      <div className="message-time">
        {formatTime(message.timestamp)}
      </div>
    </div>
  );
}
