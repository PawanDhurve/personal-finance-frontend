import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import { Pie, Line } from 'react-chartjs-2';
import 'chart.js/auto';
import './ExpenseSummary.css';

const ExpenseSummary = () => {
    const [totalIncome, setTotalIncome] = useState(0);
    const [totalExpenses, setTotalExpenses] = useState(0);
    const [savings, setSavings] = useState(0);
    const [expensesByCategory, setExpensesByCategory] = useState({});
    const [expenseTrends, setExpenseTrends] = useState([]);
    const [filter, setFilter] = useState({ dateRange: 'monthly', category: 'all' });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchExpenseSummary = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.get(`/api/expenses/summary`, { params: filter });
            const { totalIncome, totalExpenses, savings, categoryBreakdown, trends } = response.data;
            
            setTotalIncome(totalIncome);
            setTotalExpenses(totalExpenses);
            setSavings(savings);
            setExpensesByCategory(categoryBreakdown);
            setExpenseTrends(trends);
        } catch (error) {
            console.error('Error fetching expense summary:', error);
            setError('Failed to load data. Please try again.');
        }
        setLoading(false);
    }, [filter]);

    useEffect(() => {
        fetchExpenseSummary();
    }, [fetchExpenseSummary]);

    const categoryChartData = {
        labels: Object.keys(expensesByCategory),
        datasets: [{
            data: Object.values(expensesByCategory),
            backgroundColor: ['#ff6384', '#36a2eb', '#ffce56', '#4bc0c0', '#9966ff'],
        }]
    };

    const trendsChartData = {
        labels: expenseTrends.map(entry => entry.date),
        datasets: [{
            label: 'Expenses Over Time',
            data: expenseTrends.map(entry => entry.amount),
            borderColor: '#36a2eb',
            fill: false,
        }]
    };

    return (
        <div className="expense-summary">
            <h2>Expense Summary</h2>
            {loading && <p>Loading data...</p>}
            {error && <p className="error">{error}</p>}
            {!loading && !error && (
                <>
                    <div className="summary-details">
                        <p><strong>Total Income:</strong> ${totalIncome}</p>
                        <p><strong>Total Expenses:</strong> ${totalExpenses}</p>
                        <p><strong>Savings:</strong> ${savings}</p>
                    </div>
                    <div className="filters">
                        <label>Date Range:</label>
                        <select value={filter.dateRange} onChange={(e) => setFilter(prev => ({ ...prev, dateRange: e.target.value }))}>
                            <option value="monthly">Monthly</option>
                            <option value="weekly">Weekly</option>
                            <option value="yearly">Yearly</option>
                        </select>
                        <label>Category:</label>
                        <select value={filter.category} onChange={(e) => setFilter(prev => ({ ...prev, category: e.target.value }))}>
                            <option value="all">All</option>
                            <option value="food">Food</option>
                            <option value="transport">Transport</option>
                            <option value="bills">Bills</option>
                            <option value="entertainment">Entertainment</option>
                        </select>
                    </div>
                    <div className="charts">
                        <div className="chart-container">
                            <h3>Expenses by Category</h3>
                            <Pie data={categoryChartData} />
                        </div>
                        <div className="chart-container">
                            <h3>Expense Trends</h3>
                            <Line data={trendsChartData} />
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default ExpenseSummary;
