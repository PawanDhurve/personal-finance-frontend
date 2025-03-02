import React from 'react';
import './ExpenseList.css';


const ExpenseList = ({ expenses }) => {
    return (
        <div className="expense-list">
            <h2>Expense List</h2>
            <ul>
                {expenses.map((expense, index) => (
                    <li key={index}>
                        <strong>{expense.category}:</strong> ${expense.amount} - {expense.date}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ExpenseList;
