import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import './SettingsPage.css';

const SettingsPage = () => {
  const [user, setUser] = useState({
    name: '',
    email: '',
    profilePicture: '',
  });
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState('');
  const [darkMode, setDarkMode] = useState(false);
  const [currency, setCurrency] = useState('USD');
  const [goal, setGoal] = useState(0);
  const history = useHistory();

  useEffect(() => {
    // Fetch user data and preferences (mock example)
    const fetchedUser = {
      name: 'John Doe',
      email: 'johndoe@example.com',
      profilePicture: '/path/to/profile.jpg',
    };
    setUser(fetchedUser);
    
    // Fetch categories (mock example)
    setCategories(['Food', 'Transport', 'Entertainment']);
    
    // Check if dark mode is enabled
    const savedMode = localStorage.getItem('darkMode') === 'true';
    setDarkMode(savedMode);
    if (savedMode) document.body.classList.add('dark-mode');
  }, []);

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setUser((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleCategoryChange = (e) => {
    setNewCategory(e.target.value);
  };

  const handleCategorySubmit = (e) => {
    e.preventDefault();
    if (newCategory) {
      setCategories((prevState) => [...prevState, newCategory]);
      setNewCategory('');
    }
  };

  const toggleDarkMode = () => {
    setDarkMode((prevState) => !prevState);
    document.body.classList.toggle('dark-mode');
    localStorage.setItem('darkMode', !darkMode);
  };

  const handleCurrencyChange = (e) => {
    setCurrency(e.target.value);
  };

  const handleGoalChange = (e) => {
    setGoal(e.target.value);
  };

  const handleSaveSettings = () => {
    // Save changes to the backend or localStorage
    console.log('Settings saved!');
    history.push('/dashboard');
  };

  return (
    <div className="settings-page">
      <h1>Settings</h1>

      {/* Profile Management Section */}
      <div className="section">
        <h2>Profile Management</h2>
        <div className="profile">
          <img src={user.profilePicture} alt="Profile" className="profile-picture" />
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setUser({ ...user, profilePicture: URL.createObjectURL(e.target.files[0]) })}
          />
          <div>
            <label>Name: </label>
            <input
              type="text"
              name="name"
              value={user.name}
              onChange={handleProfileChange}
              placeholder="Enter your name"
            />
          </div>
          <div>
            <label>Email: </label>
            <input
              type="email"
              name="email"
              value={user.email}
              onChange={handleProfileChange}
              placeholder="Enter your email"
            />
          </div>
        </div>
      </div>

      {/* Expense Categories Section */}
      <div className="section">
        <h2>Expense Categories</h2>
        <form onSubmit={handleCategorySubmit}>
          <input
            type="text"
            value={newCategory}
            onChange={handleCategoryChange}
            placeholder="Add a new category"
          />
          <button type="submit">Add Category</button>
        </form>
        <ul className="category-list">
          {categories.map((category, index) => (
            <li key={index}>{category}</li>
          ))}
        </ul>
      </div>

      {/* Dark Mode Toggle */}
      <div className="section">
        <h2>Dark Mode</h2>
        <label className="switch">
          <input type="checkbox" checked={darkMode} onChange={toggleDarkMode} />
          <span className="slider round"></span>
        </label>
      </div>

      {/* Currency Selection */}
      <div className="section">
        <h2>Currency Selection</h2>
        <select value={currency} onChange={handleCurrencyChange}>
          <option value="USD">USD</option>
          <option value="EUR">EUR</option>
          <option value="GBP">GBP</option>
          <option value="INR">INR</option>
          {/* Add more currency options as needed */}
        </select>
      </div>

      {/* Financial Goal-Setting */}
      <div className="section">
        <h2>Financial Goal Setting</h2>
        <div>
          <label>Set your financial goal: </label>
          <input
            type="number"
            value={goal}
            onChange={handleGoalChange}
            placeholder="Enter your goal amount"
          />
        </div>
      </div>

      <div className="save-settings">
        <button onClick={handleSaveSettings}>Save Settings</button>
      </div>
    </div>
  );
};

export default SettingsPage;
