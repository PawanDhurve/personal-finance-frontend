import React, { useEffect, useState, useRef, useMemo } from 'react';
import './ExpenseCharts.css';
import { Pie, Line } from 'react-chartjs-2';
import {
    Chart,
    ArcElement,
    Tooltip,
    Legend,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    LineController,
    PieController
} from 'chart.js';

// Import additional chart components
import BarChart from './BarChart';
import ChartSelector from './ChartSelector';
import DoughnutChart from './DoughnutChart';
import LineChart from './LineChart';
import PieChart from './PieChart';
import PolarChart from './PolarChart';
import RadarChart from './RadarChart';

// Register required elements for Chart.js
Chart.register(
    ArcElement,
    Tooltip,
    Legend,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    LineController,
    PieController
);

const ExpenseCharts = ({ initialExpenses = [] }) => {
    const [expenses, setExpenses] = useState(initialExpenses);
    const pieChartRef = useRef(null);
    const lineChartRef = useRef(null);

    // ✅ Real-time updates: Fetch latest expenses from the API (Every 5 seconds)
    useEffect(() => {
        const fetchExpenses = async () => {
            try {
                const response = await fetch('/api/expenses'); // ✅ Replace with your actual backend API
                if (!response.ok) {
                    throw new Error('Failed to fetch expenses');
                }
                const data = await response.json();
                setExpenses(data);
            } catch (error) {
                console.error('Error fetching expenses:', error);
            }
        };

        fetchExpenses(); // Fetch initially
        const interval = setInterval(fetchExpenses, 5000); // Fetch every 5 sec for real-time updates

        return () => clearInterval(interval); // Cleanup on unmount
    }, []);

    // ✅ Use `useMemo` for optimized calculations (Avoid recalculating on every render)
    const categoryData = useMemo(() => {
        return expenses.reduce((acc, expense) => {
            if (expense?.category && typeof expense.amount === 'number') {
                acc[expense.category] = (acc[expense.category] || 0) + expense.amount;
            }
            return acc;
        }, {});
    }, [expenses]);

    // Pie Chart Data
    const pieData = useMemo(() => ({
        labels: Object.keys(categoryData),
        datasets: [{
            data: Object.values(categoryData),
            backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4CAF50', '#9966FF', '#FF9F40'],
        }],
    }), [categoryData]);

    // Line Chart Data
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
        <div className="expense-charts">
            <h2>Expense Charts (Real-Time Updates)</h2>
            
            <div className="chart-container">
                <h3>Category-wise Expenses</h3>
                <Pie ref={pieChartRef} data={pieData} />
            </div>

            <div className="chart-container">
                <h3>Spending Trends</h3>
                <Line ref={lineChartRef} data={lineData} />
            </div>

            {/* ✅ Additional chart components */}
            <div className="chart-container">
                <h3>Bar Chart</h3>
                <BarChart expenses={expenses} />
            </div>

            <div className="chart-container">
                <h3>Doughnut Chart</h3>
                <DoughnutChart expenses={expenses} />
            </div>

            <div className="chart-container">
                <h3>Line Chart</h3>
                <LineChart expenses={expenses} />
            </div>

            <div className="chart-container">
                <h3>Pie Chart</h3>
                <PieChart expenses={expenses} />
            </div>

            <div className="chart-container">
                <h3>Polar Chart</h3>
                <PolarChart expenses={expenses} />
            </div>

            <div className="chart-container">
                <h3>Radar Chart</h3>
                <RadarChart expenses={expenses} />
            </div>
        </div>
    );
};

export default ExpenseCharts;
