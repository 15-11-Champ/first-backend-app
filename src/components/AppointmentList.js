import React, { useEffect, useState } from 'react';
import { collection, getDocs, doc, getDoc, query, where } from 'firebase/firestore';
import { db } from '../firebase';
import { useTenant } from '../context/TenantContext';
import StyledTable from './StyledTable';
import { highlightMatch } from '../utils/highlightMatch';

const AppointmentList = () => {
  const [appointments, setAppointments] = useState([]);
  const [search, setSearch] = useState('');
  const { tenantId, loading } = useTenant();

  useEffect(() => {
    if (loading || !tenantId) return;

    const fetchAppointments = async () => {
      const q = query(collection(db, 'appointments'), where('tenantId', '==', tenantId));
      const snap = await getDocs(q);

      const appointmentsData = await Promise.all(
        snap.docs.map(async (docSnap) => {
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

      setAppointments(appointmentsData.filter(a => a !== null));
    };

    if (tenantId) fetchAppointments();
  }, [tenantId, loading]);

  const filtered = appointments.filter(a =>
    a.patientName?.toLowerCase().includes(search.toLowerCase()) ||
    a.doctorName?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="patient-list-container">
      <div className="search-container">
        <input
          type="text"
          placeholder="Search by patient or doctor..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <StyledTable
        headers={['Date & Time', 'Patient', 'Doctor']}
        data={filtered}
        renderRow={(a) => (
          <>
            <div>{a.datetime}</div>
            <div dangerouslySetInnerHTML={{ __html: highlightMatch(a.patientName, search) }} />
            <div dangerouslySetInnerHTML={{ __html: highlightMatch(a.doctorName, search) }} />
          </>
        )}
      />
    </div>
  );
};

export default AppointmentList;
