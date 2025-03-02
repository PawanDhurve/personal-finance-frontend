import React from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#FF4567', '#AF19FF'];

const CategoryPieChart = ({ expenses }) => {
    if (expenses.length === 0) return <p>No expenses to display.</p>;

    // Group expenses by category
    const categoryTotals = expenses.reduce((acc, exp) => {
        acc[exp.category] = (acc[exp.category] || 0) + parseFloat(exp.amount);
        return acc;
    }, {});

    // Convert to chart data format
    const chartData = Object.keys(categoryTotals).map((category, index) => ({
        name: category,
        value: categoryTotals[category],
        color: COLORS[index % COLORS.length], // Assign colors dynamically
    }));

    return (
        <div className="chart-container">
            <h3>Category-Wise Spending</h3>
            <PieChart width={350} height={300}>
                <Pie data={chartData} cx="50%" cy="50%" outerRadius={80} fill="#8884d8" dataKey="value">
                    {chartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                </Pie>
                <Tooltip />
                <Legend />
            </PieChart>
        </div>
    );
};

export default CategoryPieChart;
