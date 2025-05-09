import React, { useState } from 'react';
import { db } from '../firebase';
import { collection, addDoc, Timestamp } from 'firebase/firestore';
import './FormStylePatient.css'

const AddPatientForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    gender: '',
    email: '',
    phone: '',
    address: ''
  });

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate required fields
    if (!formData.name || !formData.gender || !formData.phone) {
      alert("Please fill in required fields: Full Name, Gender, and Phone Number.");
      return;
    }

    try {
      await addDoc(collection(db, 'patients'), {
        ...formData,
        createdAt: Timestamp.now()
      });
      alert('Patient added successfully!');
      setFormData({
        name: '',
        age: '',
        gender: '',
        email: '',
        phone: '',
        address: ''
      });
    } catch (error) {
      console.error('Error adding patient:', error);
      alert('Failed to add patient.');
    }
  };

  return (
    <div className="patient-form">
      <h2>Add New Patient</h2>
      <form onSubmit={handleSubmit}>
        <label>Full Name:</label>
        <input type="text" name="name" value={formData.name} onChange={handleChange} required />

        <label>Age (optional):</label>
        <input type="number" name="age" value={formData.age} onChange={handleChange} />

        <label>Gender:</label>
        <select name="gender" value={formData.gender} onChange={handleChange} required>
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>

        <label>Email (optional):</label>
        <input type="email" name="email" value={formData.email} onChange={handleChange} />

        <label>Phone Number:</label>
        <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required />

        <label>Address (optional):</label>
        <input type="text" name="address" value={formData.address} onChange={handleChange} />

        <button type="submit">Add Patient</button>
      </form>
    </div>
  );
};

export default AddPatientForm;
