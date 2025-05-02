import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, addDoc, getDocs, Timestamp } from 'firebase/firestore';

const CreateAppointmentForm = () => {
  const [patients, setPatients] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [formData, setFormData] = useState({
    patientId: '',
    doctorId: '',
    datetime: ''
  });

  useEffect(() => {
    const fetchData = async () => {
      const patientsSnap = await getDocs(collection(db, 'patients'));
      const doctorsSnap = await getDocs(collection(db, 'doctors'));
      setPatients(patientsSnap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      setDoctors(doctorsSnap.docs.map(doc => ({ id: doc.id, ...doc.data() })));

      const patientsList = patientsSnap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      const doctorsList = doctorsSnap.docs.map(doc => ({ id: doc.id, ...doc.data() }));

      console.log("Doctors fetched:", doctorsList);
      console.log("Patients fetched:", patientsList);
    };
    fetchData();
  }, []);

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, 'appointments'), {
        ...formData,
        datetime: Timestamp.fromDate(new Date(formData.datetime)),
        prescriptionId: null,
        createdAt: Timestamp.now()
      });
      alert('Appointment created successfully!');
      setFormData({ patientId: '', doctorId: '', datetime: '' });
    } catch (error) {
      console.error('Error creating appointment:', error);
      alert('Failed to create appointment.');
    }
  };

  return (
    <div className="appointment-form">
      <h2>Schedule Appointment</h2>
      <form onSubmit={handleSubmit}>
        <label>Patient:</label>
        <select name="patientId" value={formData.patientId} onChange={handleChange} required>
          <option value="">Select Patient</option>
          {patients.map(p => (
            <option key={p.id} value={p.id}>{p.name}</option>
          ))}
        </select>

        <label>Doctor:</label>
        <select name="doctorId" value={formData.doctorId} onChange={handleChange} required>
          <option value="">Select Doctor</option>
          {doctors.map(d => (
            <option key={d.id} value={d.id}>{d.Name}</option>
          ))}
        </select>

        <label>Date & Time:</label>
        <input type="datetime-local" name="datetime" value={formData.datetime} onChange={handleChange} required />

        <button type="submit">Create</button>
      </form>
    </div>
  );
};

export default CreateAppointmentForm;
