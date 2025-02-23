import React, { useMemo } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart, ArcElement, Tooltip, Legend } from 'chart.js';

// Register necessary Chart.js components
Chart.register(ArcElement, Tooltip, Legend);

const DoughnutChart = ({ expenses = [] }) => {
    const categoryData = useMemo(() => {
        return expenses.reduce((acc, expense) => {
            if (expense?.category && typeof expense.amount === 'number') {
                acc[expense.category] = (acc[expense.category] || 0) + expense.amount;
            }
            return acc;
        }, {});
    }, [expenses]);

    const doughnutData = useMemo(() => ({
        labels: Object.keys(categoryData),
        datasets: [{
            data: Object.values(categoryData),
            backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4CAF50', '#9966FF', '#FF9F40'],
        }],
    }), [categoryData]);

    return (
        <div className="chart-container">
            <h3>Doughnut Chart: Expense Breakdown</h3>
            <Doughnut data={doughnutData} />
        </div>
    );
};

export default DoughnutChart;
