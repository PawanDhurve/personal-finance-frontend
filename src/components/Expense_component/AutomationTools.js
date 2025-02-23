import React, { useState } from 'react';
import './AutomationTools.css';

const AutomationTools = ({ onSetRecurringExpense }) => {
    const [expense, setExpense] = useState({ name: '', amount: '', frequency: 'monthly' });
    const [message, setMessage] = useState('');

    const handleChange = (e) => {
        setExpense({ ...expense, [e.target.name]: e.target.value });
    };

    const handleSubmit = () => {
        if (!expense.name || !expense.amount) {
            setMessage('⚠️ Please enter a valid expense name and amount.');
            return;
        }

        onSetRecurringExpense(expense);
        setMessage(`✅ Recurring expense "${expense.name}" set for ${expense.frequency}.`);
        
        // Reset form after submission
        setExpense({ name: '', amount: '', frequency: 'monthly' });

        // Clear message after 3 seconds
        setTimeout(() => setMessage(''), 3000);
    };

    return (
        <div className="automation-tools">
            <h2>Expense & Budget Automation</h2>
            <p>Set up recurring expenses to automate your budgeting.</p>
            
            <input 
                type="text" 
                name="name" 
                placeholder="Expense Name" 
                value={expense.name} 
                onChange={handleChange} 
            />

            <input 
                type="number" 
                name="amount" 
                placeholder="Amount" 
                value={expense.amount} 
                onChange={handleChange} 
                min="0" 
            />

            <select name="frequency" value={expense.frequency} onChange={handleChange}>
                <option value="daily">Daily</option>
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
            </select>

            <button onClick={handleSubmit}>Set Recurring Expense</button>

            {message && <p className="confirmation-message">{message}</p>}
        </div>
    );
};

export default AutomationTools;
