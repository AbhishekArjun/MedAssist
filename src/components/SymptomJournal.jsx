import React, { useState } from 'react';

export default function SymptomJournal() {
  const [mood, setMood] = useState(3);
  const [note, setNote] = useState('');
  const [logs, setLogs] = useState([
    { id: 1, date: 'Today, 8:00 AM', mood: 4, note: 'Slight headache, but feeling okay.' },
    { id: 2, date: 'Yesterday, 9:00 PM', mood: 3, note: 'Tired after a long day.' }
  ]);

  const handleLog = (e) => {
    e.preventDefault();
    if (note.trim()) {
      const newLog = {
        id: Date.now(),
        date: 'Just now',
        mood,
        note
      };
      setLogs([newLog, ...logs].slice(0, 3)); // keep last 3
      setNote('');
      setMood(3);
    }
  };

  const getMoodEmoji = (level) => {
    switch (parseInt(level)) {
      case 1: return '😞';
      case 2: return '😕';
      case 3: return '😐';
      case 4: return '🙂';
      case 5: return '😄';
      default: return '😐';
    }
  };

  return (
    <div className="symptom-journal health-panel glass-panel animate-card" style={{ animationDelay: '0.2s', display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <div className="panel-header" style={{ marginBottom: 0 }}>
        <h3>📝 Symptom & Mood Journal</h3>
      </div>
      
      <form onSubmit={handleLog} className="journal-form" style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <div className="mood-selector" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <label htmlFor="mood-slider" style={{ color: '#8892b0', fontSize: '0.9rem', flex: 1 }}>How are you feeling?</label>
          <input 
            id="mood-slider"
            type="range" 
            min="1" max="5" 
            value={mood} 
            onChange={(e) => setMood(e.target.value)}
            style={{ width: '100px', cursor: 'pointer' }}
          />
          <span style={{ fontSize: '1.5rem', width: '30px', textAlign: 'center' }}>{getMoodEmoji(mood)}</span>
        </div>
        
        <input 
          type="text" 
          placeholder="Any symptoms or notes today?" 
          value={note}
          onChange={(e) => setNote(e.target.value)}
          className="chat-input"
          style={{ padding: '10px', backgroundColor: 'rgba(2, 12, 27, 0.7)', border: '1px solid rgba(100, 255, 218, 0.2)', borderRadius: '8px', color: '#e6f1ff', outline: 'none' }}
        />
        <button type="submit" className="auth-btn" disabled={!note.trim()} style={{ opacity: note.trim() ? 1 : 0.5, cursor: note.trim() ? 'pointer' : 'not-allowed', marginTop: '4px' }}>
          Save Entry
        </button>
      </form>

      <div className="journal-history" style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <h4 style={{ color: '#ccd6f6', fontSize: '0.85rem', marginBottom: '4px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Recent Logs</h4>
        {logs.map(log => (
          <div key={log.id} className="journal-entry" style={{ padding: '8px 12px', backgroundColor: 'rgba(255, 255, 255, 0.05)', borderRadius: '6px', fontSize: '0.85rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
              <span style={{ color: '#64ffda', fontWeight: 500 }}>{log.date}</span>
              <span>{getMoodEmoji(log.mood)}</span>
            </div>
            <p style={{ color: '#8892b0', margin: 0, lineHeight: 1.4 }}>{log.note}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
