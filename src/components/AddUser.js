import React, { useState } from 'react';
import { db } from '../firebase';
import { collection, addDoc, Timestamp } from 'firebase/firestore';
import './FormStylePatient.css';
import { useTenant } from '../context/TenantContext';

const AddUserForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    role: '',
    email: '',
    phone: ''
  });
  const { tenantId, loading } = useTenant();

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, 'users'), {
        ...formData,
        createdAt: Timestamp.now(),
        tenantId
      });
      alert('User added successfully!');
      setFormData({
        name: '',
        role: '',
        email: '',
        phone: '',
        tenantId
      });
    } catch (error) {
      console.error('Error adding user:', error);
      alert('Failed to add User.');
    }
  };

  return (
    <div className="form-container">
      <h2>Add User</h2>
      <form onSubmit={handleSubmit}>
        <label>Name:</label>
        <input type="text" name="name" value={formData.name} onChange={handleChange} required />

        <label>Role:</label>
        <select name="role" value={formData.role} onChange={handleChange} required>
          <option value="">Select Role</option>
          <option value="Receptionist">Receptionist</option>
          <option value="Doctor">Doctor</option>
          <option value="Other">Other</option>
        </select>

        <label>Email:</label>
        <input type="email" name="email" value={formData.email} onChange={handleChange} />

        <label>Phone:</label>
        <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required />

        <button type="submit">Add User</button>
      </form>
    </div>
  );
};

export default AddUserForm;
