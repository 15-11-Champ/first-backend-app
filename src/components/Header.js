function Header() {
    return (
      <header className="dashboard-header">
        <div className="header-left">
          <h1>Dashboard</h1>
        </div>
        <div className="header-right">
          <span className="user-info">Hello, Dr. John Doe</span>
          <button className="header-btn">User Info</button>
          <button className="header-btn logout">Logout</button>
        </div>
      </header>
    );
  }
  
  export default Header;
  