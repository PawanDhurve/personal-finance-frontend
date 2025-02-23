import React from 'react';

const MonthlySpending = ({ currentMonthSpending, previousMonthSpending }) => {
    return (
        <>
            <p><strong>This Month’s Spending:</strong> ${currentMonthSpending}</p>
            <p><strong>Last Month’s Spending:</strong> ${previousMonthSpending}</p>
        </>
    );
};

export default MonthlySpending;
