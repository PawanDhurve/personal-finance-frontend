import { useState } from "react";
import React from 'react';
import { motion } from "framer-motion";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, BarChart, Bar, Legend } from "recharts"; // Corrected import
import { FaPlus } from "react-icons/fa";
import './Dashboard.css'; // Import the new CSS file

const data = [
  { name: "Food", value: 400 },
  { name: "Transport", value: 300 },
  { name: "Entertainment", value: 200 },
  { name: "Bills", value: 500 },
];
const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const expenseData = [
  { month: "Jan", expense: 400 },
  { month: "Feb", expense: 600 },
  { month: "Mar", expense: 500 },
  { month: "Apr", expense: 700 },
];

const financialData = [
  { month: "Jan", income: 3000, expenses: 1500 },
  { month: "Feb", income: 3500, expenses: 1800 },
  { month: "Mar", income: 4000, expenses: 1700 },
  { month: "Apr", income: 4200, expenses: 1900 },
];

const Dashboard = () => {
  const [balance, setBalance] = useState(5000);
  const [expenses, setExpenses] = useState(1400);
  const [income, setIncome] = useState(6400);

  return (
    <div className="dashboard-container">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="dashboard-header">
        <h1>Dashboard</h1>
      </motion.div>

      <section className="overview-section">
        <div className="overview-card">
          <h2>Total Balance</h2>
          <p className="text-green-500">${balance}</p>
        </div>
        <div className="overview-card">
          <h2>Income</h2>
          <p className="text-blue-500">${income}</p>
        </div>
        <div className="overview-card">
          <h2>Expenses</h2>
          <p className="text-red-500">${expenses}</p>
        </div>
      </section>

      <section className="graph-section">
        <div className="expense-breakdown">
          <h2>Expense Breakdown</h2>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie data={data} cx="50%" cy="50%" outerRadius={80} fill="#8884d8" dataKey="value" label>
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="expense-trend">
          <h2>Expense Trend</h2>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={expenseData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="expense" stroke="#82ca9d" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </section>

      <section className="add-transaction-btn">
        <button>
          <FaPlus className="icon" /> Add Transaction
        </button>
      </section>

      <div className="weather-widget">
        <div className="location">New York</div>
        <div className="temp">22°C</div>
        <div className="icon">🌤</div>
      </div>

      <div className="activity-feed">
        <h2>Recent Activity</h2>
        <ul>
          <li>
            <div className="event">Transaction added: $200 to Food category</div>
            <div className="timestamp">5 minutes ago</div>
          </li>
          <li>
            <div className="event">Expense updated: Transport $50</div>
            <div className="timestamp">30 minutes ago</div>
          </li>
          <li>
            <div className="event">New income added: $1500</div>
            <div className="timestamp">1 hour ago</div>
          </li>
        </ul>
      </div>

      <div className="goal-tracking">
        <div className="goal-title">Save for Vacation</div>
        <div className="progress-bar">
          <div className="progress" style={{ width: "50%" }}></div>
          <div className="progress-text">50% Complete</div>
        </div>
      </div>

      <div className="progress-circle">
        <span>50%</span>
      </div>
      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={financialData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="income" fill="#4db6ac" />
          <Bar dataKey="expenses" fill="#f97316" />
        </BarChart>
      </ResponsiveContainer>

      <div className="monthly-summary">
        <div className="kpi-card">
          <h3>Total Income</h3>
          <p>${income}</p>
        </div>
        <div className="kpi-card">
          <h3>Total Expenses</h3>
          <p>${expenses}</p>
        </div>
        <div className="kpi-card">
          <h3>Net Savings</h3>
          <p>${income - expenses}</p>
        </div>
      </div>

      <div className="notifications">
        <ul>
          <li>
            <div className="alert">Your bill payment is due tomorrow.</div>
            <div className="timestamp">Just Now</div>
          </li>
          <li>
            <div className="alert">You received a payment of $200</div>
            <div className="timestamp">2 hours ago</div>
          </li>
        </ul>
      </div>

    </div>
  );
};

export default Dashboard;
