import React, { useState, useEffect } from 'react';
import './Dashboard.css';
import { auth } from '../firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { db } from '../firebase';
import { doc, collection, addDoc, getDoc } from 'firebase/firestore';
import CreateAppointmentForm from "../components/CreateAppointmentForm";
import MainSection from "../components/MainSection";
import SelectAppointmentForPrescription from '../components/SelectAppointmentForPrescription';
import CreatePrescriptionForm from '../components/CreatePrescriptionForm';


function Dashboard() {
  const [user, setUser] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [patientData, setPatientData] = useState({
    name: '',
    age: '',
    gender: '',
    email: '',
    phoneNumber: '',
  });
  const [userData, setUserData] = useState(null);
  const [activeSection, setActiveSection] = useState("MainSection");
  const [selectedAppointment, setSelectedAppointment] = useState(null);


  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
  
      if (currentUser) {
        try {
          const userDocRef = doc(db, "users", currentUser.uid);
          const userDocSnap = await getDoc(userDocRef);
  
          if (userDocSnap.exists()) {
            setUserData(userDocSnap.data());
          } else {
            console.log("No such user document!");
          }
        } catch (error) {
          console.error("Error fetching user data: ", error);
        }
      }
    });
  
    return () => unsubscribe(); // Cleanup on
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      window.location.href = '/login'; // redirect to login
    } catch (error) {
      console.error('Logout error:', error);
    }
  };
  
  const handleChange = (e) => {
      setPatientData({ ...patientData, [e.target.name]: e.target.value });
    };
  
  const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        // Add patient data to "patients" collection
        await addDoc(collection(db, 'patients'), patientData);
    
        console.log('Patient submitted:', patientData);
        alert('Patient added successfully!');
        
        // Reset form and close modal
        setPatientData({
          name: '',
          age: '',
          gender: '',
          email: '',
          phoneNumber: '',
        });
        setShowForm(false);
      } catch (error) {
        console.error('Error adding patient:', error);
        alert('Failed to add patient. Try again.');
      }
    };

    const renderSection = () => {
      switch (activeSection) {
        case "appointment":
          return <CreateAppointmentForm />;
        case "overview":
        default:
          return <MainSection />;
        case "prescription":
          return selectedAppointment 
    ? <CreatePrescriptionForm appointment={selectedAppointment} onBack={() => setSelectedAppointment(null)} />
    : <SelectAppointmentForPrescription onSelect={setSelectedAppointment} />;
      }
    };

  return (
    <div className="dashboard-container">
      {/* Header / Banner */}
      <header className="dashboard-header">
        <div className="header-left">
          <h1>Dashboard</h1>
        </div>
        <div className="header-right">
          <span className="user-info">
            {user ? `Hello, ${user.displayName || user.email}` : 'Loading...'}
          </span>
          {userData && (
    <>
      <div className="user-role">
        <span>Role: {userData.Role}</span><br />
        <span>Designation: {userData.Designation}</span>
      </div>
    </>
  )}
          <button className="header-btn">User Info</button>
          <button className="header-btn logout" onClick={handleLogout}>Logout</button>
        </div>
      </header>

      {/* Sidebar */}
      <aside className="sidebar">
        <button className="collapse-btn">☰</button>
        <nav className="sidebar-nav">
          <button>Patients</button>
          <button>Receipts</button>
          <button>Prescriptions</button>
          <button>Doctors</button>
          <button>Appointments</button>
        </nav>
      </aside>

      {/* Main content area */}
      <main className="main-content">
        {/* Shortcut Buttons */}
        <section className="shortcuts">
          <button className="shortcut-btn" onClick={() => setShowForm(true)}>Add Patient</button>
          <button className="shortcut-btn" onClick={() => setActiveSection("prescription")}>Create Prescription</button>
          <button className="shortcut-btn" onClick={() => setActiveSection("appointment")}>Create Appointment</button>
          <button className="shortcut-btn">Schedule Follow-up</button>
          <button className="shortcut-btn">Fetch History</button>
        </section>

        {showForm && (
          <div className="modal-overlay">
            <div className="modal-content">
              <h2>Add Patient</h2>
              <form onSubmit={handleSubmit}>
                <input
                  type="text"
                  name="name"
                  placeholder="Full Name"
                  value={patientData.name}
                  onChange={handleChange}
                  required
                />
                <input
                  type="number"
                  name="age"
                  placeholder="Age"
                  value={patientData.age}
                  onChange={handleChange}
                  required
                />
                <select
                  name="gender"
                  value={patientData.gender}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={patientData.email}
                  onChange={handleChange}
                  required
                />
                <input
                  type="tel"
                  name="phoneNumber"
                  placeholder="Phone Number"
                  value={patientData.phoneNumber}
                  onChange={handleChange}
                  required
                />
                <div className="modal-actions">
                  <button type="submit">Submit</button>
                  <button type="button" onClick={() => setShowForm(false)}>Cancel</button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Main Dashboard Section */}
        <section className="main-section">
          {renderSection()}
        </section>

      </main>
    </div>
  );
}

export default Dashboard;
