import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

export default function SignUp() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSignUp = (e) => {
    e.preventDefault();
    if (name && email && password) {
      navigate('/dashboard');
    } else {
      setError('Please fill in all fields to register.');
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card health-panel">
        <div className="auth-header">
          <div className="header-avatar logo">✚</div>
          <h1>Patient Registration</h1>
          <p>Create your secure medical profile</p>
        </div>
        
        {error && <div className="auth-error">{error}</div>}
        
        <form onSubmit={handleSignUp} className="auth-form">
          <div className="form-group">
            <label htmlFor="name">Legal Full Name</label>
            <input 
              type="text" 
              id="name" 
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="John Doe"
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input 
              type="email" 
              id="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="patient@example.com"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="password">Create Password</label>
            <input 
              type="password" 
              id="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Must be at least 8 characters"
            />
          </div>
          
          <button type="submit" className="auth-btn">Register Account</button>
        </form>
        
        <div className="auth-footer">
          <p>Already Registered? <Link to="/login">Sign In</Link></p>
        </div>
      </div>
    </div>
  );
}
