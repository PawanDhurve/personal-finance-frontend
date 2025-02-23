import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const IncomeManagementPage = () => {
  const [income, setIncome] = useState([]);
  const [source, setSource] = useState('');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState('');
  const [notes, setNotes] = useState('');
  const [monthlyIncome, setMonthlyIncome] = useState([]);

  // Fetch income entries
  useEffect(() => {
    const fetchIncome = async () => {
      try {
        const { data } = await axios.get('/api/income/all'); // Adjust the URL to match your backend
        setIncome(data);
        calculateMonthlyIncome(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchIncome();
  }, []);

  // Calculate monthly income for graph
  const calculateMonthlyIncome = (data) => {
    const incomePerMonth = Array(12).fill(0);
    data.forEach((item) => {
      const month = new Date(item.date).getMonth();
      incomePerMonth[month] += item.amount;
    });
    setMonthlyIncome(incomePerMonth);
  };

  // Add new income
  const addIncome = async () => {
    try {
      const newIncome = { source, amount, date, notes };
      const { data } = await axios.post('/api/income/add', newIncome);
      setIncome([data, ...income]);
      calculateMonthlyIncome([data, ...income]);
      resetForm();
    } catch (err) {
      console.error(err);
    }
  };

  // Reset form after submission
  const resetForm = () => {
    setSource('');
    setAmount('');
    setDate('');
    setNotes('');
  };

  // Chart data for monthly income comparison
  const chartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        label: 'Monthly Income',
        data: monthlyIncome,
        borderColor: 'green',
        backgroundColor: 'rgba(0, 255, 0, 0.2)',
        fill: true,
      },
    ],
  };

  return (
    <div className="income-management-page">
      <h1>Income Management</h1>

      {/* Income Entry Form */}
      <div className="income-form">
        <input
          type="text"
          placeholder="Source"
          value={source}
          onChange={(e) => setSource(e.target.value)}
        />
        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <textarea
          placeholder="Notes"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
        />
        <button onClick={addIncome}>Add Income</button>
      </div>

      {/* Income List & Summary */}
      <div className="income-list">
        <table>
          <thead>
            <tr>
              <th>Source</th>
              <th>Amount</th>
              <th>Date</th>
              <th>Notes</th>
            </tr>
          </thead>
          <tbody>
            {income.map((entry, index) => (
              <tr key={index}>
                <td>{entry.source}</td>
                <td>{entry.amount}</td>
                <td>{new Date(entry.date).toLocaleDateString()}</td>
                <td>{entry.notes}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Graph Representation */}
      <div className="income-graph">
        <h2>Monthly Income Trends</h2>
        <Line data={chartData} />
      </div>
    </div>
  );
};

export default IncomeManagementPage;
