import React, { useEffect, useState } from 'react';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../firebase';
import StyledTable from './StyledTable';
import { highlightMatch } from '../utils/highlightMatch'; // adjust the path if needed
import { useTenant } from "../context/TenantContext";

const DoctorList = () => {
  const [doctors, setDoctors] = useState([]);
  const [search, setSearch] = useState('');
  const { tenantId, loading } = useTenant();

  useEffect(() => {
    if (loading || !tenantId) return;

    const fetchDoctors = async () => {
      const q = query(collection(db, 'doctors'), where('tenantId', '==', tenantId));
      const snap = await getDocs(q);
      setDoctors(snap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    };
    fetchDoctors();
  }, [tenantId, loading]);

  const filtered = doctors.filter(d =>
    (d.Name?.toLowerCase().includes(search.toLowerCase()) ||
     d.phone?.includes(search))
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
        headers={['Name', 'Phone', 'Email', 'Specialization']}
        data={filtered}
        renderRow={(d) => (
            <>
              <div dangerouslySetInnerHTML={{ __html: highlightMatch(d.name, search) }} />
              <div dangerouslySetInnerHTML={{ __html: highlightMatch(d.phone || '-', search) }} />
              <div dangerouslySetInnerHTML={{ __html: highlightMatch(d.email || '-', search) }} />
              <div dangerouslySetInnerHTML={{ __html: highlightMatch(d.specialization || '-', search) }} />
            </>
          )}
        />
    </div>
  );
};

export default DoctorList;
