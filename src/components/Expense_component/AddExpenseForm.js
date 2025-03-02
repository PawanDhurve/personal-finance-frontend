import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AddExpenseForm.css';

const AddExpensePage = () => {
    const [expenses, setExpenses] = useState([]);
    const [expense, setExpense] = useState({
        category: 'food',
        customCategory: '',
        amount: '',
        date: '',
        paymentMethod: 'cash',
        notes: ''
    });
    const [message, setMessage] = useState('');
    const [showCustomCategory, setShowCustomCategory] = useState(false);

    useEffect(() => {
        fetchExpenses();
    }, []);

    const fetchExpenses = async () => {
        try {
            const response = await axios.get('/api/expenses');
            setExpenses(response.data);
        } catch (error) {
            console.error('Error fetching expenses:', error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        
        if (name === "category") {
            if (value === "other") {
                setShowCustomCategory(true);
                setExpense({ ...expense, category: '', customCategory: '' });
            } else {
                setShowCustomCategory(false);
                setExpense({ ...expense, category: value, customCategory: '' });
            }
        } else {
            setExpense({ ...expense, [name]: value });
        }
    };

    const handleAddExpense = async () => {
        if (!expense.amount || !expense.date || (!expense.category && !expense.customCategory)) {
            setMessage('Please fill in all required fields.');
            return;
        }
        try {
            const finalExpense = {
                ...expense,
                category: showCustomCategory ? expense.customCategory : expense.category
            };

            await axios.post('/api/expenses', finalExpense);
            setMessage('Expense added successfully!');
            setExpense({ category: 'food', customCategory: '', amount: '', date: '', paymentMethod: 'cash', notes: '' });
            setShowCustomCategory(false);
            fetchExpenses(); // Refresh the list after adding an expense
        } catch (error) {
            setMessage('Error adding expense. Please try again.');
        }
    };

    return (
        <div className="add-expense-page fade-in">
            <h2>Add New Expense</h2>
            {message && <p className="message">{message}</p>}

            <div className="expense-container slide-in">
                {/* Grid Layout - 2 Rows, 2 Columns */}
                <div className="form-grid">
                    {/* Row 1: Category & Amount */}
                    <div className="form-group">
                        <label>Category:</label>
                        <select name="category" value={expense.category || "other"} onChange={handleChange} required>
                            <option value="food">Food</option>
                            <option value="transport">Transport</option>
                            <option value="bills">Bills</option>
                            <option value="entertainment">Entertainment</option>
                            <option value="other">Other</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label>Amount:</label>
                        <input type="number" name="amount" value={expense.amount} onChange={handleChange} required />
                    </div>

                    {/* Row 2: Date & Payment Method */}
                    <div className="form-group">
                        <label>Date:</label>
                        <input type="date" name="date" value={expense.date} onChange={handleChange} required />
                    </div>

                    <div className="form-group">
                        <label>Payment Method:</label>
                        <select name="paymentMethod" value={expense.paymentMethod} onChange={handleChange}>
                            <option value="cash">Cash</option>
                            <option value="credit_card">Credit Card</option>
                            <option value="debit_card">Debit Card</option>
                        </select>
                    </div>
                </div>

                {/* Custom Category Field (Appears if "Other" is selected) */}
                {showCustomCategory && (
                    <div className="form-group">
                        <label>Custom Category:</label>
                        <input 
                            type="text" 
                            name="customCategory" 
                            value={expense.customCategory} 
                            onChange={handleChange} 
                            placeholder="Enter custom category" 
                            required
                        />
                    </div>
                )}

                {/* Notes */}
                <div className="form-group">
                    <label>Notes:</label>
                    <textarea name="notes" value={expense.notes} onChange={handleChange} placeholder="Optional notes"></textarea>
                </div>

                {/* Add Expense Button */}
                <button onClick={handleAddExpense} className="zoom-in">Add Expense</button>
            </div>

            {/* Expense List */}
            <h3>Expense List</h3>
            <ul className="expense-list">
                {expenses.length === 0 ? <p>No expenses added yet.</p> : expenses.map((exp) => (
                    <li key={exp._id} className="expense-item">
                        <strong>{exp.category}</strong> - ${exp.amount} on {exp.date} ({exp.paymentMethod})
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default AddExpensePage;
