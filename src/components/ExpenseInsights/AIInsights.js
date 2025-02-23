import React from 'react';
import './AIInsights.css';
import TotalSpent from './TotalSpent';
import TopCategory from './TopCategory';
import AverageExpense from './AverageExpense';
import MonthlySpending from './MonthlySpending';
import PredictedSpending from './PredictedSpending';
import BudgetAlert from './BudgetAlert';
import CategoryPieChart from './CategoryPieChart';
import MonthlyBarChart from './MonthlyBarChart';

const AIInsights = ({ expenses = [] }) => {  
    // ✅ Prevent crashes due to missing or undefined expenses
    if (!Array.isArray(expenses) || expenses.length === 0) {
        return <p className="no-expenses">No expenses recorded yet.</p>;
    }

    // ✅ Safe parsing of amount
    const safeParseAmount = (amount) => parseFloat(amount) || 0;

    // ✅ Calculate total spent
    const totalSpent = expenses.reduce((acc, exp) => acc + safeParseAmount(exp.amount), 0);

    // ✅ Calculate category-wise spending
    const categoryTotals = expenses.reduce((acc, exp) => {
        const category = exp.category?.trim() || 'Other';  // Handle empty category
        acc[category] = (acc[category] || 0) + safeParseAmount(exp.amount);
        return acc;
    }, {});

    // ✅ Find top spending category
    const topCategory = Object.keys(categoryTotals).reduce(
        (a, b) => (categoryTotals[a] > categoryTotals[b] ? a : b), 
        'None'
    );

    // ✅ Calculate average expense
    const averageExpense = expenses.length > 0 ? (totalSpent / expenses.length).toFixed(2) : "0.00";

    // ✅ Budget alert logic
    const budgetLimit = 1000;
    const budgetExceeded = totalSpent > budgetLimit;

    // ✅ Get current & previous month spending
    const currentMonth = new Date().getMonth();
    const previousMonth = currentMonth === 0 ? 11 : currentMonth - 1;

    const monthlySpending = expenses.reduce((acc, exp) => {
        if (exp.date) {  // Prevent errors if `date` is missing
            const month = new Date(exp.date).getMonth();
            acc[month] = (acc[month] || 0) + safeParseAmount(exp.amount);
        }
        return acc;
    }, {});

    const currentMonthSpending = monthlySpending[currentMonth] || 0;
    const previousMonthSpending = monthlySpending[previousMonth] || 0;

    // ✅ Predict next month's spending based on last 2 months
    const predictedNextMonthSpending = ((currentMonthSpending + previousMonthSpending) / 2).toFixed(2);

    return (
        <div className="ai-insights fade-in">
            <h2>AI-Powered Insights</h2>
            
            <TotalSpent totalSpent={totalSpent} />
            <TopCategory topCategory={topCategory} />
            <AverageExpense averageExpense={averageExpense} />
            
            <MonthlySpending 
                currentMonthSpending={currentMonthSpending} 
                previousMonthSpending={previousMonthSpending} 
            />
            
            <PredictedSpending predictedNextMonthSpending={predictedNextMonthSpending} />
            <BudgetAlert budgetExceeded={budgetExceeded} budgetLimit={budgetLimit} />

            {/* ✅ Charts for expense breakdown */}
            <CategoryPieChart expenses={expenses} />
            <MonthlyBarChart expenses={expenses} />
        </div>
    );
};

export default AIInsights;
