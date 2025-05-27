import React, { useEffect, useState } from 'react';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../firebase';
import StyledTable from './StyledTable'; // adjust the path if needed
import { highlightMatch } from '../utils/highlightMatch'; // adjust path as needed
import { useTenant } from "../context/TenantContext";

const PatientList = () => {
  const [patients, setPatients] = useState([]);
  const [search, setSearch] = useState('');
  const { tenantId, loading } = useTenant();

  useEffect(() => {
    if (loading || !tenantId) return;

    const fetchPatients = async () => {
      const q = query(collection(db, "patients"), where("tenantId", "==", tenantId));
      const snap = await getDocs(q);
      setPatients(snap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    };
    fetchPatients();
  }, [tenantId, loading]);

  const filtered = patients.filter(p =>
    (p.name?.toLowerCase().includes(search.toLowerCase()) ||
     String(p.phone || '').includes(search))
  );

  return (
    <div className="patient-list-container">
      <div className="search-container">
        <input 
          type="text" 
          placeholder="Search by name or phone..." 
          value={search}
          onChange={e => setSearch(e.target.value)} 
        />
      </div>
      <StyledTable
        headers={['Name', 'Phone', 'Age', 'Gender', 'Email', 'Address']}
        data={filtered}
        renderRow={(p) => (
          <>
            <div dangerouslySetInnerHTML={{ __html: highlightMatch(p.name, search) }} />
            <div dangerouslySetInnerHTML={{ __html: highlightMatch(p.phone, search) }} />
            <div>{p.age || '-'}</div>
            <div>{p.gender}</div>
            <div dangerouslySetInnerHTML={{ __html: highlightMatch(p.email || '-', search) }} />
            <div dangerouslySetInnerHTML={{ __html: highlightMatch(p.address || '-', search) }} />
          </>
        )}
      />
    </div>
  );
};

export default PatientList;
