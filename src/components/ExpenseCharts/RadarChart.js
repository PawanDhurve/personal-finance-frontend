import React, { useMemo } from 'react';
import { Radar } from 'react-chartjs-2';
import { Chart, RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend } from 'chart.js';

// Register necessary Chart.js components
Chart.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend);

const RadarChart = ({ expenses = [] }) => {
    const categoryData = useMemo(() => {
        return expenses.reduce((acc, expense) => {
            if (expense?.category && typeof expense.amount === 'number') {
                acc[expense.category] = (acc[expense.category] || 0) + expense.amount;
            }
            return acc;
        }, {});
    }, [expenses]);

    const radarData = useMemo(() => ({
        labels: Object.keys(categoryData),
        datasets: [{
            label: 'Spending by Category',
            data: Object.values(categoryData),
            borderColor: '#4CAF50',
            backgroundColor: 'rgba(76, 175, 80, 0.2)',
        }],
    }), [categoryData]);

    return (
        <div className="chart-container">
            <h3>Radar Chart: Spending Comparison</h3>
            <Radar data={radarData} />
        </div>
    );
};

export default RadarChart;
