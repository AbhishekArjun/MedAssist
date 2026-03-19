import React from 'react';
import { useNavigate } from 'react-router-dom';
import MedicationTracker from '../components/MedicationTracker';
import AppointmentScheduler from '../components/AppointmentScheduler';
import WaterIntakeTracker from '../components/WaterIntakeTracker';
import SymptomJournal from '../components/SymptomJournal';
import EmergencyContacts from '../components/EmergencyContacts';

export default function Dashboard() {
  const navigate = useNavigate();

  // Clinical data for dashboard
  const metrics = [
    { label: "Heart Rate", value: "72 bpm", trend: "Normal" },
    { label: "Blood Pressure", value: "118/75", trend: "-2 mmHg" },
    { label: "Sleep Last Night", value: "7.5 hrs", trend: "Optimal" },
    { label: "Upcoming Appts", value: "1", trend: "Oct 24" },
  ];

  return (
    <div className="dashboard-layout">
      
      {/* Sidebar Navigation */}
      <aside className="dashboard-sidebar health-panel glass-panel">
        <div className="sidebar-header">
          <div className="header-avatar logo">✚</div>
          <h2>MedAssist</h2>
        </div>
        <nav className="sidebar-nav">
          <button className="nav-item active">📊 Health Overview</button>
          <button className="nav-item" onClick={() => navigate('/chat')}>🩺 AI Medical Assistant</button>
          <button className="nav-item">📋 Lab Results</button>
          <button className="nav-item">⚙️ Settings</button>
        </nav>
        <div className="sidebar-footer">
          <button className="logout-btn" onClick={() => navigate('/login')}>Secure Sign Out</button>
        </div>
      </aside>

      {/* Main Dashboard Content */}
      <main className="dashboard-main">
        <header className="dashboard-header">
          <h1>Welcome, Patient</h1>
          <p>Here is your daily clinical health summary.</p>
        </header>

        <section className="metrics-grid">
          {metrics.map((m, idx) => (
            <div key={idx} className="metric-card health-panel glass-panel animate-card" style={{ animationDelay: `${idx * 0.1}s` }}>
              <h3>{m.label}</h3>
              <div className="metric-value">{m.value}</div>
              <div className="metric-trend trend-neutral">{m.trend}</div>
            </div>
          ))}
        </section>
        <div className="dashboard-grid">
          <div className="dashboard-main-column" style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
            <section className="dashboard-medications glass-panel animate-card" style={{ animationDelay: '0.4s' }}>
              <MedicationTracker />
            </section>
            
            <WaterIntakeTracker />
            
            <SymptomJournal />

            <section className="dashboard-actions animate-card" style={{ animationDelay: '0.5s' }}>
              <div className="action-card health-panel cta-card glass-panel" style={{ background: 'rgba(10, 25, 47, 0.5)', borderColor: 'rgba(100, 255, 218, 0.2)' }}>
                <h2 style={{ color: '#E6F1FF' }}>Need medical advice?</h2>
                <p>Our HIPAA-compliant AI medical assistant is here to help safely triage your concerns.</p>
                <button className="auth-btn" onClick={() => navigate('/chat')}>Open MedAssist Chat</button>
              </div>
            </section>
          </div>

          <div className="dashboard-side-column animate-card" style={{ animationDelay: '0.6s', display: 'flex', flexDirection: 'column', gap: '32px' }}>
            <AppointmentScheduler />
            <EmergencyContacts />
          </div>
        </div>
      </main>

    </div>
  );
}
