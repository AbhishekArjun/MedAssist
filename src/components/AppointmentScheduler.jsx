import React, { useState } from 'react';

export default function AppointmentScheduler() {
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [isBooked, setIsBooked] = useState(false);

  const doctors = [
    { id: 1, name: 'Dr. Sarah Chen', spec: 'Cardiology', icon: '❤️' },
    { id: 2, name: 'Dr. James Wilson', spec: 'General Practice', icon: '👨‍⚕️' },
    { id: 3, name: 'Dr. Emily Brooks', spec: 'Neurology', icon: '🧠' }
  ];

  const times = ['9:00 AM', '10:30 AM', '1:00 PM', '2:30 PM', '4:00 PM'];

  const handleBook = () => {
    if (selectedDoctor && selectedTime) {
      setIsBooked(true);
    }
  };

  if (isBooked) {
    const doctor = doctors.find(d => d.id === selectedDoctor);
    return (
      <div className="health-panel glass-panel appointment-scheduler booking-confirmation">
        <div className="success-icon">✓</div>
        <h3>Appointment Confirmed</h3>
        <p>Your session has been successfully booked.</p>
        <div className="booking-details">
          <p><strong>Specialist:</strong> {doctor.name} ({doctor.spec})</p>
          <p><strong>Time:</strong> {selectedTime}</p>
        </div>
        <button className="utility-btn" style={{ margin: '0 auto' }} onClick={() => setIsBooked(false)}>
          Book Another
        </button>
      </div>
    );
  }

  return (
    <div className="health-panel glass-panel appointment-scheduler">
      <div className="scheduler-header">
        <h3>Schedule Appointment</h3>
        <p>Select a specialist and available time.</p>
      </div>

      <div className="doctor-select">
        {doctors.map(doc => (
          <div 
            key={doc.id} 
            className={`doctor-card ${selectedDoctor === doc.id ? 'selected' : ''}`}
            onClick={() => setSelectedDoctor(doc.id)}
          >
            <div className="doctor-avatar">{doc.icon}</div>
            <div className="doctor-info">
              <h4>{doc.name}</h4>
              <p>{doc.spec}</p>
            </div>
          </div>
        ))}
      </div>

      {selectedDoctor && (
        <div className="time-select">
          <h4 style={{marginTop: '8px', marginBottom: '4px'}}>Available Times</h4>
          <div className="time-grid">
            {times.map(t => (
              <div 
                key={t} 
                className={`time-slot ${selectedTime === t ? 'selected' : ''}`}
                onClick={() => setSelectedTime(t)}
              >
                {t}
              </div>
            ))}
          </div>
        </div>
      )}

      <button 
        className="book-btn" 
        disabled={!selectedDoctor || !selectedTime}
        onClick={handleBook}
      >
        Confirm Booking
      </button>
    </div>
  );
}
