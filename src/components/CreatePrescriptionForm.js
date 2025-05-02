import React, { useState } from 'react';

function CreatePrescriptionForm({ appointment, onBack }) {
  const [medicines, setMedicines] = useState([
    { name: '', potency: '', manufacturer: '' },
  ]);

  const handleChange = (index, e) => {
    const updated = [...medicines];
    updated[index][e.target.name] = e.target.value;
    setMedicines(updated);
  };

  const addMedicine = () => {
    setMedicines([...medicines, { name: '', potency: '', manufacturer: '' }]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Prescription for:', appointment);
    console.log('Medicines:', medicines);
    // Save to Firestore logic goes here
  };

  return (
    <div>
      <h3>Create Prescription for {appointment.patientName}</h3>
      <form onSubmit={handleSubmit}>
        {medicines.map((med, idx) => (
          <div key={idx}>
            <input name="name" placeholder="Medicine" value={med.name} onChange={(e) => handleChange(idx, e)} />
            <input name="potency" placeholder="Potency" value={med.potency} onChange={(e) => handleChange(idx, e)} />
            <input name="manufacturer" placeholder="Manufacturer" value={med.manufacturer} onChange={(e) => handleChange(idx, e)} />
          </div>
        ))}
        <button type="button" onClick={addMedicine}>Add Another Medicine</button>
        <button type="submit">Create Prescription</button>
        <button type="button" onClick={onBack}>Cancel</button>
      </form>
    </div>
  );
}

export default CreatePrescriptionForm;
