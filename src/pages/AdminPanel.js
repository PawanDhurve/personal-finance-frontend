import React, { useState, useEffect } from 'react';
import './AdminPanel.css';

const AdminPanel = () => {
  const [users, setUsers] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [logs, setLogs] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedTransaction, setSelectedTransaction] = useState(null);

  useEffect(() => {
    // Fetch data for users, transactions, and logs (mock example)
    setUsers([
      { id: 1, name: 'John Doe', email: 'john@example.com', status: 'active' },
      { id: 2, name: 'Jane Smith', email: 'jane@example.com', status: 'inactive' },
    ]);

    setTransactions([
      { id: 1, user: 'John Doe', amount: 200, date: '2025-02-01', status: 'completed' },
      { id: 2, user: 'Jane Smith', amount: 150, date: '2025-02-02', status: 'pending' },
    ]);

    setLogs([
      { id: 1, action: 'User login', timestamp: '2025-02-18 10:15 AM', alert: false },
      { id: 2, action: 'Suspicious login attempt', timestamp: '2025-02-18 10:20 AM', alert: true },
    ]);
  }, []);

  const handleUserStatusChange = (id, status) => {
    setUsers(users.map(user => (user.id === id ? { ...user, status } : user)));
  };

  const handleDeleteTransaction = (id) => {
    setTransactions(transactions.filter(transaction => transaction.id !== id));
  };

  const handleViewLog = (log) => {
    alert(`Log Details: ${log.action} at ${log.timestamp}`);
  };

  return (
    <div className="admin-panel">
      <h1>Admin Panel</h1>

      {/* User Management Section */}
      <div className="section">
        <h2>User Management</h2>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>
                  <span className={`status ${user.status}`}>{user.status}</span>
                </td>
                <td>
                  <button onClick={() => handleUserStatusChange(user.id, user.status === 'active' ? 'inactive' : 'active')}>
                    Toggle Status
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Transaction Management Section */}
      <div className="section">
        <h2>Transactions</h2>
        <table>
          <thead>
            <tr>
              <th>User</th>
              <th>Amount</th>
              <th>Date</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction) => (
              <tr key={transaction.id}>
                <td>{transaction.user}</td>
                <td>{transaction.amount}</td>
                <td>{transaction.date}</td>
                <td>
                  <span className={`status ${transaction.status}`}>{transaction.status}</span>
                </td>
                <td>
                  <button onClick={() => handleDeleteTransaction(transaction.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* System Logs Section */}
      <div className="section">
        <h2>System Logs</h2>
        <ul>
          {logs.map((log) => (
            <li
              key={log.id}
              className={log.alert ? 'alert' : ''}
              onClick={() => handleViewLog(log)}
            >
              {log.action} - {log.timestamp}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AdminPanel;
