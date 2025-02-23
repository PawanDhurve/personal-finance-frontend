import React, { useState } from 'react';
import './CollaborationTools.css';

const CollaborationTools = ({ onInvite }) => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [invitedEmails, setInvitedEmails] = useState([]);

    const handleInvite = () => {
        if (!email.includes('@')) {
            setMessage('❌ Please enter a valid email address.');
            return;
        }

        onInvite(email);
        setInvitedEmails([...invitedEmails, email]);
        setMessage(`✅ Invitation sent to ${email}`);
        setEmail('');

        // Clear message after 3 seconds
        setTimeout(() => setMessage(''), 3000);
    };

    return (
        <div className="collaboration-tools">
            <h2>Collaboration Tools</h2>
            <p>Invite family members or roommates to track shared expenses.</p>

            <div className="invite-input">
                <input 
                    type="email" 
                    placeholder="Enter email to invite" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                />
                <button onClick={handleInvite}>Send Invite</button>
            </div>

            {message && <p className="invite-message">{message}</p>}

            {invitedEmails.length > 0 && (
                <div className="invited-list">
                    <h3>Invited Users:</h3>
                    <ul>
                        {invitedEmails.map((invited, index) => (
                            <li key={index}>{invited}</li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default CollaborationTools;
