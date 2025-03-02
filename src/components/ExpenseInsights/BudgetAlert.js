import React from 'react';
import './BudgetAlert.css';

const BudgetAlert = ({ budgetExceeded, budgetLimit }) => {
    return (
        budgetExceeded && <p className="alert">⚠️ Warning: You have exceeded your budget limit of ${budgetLimit}!</p>
    );
};

export default BudgetAlert;
