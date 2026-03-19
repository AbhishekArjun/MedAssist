import React from 'react';

export default function EmergencyContacts() {
  const callEmergencyNumber = (number) => {
    window.location.href = `tel:${number}`;
  };

  return (
    <div className="emergency-contacts health-panel glass-panel animate-card" style={{ animationDelay: '0.3s', border: '1px solid rgba(255, 100, 100, 0.3)', backgroundColor: 'rgba(100, 20, 20, 0.1)' }}>
      <div className="panel-header" style={{ marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
        <span style={{ fontSize: '1.5rem' }}>🚨</span>
        <h3 style={{ color: '#ff6b6b' }}>Emergency / SOS</h3>
      </div>
      
      <p style={{ color: '#ccd6f6', fontSize: '0.9rem', marginBottom: '16px', lineHeight: 1.5 }}>
        If you are experiencing a life-threatening medical emergency or severe mental health crisis, please seek immediate help.
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <button 
          onClick={() => callEmergencyNumber('911')}
          className="auth-btn" 
          style={{ backgroundColor: 'rgba(255, 70, 70, 0.8)', color: 'white', fontWeight: 'bold', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px' }}
        >
          <span>📞</span> Call 911 (Emergency)
        </button>

        <button 
          onClick={() => callEmergencyNumber('988')}
          className="auth-btn" 
          style={{ backgroundColor: 'transparent', border: '1px solid rgba(255, 70, 70, 0.5)', color: '#ff6b6b', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px' }}
        >
          <span>💬</span> Call 988 (Crisis Lifeline)
        </button>

        <div style={{ marginTop: '8px', paddingTop: '16px', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
          <h4 style={{ color: '#8892b0', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '8px' }}>Primary Contact</h4>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: 'rgba(255,255,255,0.05)', padding: '10px 12px', borderRadius: '6px' }}>
            <div>
              <div style={{ color: '#e6f1ff', fontSize: '0.95rem', fontWeight: 500 }}>Jane Doe</div>
              <div style={{ color: '#8892b0', fontSize: '0.8rem' }}>Spouse</div>
            </div>
            <button 
              onClick={() => callEmergencyNumber('555-0199')}
              style={{ background: 'none', border: 'none', color: '#64ffda', cursor: 'pointer', fontSize: '1.2rem', padding: '4px' }}
              title="Call Jane Doe"
            >
              📞
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
