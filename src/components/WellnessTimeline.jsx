import React from 'react';

const WellnessTimeline = () => {
  const history = [
    { day: "Today", symptom: "Slight Fatigue", status: "Stable", time: "08:45 AM", severity: "stable" },
    { day: "Yesterday", symptom: "Mild Headache", status: "Resolved", time: "02:15 PM", severity: "warning" },
    { day: "Oct 22", symptom: "Seasonal Allergy", status: "Monitoring", time: "11:30 AM", severity: "stable" },
    { day: "Oct 20", symptom: "Acute Fever", status: "Critical", time: "09:00 PM", severity: "critical" },
  ];

  return (
    <div className="wellness-timeline-container health-panel glass-panel">
      <div className="timeline-header">
        <h3>Clinical Wellness Timeline</h3>
        <p>7-Day Diagnostic History</p>
      </div>
      <div className="timeline-items">
        {history.map((item, idx) => (
          <div key={idx} className="timeline-item animate-card" style={{ animationDelay: `${idx * 0.1}s` }}>
            <div className="timeline-date">
              <span className="day">{item.day}</span>
              <span className="time">{item.time}</span>
            </div>
            <div className="timeline-status-dot-container">
              <div className={`timeline-dot severity-${item.severity}`}></div>
              {idx !== history.length - 1 && <div className="timeline-line"></div>}
            </div>
            <div className="timeline-content">
              <h4>{item.symptom}</h4>
              <span className={`severity-tag severity-${item.severity}`}>{item.status}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WellnessTimeline;
