import React, { useState } from 'react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase';

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Prescription for:', appointment);
    console.log('Medicines:', medicines);
    try {
        const docRef = await addDoc(collection(db, 'prescriptions'), {
          appointmentId: appointment.id,
          patientId: appointment.patientId,
          doctorId: appointment.doctorId,
          medicines: medicines.filter(med => med.name), // basic validation
          createdAt: serverTimestamp()
        });
    
        console.log('Prescription created with ID:', docRef.id);
        alert('Prescription saved successfully!');
        onBack(); // go back to selection
      } catch (error) {
        console.error('Error saving prescription:', error);
        alert('Failed to save prescription');
      }
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
