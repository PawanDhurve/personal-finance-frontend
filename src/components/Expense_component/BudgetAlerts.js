import React, { useEffect, useState } from 'react';
import { Pie, Line } from 'react-chartjs-2';
import 'chart.js/auto';
import axios from 'axios';
import './BudgetAlerts.css';

const BudgetAlerts = ({ expenses, budgetLimit, income }) => {
    const [alertMessage, setAlertMessage] = useState('');
    const [alertColor, setAlertColor] = useState('');
    const [budgetPercentage, setBudgetPercentage] = useState(0);
    const [savings, setSavings] = useState(0);
    const [expenseTrends, setExpenseTrends] = useState([]);
    const [recentTransactions, setRecentTransactions] = useState([]);
    const [currency, setCurrency] = useState('USD');
    const [convertedBudget, setConvertedBudget] = useState(budgetLimit);
    const [isSummaryOpen, setIsSummaryOpen] = useState(false); // 🔹 Toggle dropdown

    useEffect(() => {
        calculateBudget();
        fetchExpenseTrends();
        fetchRecentTransactions();
    }, [expenses, budgetLimit, income]);

    const calculateBudget = () => {
        const totalExpenses = expenses.reduce((sum, exp) => sum + exp.amount, 0);
        const percentage = (totalExpenses / budgetLimit) * 100;
        setBudgetPercentage(percentage);
        setSavings(income - totalExpenses);

        if (totalExpenses > budgetLimit) {
            setAlertMessage('⚠️ Warning: You have exceeded your budget!');
            setAlertColor('red');
        } else if (totalExpenses > budgetLimit * 0.8) {
            setAlertMessage('⚠️ Caution: You are nearing your budget limit.');
            setAlertColor('orange');
        } else {
            setAlertMessage('✅ You are within your budget.');
            setAlertColor('green');
        }
    };

    const fetchExpenseTrends = async () => {
        setExpenseTrends([
            { date: '2025-02-01', amount: 100 },
            { date: '2025-02-05', amount: 150 },
            { date: '2025-02-10', amount: 200 },
            { date: '2025-02-15', amount: 250 },
        ]);
    };

    const fetchRecentTransactions = async () => {
        setRecentTransactions(expenses.slice(-5).reverse());
    };

    const convertCurrency = async (newCurrency) => {
        try {
            const response = await axios.get(`https://api.exchangerate-api.com/v4/latest/USD`);
            const rate = response.data.rates[newCurrency];
            setConvertedBudget((budgetLimit * rate).toFixed(2));
            setCurrency(newCurrency);
        } catch (error) {
            console.error('Currency conversion failed:', error);
        }
    };

    const categoryTotals = expenses.reduce((acc, exp) => {
        acc[exp.category] = (acc[exp.category] || 0) + exp.amount;
        return acc;
    }, {});

    const categoryChartData = {
        labels: Object.keys(categoryTotals),
        datasets: [{
            data: Object.values(categoryTotals),
            backgroundColor: ['#ff6384', '#36a2eb', '#ffce56', '#4caf50', '#ff9800'],
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
        <div className="budget-alerts">
            {/* 🔽 Budget Summary Toggle Button */}
            <button className="summary-toggle" onClick={() => setIsSummaryOpen(!isSummaryOpen)}>
                {isSummaryOpen ? '🔽 Hide Summary' : '▶ Show Summary'}
            </button>

            {/* 🔽 Budget Summary (Hidden by Default) */}
            {isSummaryOpen && (
                <div className="budget-summary">
                    <p><strong>Total Income:</strong> ${income}</p>
                    <p><strong>Total Expenses:</strong> ${expenses.reduce((sum, exp) => sum + exp.amount, 0)}</p>
                    <p><strong>Savings:</strong> ${savings}</p>
                    <p><strong>Budget Limit:</strong> {currency} {convertedBudget}</p>

                    <div className="currency-selector">
                        <label>Currency:</label>
                        <select onChange={(e) => convertCurrency(e.target.value)}>
                            <option value="USD">USD</option>
                            <option value="EUR">EUR</option>
                            <option value="GBP">GBP</option>
                            <option value="INR">INR</option>
                        </select>
                    </div>
                </div>
            )}

            {/* 🔹 Budget Alert Always Visible Below Dropdown */}
            <div className="budget-alert" style={{ backgroundColor: alertColor }}>
                <p className="alert-message">{alertMessage}</p>
            </div>

            {/* 🔹 Budget Percentage Always Visible Below Dropdown */}
            <div className="budget-percentage">
                <div className="progress-bar-container">
                    <div className="progress-bar" style={{ width: `${Math.min(budgetPercentage, 100)}%`, backgroundColor: alertColor }}></div>
                </div>
                <p>{Math.min(budgetPercentage, 100).toFixed(2)}% of budget used</p>
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

            <div className="recent-transactions">
                <h3>Recent Transactions</h3>
                <ul>
                    {recentTransactions.map((tx, index) => (
                        <li key={index}>{tx.date} - {tx.category}: ${tx.amount}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default BudgetAlerts;
