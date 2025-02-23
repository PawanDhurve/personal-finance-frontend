import React, { useState } from 'react';
import './SecurityBackup.css';

const SecurityBackup = () => {
    const [isBackingUp, setIsBackingUp] = useState(false);
    const [is2FAEnabled, setIs2FAEnabled] = useState(false);

    const handleBackup = () => {
        setIsBackingUp(true);
        setTimeout(() => {
            alert('Your data has been backed up securely!');
            setIsBackingUp(false);
        }, 2000); // Simulate backup process
    };

    const toggle2FA = () => {
        setIs2FAEnabled(!is2FAEnabled);
        alert(`Two-Factor Authentication ${!is2FAEnabled ? 'Enabled' : 'Disabled'}`);
    };

    return (
        <div className="security-backup">
            <h2>🔒 Security & Data Backup</h2>
            <p>Enable two-factor authentication and backup your financial data securely.</p>

            {/* 2FA Toggle */}
            <div className="toggle-container">
                <span>Two-Factor Authentication:</span>
                <button className={`toggle-btn ${is2FAEnabled ? 'enabled' : ''}`} onClick={toggle2FA}>
                    {is2FAEnabled ? 'ON' : 'OFF'}
                </button>
            </div>

            {/* Backup Button */}
            <button onClick={handleBackup} className={`backup-btn ${isBackingUp ? 'loading' : ''}`} disabled={isBackingUp}>
                {isBackingUp ? 'Backing Up...' : 'Backup Now'}
            </button>
        </div>
    );
};

export default SecurityBackup;
