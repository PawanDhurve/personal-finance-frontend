import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  FaUserCircle,
  FaBell,
  FaBars,
  FaSearch,
  FaMoon,
  FaSun,
  FaChevronRight,
} from "react-icons/fa";
import "./Navbar.css";

const Navbar = () => {
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("darkMode") === "enabled"
  );
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [allDropdownOpen, setAllDropdownOpen] = useState(false);
  const [addExpenseDropdownOpen, setAddExpenseDropdownOpen] = useState(false);

  const dropdownRef = useRef(null);
  const allDropdownRef = useRef(null);
  const addExpenseDropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        allDropdownRef.current &&
        !allDropdownRef.current.contains(event.target) &&
        addExpenseDropdownRef.current &&
        !addExpenseDropdownRef.current.contains(event.target)
      ) {
        setDropdownOpen(false);
        setAllDropdownOpen(false);
        setAddExpenseDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark-mode");
      localStorage.setItem("darkMode", "enabled");
    } else {
      document.body.classList.remove("dark-mode");
      localStorage.setItem("darkMode", "disabled");
    }
  }, [darkMode]);

  const toggleAllDropdown = () => {
    setAllDropdownOpen(!allDropdownOpen);
  };

  const closeAllDropdown = () => {
    setAllDropdownOpen(false);
  };

  return (
    <nav>
      {/* Primary Navbar */}
      <div className="navbar-primary">
        <div className="logo">
          <img src="/logo.png" alt="Logo" />
          <span>Finance Manager</span>
        </div>

        <div className="search-bar">
          <input type="text" placeholder="Search..." />
          <FaSearch className="search-icon" />
        </div>

        <div className="navbar-icons">
          <button className="dark-mode-toggle" onClick={() => setDarkMode(!darkMode)}>
            {darkMode ? <FaSun /> : <FaMoon />}
          </button>
          <FaBell className="notification-icon" />

          {/* Profile Icon with Dropdown */}
          <div className="profile-icon" onClick={() => setDropdownOpen(!dropdownOpen)} ref={dropdownRef}>
            <FaUserCircle />
            {dropdownOpen && (
              <div className="profile-dropdown">
                <Link to="/profile">Profile</Link>
                <Link to="/signup">Signup</Link>
                <Link to="/logout">Logout</Link>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Secondary Navbar */}
      <div className="navbar-secondary">
        {/* ALL Menu Button */}
        <div className="all-menu" onClick={toggleAllDropdown}>
          <FaBars className="menu-icon" />
          <span>ALL</span>
        </div>

        <Link to="/dashboard">📊 Dashboard</Link>
        <Link to="/add-expense">➕ Add Expense</Link>
        <Link to="/reports">📈 Reports</Link>
        <Link to="/budget">💰 Budget</Link>
      </div>

      {/* Amazon-Style Left Sidebar */}
      <div className={`all-dropdown ${allDropdownOpen ? "active" : ""}`} ref={allDropdownRef}>
        <span className="all-menu-close" onClick={closeAllDropdown}>&times;</span>

        <Link to="/dashboard">📊 Dashboard</Link>

        {/* Nested Dropdown */}
        <div
          className="add-expense-dropdown"
          onMouseEnter={() => setAddExpenseDropdownOpen(true)}
          onMouseLeave={() => setAddExpenseDropdownOpen(false)}
        >
          <span className="dropdown-link">
            ➕ Add Expense <FaChevronRight />
          </span>
          {addExpenseDropdownOpen && (
            <div className="add-expense-dropdown-content">
              <Link to="/expense-summary">📄 Expense Summary</Link>
              <Link to="/expense-charts">📊 Expense Charts</Link>
              <Link to="/expense-insight">💡 Expense Insight</Link>
            </div>
          )}
        </div>

        <Link to="/reports">📈 Reports</Link>
        <Link to="/budget">💰 Budget</Link>
      </div>

      {/* Overlay to close menu */}
      <div className={`all-menu-overlay ${allDropdownOpen ? "active" : ""}`} onClick={closeAllDropdown}></div>
    </nav>
  );
};

export default Navbar;
