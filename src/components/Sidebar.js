import React from 'react';

function SidePanel({ onSelect }) {
  return (
    <div style={{ width: '200px', padding: '1rem', borderRight: '1px solid #ccc' }}>
      <button onClick={() => onSelect('patients')}>Patients</button>
      <button onClick={() => onSelect('doctors')}>Doctors</button>
      <button onClick={() => onSelect('appointments')}>Appointments</button>
    </div>
  );
}

export default SidePanel;
