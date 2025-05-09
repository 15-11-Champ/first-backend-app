import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import StyledTable from './StyledTable';
import { highlightMatch } from '../utils/highlightMatch'; // adjust the path if needed


const DoctorList = () => {
  const [doctors, setDoctors] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const fetchDoctors = async () => {
      const snap = await getDocs(collection(db, 'doctors'));
      setDoctors(snap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    };
    fetchDoctors();
  }, []);

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
              <div dangerouslySetInnerHTML={{ __html: highlightMatch(d.Name, search) }} />
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
