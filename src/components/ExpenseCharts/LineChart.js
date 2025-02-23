import React, { useMemo } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart, CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend } from 'chart.js';

// Register necessary Chart.js components
Chart.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend);

const LineChart = ({ expenses = [] }) => {
    const lineData = useMemo(() => ({
        labels: expenses.map(exp => exp.date ? new Date(exp.date).toLocaleDateString() : 'Unknown'),
        datasets: [{
            label: 'Expenses Over Time',
            data: expenses.map(exp => typeof exp.amount === 'number' ? exp.amount : 0),
            fill: false,
            borderColor: '#4CAF50',
            tension: 0.4, // Smooth curve
        }],
    }), [expenses]);

    return (
        <div className="chart-container">
            <h3>Line Chart: Spending Trends</h3>
            <Line data={lineData} />
        </div>
    );
};

export default LineChart;
