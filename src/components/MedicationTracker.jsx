import React, { useState } from 'react';

export default function MedicationTracker() {
  const [medications, setMedications] = useState([
    { id: 1, name: 'Lisinopril', dosage: '10mg', time: '8:00 AM', taken: false, icon: '💊' },
    { id: 2, name: 'Atorvastatin', dosage: '20mg', time: '8:00 PM', taken: false, icon: '💊' },
    { id: 3, name: 'Vitamin D3', dosage: '2000 IU', time: 'Anytime', taken: true, icon: '☀️' }
  ]);
  const [newMedName, setNewMedName] = useState('');
  const [newMedDosage, setNewMedDosage] = useState('');
  const [newMedTime, setNewMedTime] = useState('');

  const toggleTaken = (id) => {
    setMedications(medications.map(med => 
      med.id === id ? { ...med, taken: !med.taken } : med
    ));
  };

  const handleAddMedication = (e) => {
    e.preventDefault();
    if (!newMedName.trim() || !newMedDosage.trim()) return;
    
    const newMed = {
      id: Date.now(),
      name: newMedName,
      dosage: newMedDosage,
      time: newMedTime || 'Anytime',
      taken: false,
      icon: '💊'
    };
    
    setMedications([...medications, newMed]);
    setNewMedName('');
    setNewMedDosage('');
    setNewMedTime('');
  };

  const completedCount = medications.filter(m => m.taken).length;
  const progressPercent = (completedCount / medications.length) * 100;

  return (
    <div className="med-tracker health-panel">
      <div className="med-header">
        <h3>Daily Prescriptions</h3>
        <span className="med-progress-text">{completedCount} / {medications.length} Taken</span>
      </div>
      
      <div className="progress-bar-container">
        <div className="progress-bar-fill" style={{ width: `${progressPercent}%` }}></div>
      </div>

      <div className="med-list">
        {medications.map(med => (
          <div key={med.id} className={`med-item ${med.taken ? 'med-taken' : ''}`} onClick={() => toggleTaken(med.id)}>
            <div className="med-icon">{med.icon}</div>
            <div className="med-info">
              <h4>{med.name} <span className="med-dosage">{med.dosage}</span></h4>
              <p className="med-time">Scheduled: {med.time}</p>
            </div>
            <div className="med-checkbox">
              {med.taken ? '✓' : ''}
            </div>
          </div>
        ))}
      </div>

      <form className="add-med-form" onSubmit={handleAddMedication}>
        <input 
          type="text" 
          placeholder="Medication Name" 
          className="add-med-input"
          value={newMedName}
          onChange={(e) => setNewMedName(e.target.value)}
        />
        <input 
          type="text" 
          placeholder="Dosage (e.g. 10mg)" 
          className="add-med-input"
          value={newMedDosage}
          onChange={(e) => setNewMedDosage(e.target.value)}
        />
        <input 
          type="text" 
          placeholder="Time (e.g. 8 AM)" 
          className="add-med-input"
          value={newMedTime}
          onChange={(e) => setNewMedTime(e.target.value)}
        />
        <button type="submit" className="add-med-btn">+ Add</button>
      </form>
    </div>
  );
}
