import { useState } from 'react';

function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside className={`sidebar ${collapsed ? 'collapsed' : ''}`}>
      <button className="collapse-btn" onClick={() => setCollapsed(!collapsed)}>☰</button>
      <nav className="sidebar-nav">
        <button>Patients</button>
        <button>Receipts</button>
        <button>Prescriptions</button>
        <button>Doctors</button>
        <button>Appointments</button>
      </nav>
    </aside>
  );
}

export default Sidebar;
