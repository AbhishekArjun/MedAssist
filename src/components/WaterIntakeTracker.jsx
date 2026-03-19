import React, { useState } from 'react';

export default function WaterIntakeTracker() {
  const goal = 8; // 8 glasses a day
  const [intake, setIntake] = useState(0);

  const addWater = () => {
    if (intake < goal) {
      setIntake(intake + 1);
    }
  };

  const removeWater = () => {
    if (intake > 0) {
      setIntake(intake - 1);
    }
  };

  const progressPercent = (intake / goal) * 100;

  return (
    <div className="water-tracker health-panel glass-panel animate-card" style={{ animationDelay: '0.4s' }}>
      <div className="water-header">
        <h3>💧 Daily Hydration</h3>
        <span className="water-progress-text">{intake} / {goal} Glasses</span>
      </div>
      
      <div className="progress-bar-container">
        <div 
          className="progress-bar-fill water-bar" 
          style={{ 
            width: `${progressPercent}%`,
            background: 'linear-gradient(90deg, #112240, #00B4D8)',
            boxShadow: '0 0 15px rgba(0, 180, 216, 0.4)'
          }}
        ></div>
      </div>

      <div className="water-controls">
        <button className="water-btn" onClick={removeWater} disabled={intake === 0}>
           - Undo
        </button>
        <button className="water-btn add-btn" onClick={addWater} disabled={intake === goal}>
           + Add Glass (8oz)
        </button>
      </div>
    </div>
  );
}
