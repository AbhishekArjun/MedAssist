import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import ChatContainer from './components/ChatContainer';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Dashboard from './pages/Dashboard';

const affirmations = [
  "Prioritize your health today.",
  "Remember to take your prescribed medications.",
  "Staying hydrated is key to a healthy immune system.",
  "Your health journey is a marathon, not a sprint.",
  "Reach out to a medical professional if you have concerns."
];

// Helper to wrap the chat interface cleanly without changing its layout behavior
const ChatWrapper = () => (
  <div className="app-layout">
    <div className="health-panel main-chat-window">
      <header className="chat-header">
        <div className="header-avatar">✚</div>
        <div className="header-info">
          <h1>MedAssist Chat</h1>
          <p>Your AI Healthcare Assistant</p>
        </div>
      </header>
      <ChatContainer />
    </div>
  </div>
);

function AppContent() {
  const [quote, setQuote] = useState("");
  const location = useLocation();

  useEffect(() => {
    setQuote(affirmations[Math.floor(Math.random() * affirmations.length)]);
  }, []);

  // Only show the affirmation on the Chat and Dashboard, not auth pages
  const isAuthPage = location.pathname === '/login' || location.pathname === '/signup';

  return (
    <>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/chat" element={<ChatWrapper />} />
      </Routes>
    </>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
