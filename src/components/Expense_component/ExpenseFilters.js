import React, { useState, useEffect } from 'react';
import './ExpenseFilters.css';

const ExpenseFilters = ({ expenses, onFilterChange }) => {
    const [filters, setFilters] = useState({
        category: '',
        minAmount: '',
        maxAmount: '',
        date: ''
    });

    const [filteredExpenses, setFilteredExpenses] = useState(expenses);

    useEffect(() => {
        let updatedExpenses = expenses;

        if (filters.category) {
            updatedExpenses = updatedExpenses.filter(exp => exp.category === filters.category);
        }

        if (filters.minAmount) {
            updatedExpenses = updatedExpenses.filter(exp => exp.amount >= Number(filters.minAmount));
        }

        if (filters.maxAmount) {
            updatedExpenses = updatedExpenses.filter(exp => exp.amount <= Number(filters.maxAmount));
        }

        if (filters.date) {
            updatedExpenses = updatedExpenses.filter(exp => exp.date === filters.date);
        }

        setFilteredExpenses(updatedExpenses);
        onFilterChange(updatedExpenses);  // Send filtered results to parent
    }, [filters, expenses, onFilterChange]);

    const handleChange = (e) => {
        setFilters({ ...filters, [e.target.name]: e.target.value });
    };

    const resetFilters = () => {
        setFilters({ category: '', minAmount: '', maxAmount: '', date: '' });
        onFilterChange(expenses);  // Reset to full expenses list
    };

    return (
        <div className="expense-filters">
            <h2>Filter Expenses</h2>

            <div className="filters-container">
                <div>
                    <label>Category:</label>
                    <select name="category" value={filters.category} onChange={handleChange}>
                        <option value="">All</option>
                        <option value="Food">Food</option>
                        <option value="Transport">Transport</option>
                        <option value="Bills">Bills</option>
                        <option value="Entertainment">Entertainment</option>
                    </select>
                </div>

                <div>
                    <label>Min Amount:</label>
                    <input type="number" name="minAmount" value={filters.minAmount} onChange={handleChange} />
                </div>

                <div>
                    <label>Max Amount:</label>
                    <input type="number" name="maxAmount" value={filters.maxAmount} onChange={handleChange} />
                </div>

                <div>
                    <label>Date:</label>
                    <input type="date" name="date" value={filters.date} onChange={handleChange} />
                </div>
            </div>

            <button onClick={resetFilters}>Reset Filters</button>

            {/* Display Filtered Results */}
            <div className="expense-results">
                {filteredExpenses.length === 0 ? (
                    <p>No matching expenses found.</p>
                ) : (
                    <ul>
                        {filteredExpenses.map(exp => (
                            <li key={exp._id} className="expense-item">
                                <strong>{exp.category}</strong> - ${exp.amount} on {exp.date} ({exp.paymentMethod})
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};

export default ExpenseFilters;
