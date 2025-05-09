import React from 'react';

function SidePanel({ onSelect }) {
  return (
    <div style={{ width: '200px', padding: '1rem', borderRight: '1px solid #ccc' }}>
      <button onClick={() => setActiveView('patients')}>Patients</button>
      <button onClick={() => setActiveView('doctors')}>Doctors</button>
      <button onClick={() => setActiveView('appointments')}>Appointments</button>

    </div>
  );
}

export default SidePanel;
