import React, { useEffect, useState } from 'react';
import { Timestamp, collection, query, where, getDocs, doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { startOfDay, endOfDay } from 'date-fns';

function SelectAppointmentForPrescription({ onSelect }) {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const fetchAppointments = async () => {
      const start = Timestamp.fromDate(startOfDay(new Date()));
      const end = Timestamp.fromDate(endOfDay(new Date()));

      const q = query(
        collection(db, 'appointments'),
        where('datetime', '>=', start),
        where('datetime', '<=', end)
      );

      const querySnapshot = await getDocs(q);
      const results = [];

      for (const docSnap of querySnapshot.docs) {
        const data = docSnap.data();

        let patientName = 'Unknown';
        let doctorName = 'Unknown';

        if (data.patientId) {
          const patientRef = await getDoc(doc(db, 'patients', data.patientId));
          if (patientRef.exists()) {
            patientName = patientRef.data().name || 'Unnamed Patient';
          }
        }

        if (data.doctorId) {
          const doctorRef = await getDoc(doc(db, 'doctors', data.doctorId));
          if (doctorRef.exists()) {
            doctorName = doctorRef.data().name || 'Unnamed Doctor';
          }
        }

        results.push({
          id: docSnap.id,
          ...data,
          patientName,
          doctorName,
        });
      }

      setAppointments(results);
    };

    fetchAppointments();
  }, []);

  return (
    <div>
      <h3>Select an Appointment</h3>
      {appointments.length === 0 ? (
        <p>No appointments found for today.</p>
      ) : (
        <ul>
          {appointments.map((appt) => (
            <li
              key={appt.id}
              onClick={() => onSelect(appt)}
              style={{ cursor: 'pointer', marginBottom: '10px' }}
            >
              <strong>{new Date(appt.datetime.seconds * 1000).toLocaleTimeString()}</strong> —{' '}
              {appt.patientName} with {appt.doctorName}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default SelectAppointmentForPrescription;
