import React, { useEffect, useState } from 'react';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../firebase';
import StyledTable from './StyledTable'; // adjust the path if needed
import { highlightMatch } from '../utils/highlightMatch'; // adjust path as needed
import { useTenant } from "../context/TenantContext";


const UsersList = () => {
  const [TenantUsers, setUsers] = useState([]);
  const [search, setSearch] = useState('');
  const { tenantId, loading } = useTenant();

  useEffect(() => {
    if (loading || !tenantId) return;

    const fetchUsers = async () => {
      const q = query(collection(db, "users"), where("tenantId", "==", tenantId));
      const snap = await getDocs(q);
      setUsers(snap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    };
    fetchUsers();
  }, [tenantId, loading]);

  const filtered = TenantUsers.filter(p =>
    (p.name?.toLowerCase().includes(search.toLowerCase()) ||
     String(p.name || '').includes(search))
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
        headers={['Name', 'Role', 'Phone', 'Email']}
        data={filtered}
        renderRow={(p) => (
          <>
            <div dangerouslySetInnerHTML={{ __html: highlightMatch(p.name, search) }} />
            <div dangerouslySetInnerHTML={{ __html: highlightMatch(p.role, search) }} />
            <div dangerouslySetInnerHTML={{ __html: highlightMatch(p.phone, search) }} />
            <div dangerouslySetInnerHTML={{ __html: highlightMatch(p.email || '-', search) }} />
          </>
        )}
      />
    </div>
  );
};

export default UsersList;
