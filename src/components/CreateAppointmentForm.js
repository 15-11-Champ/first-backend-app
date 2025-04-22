import React, { useState, useEffect } from "react";
import { db } from "../firebase"; // your firebase setup
import { collection, addDoc, getDocs } from "firebase/firestore";

function CreateAppointmentForm() {
  const [patients, setPatients] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [patientId, setPatientId] = useState("");
  const [doctorId, setDoctorId] = useState("");
  const [date, setDate] = useState("");

  useEffect(() => {
    // Fetch patients and doctors
    const fetchData = async () => {
      const patientSnapshot = await getDocs(collection(db, "patients"));
      setPatients(patientSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));

      const doctorSnapshot = await getDocs(collection(db, "doctors"));
      setDoctors(doctorSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    };

    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    await addDoc(collection(db, "appointments"), {
      patientId,
      doctorId,
      date: new Date(date).toISOString(),
      prescriptionNumber: "",
      status: "upcoming",
    });

    alert("Appointment scheduled!");
    // Optional: clear form
  };

  return (
    <div>
      <h2>Schedule Appointment</h2>
      <form onSubmit={handleSubmit}>
        <label>Patient:</label>
        <select onChange={(e) => setPatientId(e.target.value)} required>
          <option value="">Select patient</option>
          {patients.map(p => (
            <option key={p.id} value={p.id}>{p.name}</option>
          ))}
        </select>

        <label>Doctor:</label>
        <select onChange={(e) => setDoctorId(e.target.value)} required>
          <option value="">Select doctor</option>
          {doctors.map(d => (
            <option key={d.id} value={d.id}>{d.name}</option>
          ))}
        </select>

        <label>Date & Time:</label>
        <input type="datetime-local" onChange={(e) => setDate(e.target.value)} required />

        <button type="submit">Create Appointment</button>
      </form>
    </div>
  );
}

export default CreateAppointmentForm;
