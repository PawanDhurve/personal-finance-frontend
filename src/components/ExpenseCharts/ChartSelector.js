import React, { useState } from 'react';
import { Pie, Line, Bar, Doughnut } from 'react-chartjs-2';
import { Chart, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement, BarElement } from 'chart.js';
import './ChartSelector.css';

Chart.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement, BarElement);

const ChartSelector = ({ expenses }) => {
    const [selectedCharts, setSelectedCharts] = useState(['Pie', 'Line']);

    const handleChartSelection = (chartType) => {
        setSelectedCharts(prev => 
            prev.includes(chartType) 
                ? prev.filter(chart => chart !== chartType) 
                : [...prev, chartType]
        );
    };

    const categoryData = expenses.reduce((acc, expense) => {
        acc[expense.category] = (acc[expense.category] || 0) + expense.amount;
        return acc;
    }, {});

    const pieData = {
        labels: Object.keys(categoryData),
        datasets: [{ data: Object.values(categoryData), backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'] }]
    };

    const lineData = {
        labels: expenses.map(exp => new Date(exp.date).toLocaleDateString()),
        datasets: [{ label: 'Expenses Over Time', data: expenses.map(exp => exp.amount), borderColor: '#4CAF50', tension: 0.4 }]
    };

    const barData = {
        labels: Object.keys(categoryData),
        datasets: [{ label: 'Category-wise Expenses', data: Object.values(categoryData), backgroundColor: '#FF6384' }]
    };

    const doughnutData = pieData;

    return (
        <div className="chart-selector">
            <h2>Select Charts</h2>
            <div className="chart-options">
                {['Pie', 'Line', 'Bar', 'Doughnut'].map(chart => (
                    <button key={chart} className={selectedCharts.includes(chart) ? 'active' : ''} onClick={() => handleChartSelection(chart)}>
                        {chart} Chart
                    </button>
                ))}
            </div>
            <div className="charts-container">
                {selectedCharts.includes('Pie') && <div className="chart-box"><h3>Pie Chart</h3><Pie data={pieData} /></div>}
                {selectedCharts.includes('Line') && <div className="chart-box"><h3>Line Chart</h3><Line data={lineData} /></div>}
                {selectedCharts.includes('Bar') && <div className="chart-box"><h3>Bar Chart</h3><Bar data={barData} /></div>}
                {selectedCharts.includes('Doughnut') && <div className="chart-box"><h3>Doughnut Chart</h3><Doughnut data={doughnutData} /></div>}
            </div>
        </div>
    );
};

export default ChartSelector;
