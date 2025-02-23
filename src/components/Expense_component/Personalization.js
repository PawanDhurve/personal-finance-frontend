import React, { useState } from 'react';
import './Personalization.css';


const Personalization = ({ onThemeChange }) => {
    const [theme, setTheme] = useState('light');

    const handleThemeChange = (e) => {
        setTheme(e.target.value);
        onThemeChange(e.target.value);
    };

    return (
        <div className="personalization">
            <h2>User Personalization</h2>
            <p>Customize your dashboard settings.</p>
            <label>Choose Theme: </label>
            <select value={theme} onChange={handleThemeChange}>
                <option value="light">Light Mode</option>
                <option value="dark">Dark Mode</option>
            </select>
        </div>
    );
};

export default Personalization;
