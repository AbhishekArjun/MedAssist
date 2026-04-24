import React from 'react';

const HospitalMap = () => {
  const facilities = [
    { name: "Central City Hospital", distance: "0.8 miles", status: "Open 24/7", emergency: true },
    { name: "Westside Urgent Care", distance: "1.4 miles", status: "Wait: 15m", emergency: false },
    { name: "North Health Clinic", distance: "2.1 miles", status: "Wait: 40m", emergency: false },
  ];

  return (
    <div className="hospital-map-container health-panel glass-panel">
      <div className="map-header">
        <h3>Emergency Care Locator</h3>
        <p>Nearest HIPAA-Verified Facilities</p>
      </div>
      
      {/* Tactical Mock Map */}
      <div className="mock-map-visual">
         <div className="map-grid"></div>
         <div className="user-location-dot"></div>
         {facilities.map((fac, idx) => (
           <div key={idx} className={`facility-marker marker-${idx}`} title={fac.name}>
              <div className="marker-ping"></div>
              <span>✚</span>
           </div>
         ))}
      </div>

      <div className="facilities-list">
        {facilities.map((fac, idx) => (
          <div key={idx} className="facility-card">
            <div className="facility-info">
              <h4>{fac.name}</h4>
              <p>{fac.distance} • {fac.status}</p>
            </div>
            {fac.emergency && <span className="emergency-badge">ER</span>}
          </div>
        ))}
      </div>
      <button 
        className="map-btn" 
        onClick={() => window.open('https://www.google.com/maps/search/hospitals+near+me', '_blank')}
      >
        Open Full Navigation
      </button>
    </div>
  );
};

export default HospitalMap;
