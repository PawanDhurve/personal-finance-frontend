import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const MonthlyBarChart = ({ expenses }) => {
    if (expenses.length === 0) return <p>No spending data available.</p>;

    // Group expenses by month
    const monthlyTotals = expenses.reduce((acc, exp) => {
        const month = new Date(exp.date).toLocaleString('default', { month: 'short' });
        acc[month] = (acc[month] || 0) + parseFloat(exp.amount);
        return acc;
    }, {});

    // Convert to chart data format
    const chartData = Object.keys(monthlyTotals).map((month) => ({
        name: month,
        spending: monthlyTotals[month],
    }));

    return (
        <div className="chart-container">
            <h3>Monthly Spending Trends</h3>
            <ResponsiveContainer width="100%" height={300}>
                <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="spending" fill="#82ca9d" />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};

export default MonthlyBarChart;
