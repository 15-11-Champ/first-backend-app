/*import React, { useEffect, useState } from 'react';
import { collection, getDocs, doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';

const AppointmentList = () => {
  const [appointments, setAppointments] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const fetchAppointments = async () => {
      const snap = await getDocs(collection(db, 'appointments'));
      const appointmentsData = await Promise.all(
        snap.docs.map(async docSnap => {
          const data = docSnap.data();

          if (!data.patientId || !data.doctorId) {
            console.warn("Missing patientId or doctorId in appointment:", data);
            return null;
          }
          const patientDoc = await getDoc(doc(db, 'patients', data.patientId));
          const doctorDoc = await getDoc(doc(db, 'doctors', data.doctorId));

          return {
            id: docSnap.id,
            datetime: data.datetime?.toDate()?.toLocaleString() || '',
            patientName: patientDoc.exists() ? patientDoc.data().name : 'Unknown',
            doctorName: doctorDoc.exists() ? doctorDoc.data().Name : 'Unknown',
          };
        })
      );
      setAppointments(appointmentsData);
    };

    fetchAppointments();
  }, []);

  const filtered = appointments.filter(a =>
    a.patientName?.toLowerCase().includes(search.toLowerCase()) ||
    a.doctorName?.toLowerCase().includes(search.toLowerCase())
  );


  return (
    <div>
      <div style={{ textAlign: 'right', marginBottom: '10px' }}>
        <input 
          type="text" 
          placeholder="Search by patient or doctor..." 
          value={search}
          onChange={e => setSearch(e.target.value)} 
        />
      </div>
      <table>
        <thead>
          <tr><th>Date & Time</th><th>Patient</th><th>Doctor</th></tr>
        </thead>
        <tbody>
          {filtered.map(a => (
            <tr key={a.id}>
              <td>{a.datetime}</td>
              <td>{a.patientName}</td>
              <td>{a.doctorName}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AppointmentList;
*/