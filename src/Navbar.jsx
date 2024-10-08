import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from './security/AuthContext';

function Navbar() {
  const navigate = useNavigate();
  const { logout } = useAuth(); 

  const handleLogout = () => {
    logout(); 
    navigate('/');
  };

  return (
    <div style={{ marginBottom: '56px' }}>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
        <div className="container-fluid">
          <NavLink className="navbar-brand" to="/home">Georgian Nail Research Society</NavLink>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item dropdown">
                <NavLink className="nav-link dropdown-toggle" to="/" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  About
                </NavLink>
                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                  <li><NavLink className="dropdown-item" to="/members">Members</NavLink></li>
                  <li><hr className="dropdown-divider" /></li>
                  <li><NavLink className="dropdown-item" to="/statutes">Statutes</NavLink></li>
                  <li><hr className="dropdown-divider" /></li>
                  <li><NavLink className="dropdown-item" to="/annualReports">Annual reports</NavLink></li>
                </ul>
              </li>
              <li className="nav-item"><NavLink className="nav-link" to="/events">Events</NavLink></li>
              <li className="nav-item"><NavLink className="nav-link" to="/blogs">Scientific blogs</NavLink></li>
              <li className="nav-item"><NavLink className="nav-link" to="/patients">Patients</NavLink></li>
            </ul>
            <div className="d-flex gap-2">
              <button onClick={handleLogout} style={{width: '100px', outline: 'none', background: 'none', color: 'red', border: 'none'}}>Log Out</button>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
