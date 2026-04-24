import React from 'react';
import { useNavigate } from 'react-router-dom';
import MedicationTracker from '../components/MedicationTracker';
import AppointmentScheduler from '../components/AppointmentScheduler';
import WaterIntakeTracker from '../components/WaterIntakeTracker';
import SymptomJournal from '../components/SymptomJournal';
import EmergencyContacts from '../components/EmergencyContacts';
import WellnessTimeline from '../components/WellnessTimeline';
import HospitalMap from '../components/HospitalMap';

export default function Dashboard() {
  const navigate = useNavigate();

  // Clinical data for dashboard
  const metrics = [
    { label: "Heart Rate", value: "72", unit: "bpm", trend: "Normal", icon: "❤️" },
    { label: "Blood Pressure", value: "118/75", unit: "", trend: "-2 mmHg", icon: "🩸" },
    { label: "Sleep Last Night", value: "7.5", unit: "hrs", trend: "Optimal", icon: "🌙" },
    { label: "Daily Hydration", value: "1.8", unit: "L", trend: "Goal: 2.5L", icon: "💧", progress: 72 },
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
              <div className="metric-header">
                <h3>{m.label}</h3>
                <span className={m.label === "Heart Rate" ? "pulse-icon" : ""}>{m.icon}</span>
              </div>
              <div className="metric-value">
                {m.value} <span className="unit-label">{m.unit}</span>
              </div>
              {m.progress !== undefined ? (
                <div className="hydration-progress-container">
                  <div className="hydration-bar" style={{ width: `${m.progress}%` }}></div>
                </div>
              ) : (
                <div className={`metric-trend ${m.trend === 'Normal' || m.trend === 'Optimal' ? 'trend-stable' : 'trend-neutral'}`}>
                  {m.trend}
                </div>
              )}
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
            
            <WellnessTimeline />

            <section className="dashboard-actions animate-card" style={{ animationDelay: '0.5s' }}>
              <div className="action-card health-panel cta-card glass-panel" style={{ background: 'rgba(10, 25, 47, 0.5)', borderColor: 'rgba(100, 255, 218, 0.2)' }}>
                <h2 style={{ color: '#E6F1FF' }}>Need medical advice?</h2>
                <p>Our HIPAA-compliant AI medical assistant is here to help safely triage your concerns.</p>
                <button className="auth-btn" onClick={() => navigate('/chat')}>Open MedAssist Chat</button>
              </div>
            </section>
          </div>

          <div className="dashboard-side-column animate-card" style={{ animationDelay: '0.6s', display: 'flex', flexDirection: 'column', gap: '32px' }}>
            <HospitalMap />
            <AppointmentScheduler />
            <EmergencyContacts />
          </div>
        </div>
      </main>

    </div>
  );
}
