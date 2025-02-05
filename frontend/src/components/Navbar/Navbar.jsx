import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/js/dist/offcanvas';
import 'bootstrap/js/dist/dropdown';
import './Navbar.css';
import logo_light from '../../assets/logo.png';
import logo_dark from '../../assets/logo.png';
import toggle_light from '../../assets/night_icon.png';
import toggle_dark from '../../assets/day_icon.png';
// import defaultProfilePic from '../../assets/sample_profile.jpeg';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../../actions/authActions';

const Navbar = ({ theme, setTheme }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // State to control dropdown visibility
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Hook for navigation
  const { user, loading } = useSelector((state) => state.auth); // Subscribe to auth state
 

  const toggleMode = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  const toggleDropdown = () => {
    setIsDropdownOpen((prevState) => !prevState); // Toggle dropdown visibility
  };

  return (
    <nav className={`navbar navbar-expand-lg navbar-${theme} bg-${theme}`}>
      <div className="container-fluid">
        {/* Toggle Button */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="offcanvas"
          data-bs-target="#offcanvasNavbar"
          aria-controls="offcanvasNavbar"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Logo */}
        <a className="navbar-brand" href="/">
          <img
            src={theme === 'light' ? logo_light : logo_dark}
            alt="Logo"
            className="logo"
          />
        </a>

        {/* Offcanvas Navbar */}
        <div
          className="offcanvas offcanvas-end"
          tabIndex="-1"
          id="offcanvasNavbar"
          aria-labelledby="offcanvasNavbarLabel"
        >
          <div className="offcanvas-header">
            <h5 className="offcanvas-title" id="offcanvasNavbarLabel">
              RUS Hikers
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="offcanvas"
              aria-label="Close"
            ></button>
          </div>
          <div className="offcanvas-body">
            <ul className="navbar-nav justify-content-center flex-grow-1 pe-3">
              <li className="nav-item">
                <Link className="nav-link" to="/events">
                  Events
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/about">
                  About
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/e-magazine">
                  E-Magazine
                </Link>
              </li>
              {/* <li className="nav-item">
                <Link className="nav-link" to="/contact">
                  Contact
                </Link>
              </li> */}

              <li>
                {/* Profile or Sign-In Button */}
                {user ? (
                  <div className="profile-dropdown" onClick={toggleDropdown}>
                    {/* Profile Picture and Name */}
                    <img
                      src={user.avatar && user.avatar.url}
                      alt={user && user.name}
                      className="profile-pic"
                    />
                    <span className="profile-name">
                      {user && user.name}
                    </span>

                    {/* Dropdown Menu */}
                    {isDropdownOpen && (
                      <div className="dropdown-menu dropdown-menu-end show">
                        <Link
                          className="dropdown-item"
                          to={`/me`}
                          onClick={() => setIsDropdownOpen(false)}
                        >
                          My Profile
                        </Link>
                        <button
                          className="dropdown-item"
                          onClick={() => {
                            handleLogout();
                            setIsDropdownOpen(false);
                          }}
                        >
                          Logout
                        </button>
                      </div>
                    )}
                  </div>
                ) : (
                  !loading && (
                    <Link className="buttn" to="/login">
                      Sign In
                    </Link>
                  )
                )}
              </li>
            </ul>
          </div>
        </div>

        {/* Theme Toggle */}
        <img
          onClick={toggleMode}
          src={theme === 'light' ? toggle_light : toggle_dark}
          alt="Toggle Theme"
          className="toggle-icon"
        />
      </div>
    </nav>
  );
};

export default Navbar;
