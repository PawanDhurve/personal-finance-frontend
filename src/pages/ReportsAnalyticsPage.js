import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Pie, Bar, Line } from 'react-chartjs-2';
import { saveAs } from 'file-saver'; // For exporting to CSV
import jsPDF from 'jspdf'; // For exporting to PDF
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  LineElement,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  LineElement
);

const ReportsAnalyticsPage = () => {
  const [expenses, setExpenses] = useState([]);
  const [income, setIncome] = useState([]);
  const [monthlySavings, setMonthlySavings] = useState([]);
  const [bestSavingsMonth, setBestSavingsMonth] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const expenseData = await axios.get('/api/expenses/all');
        const incomeData = await axios.get('/api/income/all');
        setExpenses(expenseData.data);
        setIncome(incomeData.data);
        calculateSavings(expenseData.data, incomeData.data);
      } catch (error) {
        console.error('Error fetching data', error);
      }
    };
    fetchData();
  }, []);

  // Calculate savings for each month and determine the best savings month
  const calculateSavings = (expenses, income) => {
    const monthlyIncome = Array(12).fill(0);
    const monthlyExpenses = Array(12).fill(0);
    const savings = Array(12).fill(0);

    income.forEach((item) => {
      const month = new Date(item.date).getMonth();
      monthlyIncome[month] += item.amount;
    });

    expenses.forEach((item) => {
      const month = new Date(item.date).getMonth();
      monthlyExpenses[month] += item.amount;
    });

    for (let i = 0; i < 12; i++) {
      savings[i] = monthlyIncome[i] - monthlyExpenses[i];
    }

    setMonthlySavings(savings);

    // Find the month with the best savings
    const bestMonthIndex = savings.indexOf(Math.max(...savings));
    setBestSavingsMonth(['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][bestMonthIndex]);
  };

  // Pie Chart - Expense Breakdown
  const expenseBreakdownData = {
    labels: ['Rent', 'Food', 'Transportation', 'Entertainment', 'Miscellaneous'], // Dynamically generate these categories
    datasets: [
      {
        label: 'Expense Breakdown',
        data: [
          expenses.filter((e) => e.category === 'Rent').reduce((sum, e) => sum + e.amount, 0),
          expenses.filter((e) => e.category === 'Food').reduce((sum, e) => sum + e.amount, 0),
          expenses.filter((e) => e.category === 'Transportation').reduce((sum, e) => sum + e.amount, 0),
          expenses.filter((e) => e.category === 'Entertainment').reduce((sum, e) => sum + e.amount, 0),
          expenses.filter((e) => e.category === 'Miscellaneous').reduce((sum, e) => sum + e.amount, 0),
        ],
        backgroundColor: ['#FF5733', '#FFBD33', '#33FF57', '#33A1FF', '#FF33B5'],
        hoverOffset: 4,
      },
    ],
  };

  // Bar Chart - Income vs Expenses
  const incomeVsExpensesData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        label: 'Income',
        data: income.map((item) => item.amount),
        backgroundColor: '#28a745',
      },
      {
        label: 'Expenses',
        data: expenses.map((item) => item.amount),
        backgroundColor: '#dc3545',
      },
    ],
  };

  // Line Chart - Monthly Savings Trends
  const monthlySavingsData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        label: 'Monthly Savings',
        data: monthlySavings,
        borderColor: '#007bff',
        backgroundColor: 'rgba(0, 123, 255, 0.2)',
        fill: true,
        tension: 0.4,
      },
    ],
  };

  // Export CSV Function
  const exportToCSV = () => {
    const csvData = [];
    expenses.forEach((exp) => {
      csvData.push([exp.date, exp.category, exp.amount, exp.notes]);
    });

    const csv = csvData.map((row) => row.join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    saveAs(blob, 'expenses_report.csv');
  };

  // Export PDF Function
  const exportToPDF = () => {
    const doc = new jsPDF();
    doc.text('Expenses Report', 20, 20);
    expenses.forEach((exp, index) => {
      doc.text(`${index + 1}. ${exp.category}: $${exp.amount}`, 20, 30 + index * 10);
    });
    doc.save('expenses_report.pdf');
  };

  return (
    <div className="reports-page">
      <h1>Financial Reports & Analytics</h1>

      {/* Expense Breakdown (Pie Chart) */}
      <div className="chart-container">
        <h2>Expense Breakdown</h2>
        <Pie data={expenseBreakdownData} options={{ responsive: true, animation: { animateScale: true } }} />
      </div>

      {/* Income vs Expense (Bar Chart) */}
      <div className="chart-container">
        <h2>Income vs. Expenses</h2>
        <Bar data={incomeVsExpensesData} options={{ responsive: true, animation: { duration: 1000 } }} />
      </div>

      {/* Monthly Savings Trends (Line Graph) */}
      <div className="chart-container">
        <h2>Monthly Savings Trends</h2>
        <Line data={monthlySavingsData} options={{ responsive: true, animation: { duration: 1000 } }} />
      </div>

      {/* Best Savings Month Badge */}
      <div className="best-savings-month">
        <h3>
          Best Savings Month: <span className="badge">{bestSavingsMonth}</span>
        </h3>
      </div>

      {/* Export Report */}
      <div className="export-buttons">
        <button onClick={exportToCSV}>Export to CSV</button>
        <button onClick={exportToPDF}>Export to PDF</button>
      </div>
    </div>
  );
};

export default ReportsAnalyticsPage;
