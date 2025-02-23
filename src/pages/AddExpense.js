import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaPlus, FaChartPie, FaLightbulb, FaEdit, FaTrash, FaTimes } from 'react-icons/fa';
import axios from 'axios';
import AddExpenseForm from '../components/Expense_component/AddExpenseForm';
import ExpenseFilters from '../components/Expense_component/ExpenseFilters';
import BudgetAlerts from '../components/Expense_component/BudgetAlerts';
import CollaborationTools from '../components/Expense_component/CollaborationTools';
import SecurityBackup from '../components/Expense_component/SecurityBackup';
import AutomationTools from '../components/Expense_component/AutomationTools';
import './AddExpense.css';

const API_BASE_URL = "http://localhost:8080";

const ExpensePage = () => {
    const [expenses, setExpenses] = useState([]);
    const [filteredExpenses, setFilteredExpenses] = useState([]);
    const [budgetLimit, setBudgetLimit] = useState(5000);
    const [showAddExpense, setShowAddExpense] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        fetchExpenses();
    }, []);

    const getAuthToken = () => localStorage.getItem('token'); // Retrieve token from localStorage

    const fetchExpenses = async () => {
        try {
            const token = getAuthToken();
            if (!token) {
                console.error("No authentication token found.");
                alert("Unauthorized: Please log in.");
                return;
            }
            const response = await axios.get(`${API_BASE_URL}/api/expenses`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setExpenses(response.data);
            setFilteredExpenses(response.data);
        } catch (error) {
            console.error('Error fetching expenses:', error?.response?.data || error.message);
            alert('Failed to fetch expenses. Check the console for details.');
        }
    };

    const addExpense = async (expenseData) => {
        try {
            const token = getAuthToken();
            const response = await axios.post(`${API_BASE_URL}/api/expenses`, expenseData, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setExpenses([...expenses, response.data]);
            setFilteredExpenses([...expenses, response.data]);
            setShowAddExpense(false);
            document.body.classList.remove('no-scroll');
        } catch (error) {
            console.error('Error adding expense:', error?.response?.data || error.message);
            alert('Failed to add expense. Please try again.');
        }
    };

    const deleteExpense = async (id) => {
        try {
            const token = getAuthToken();
            await axios.delete(`${API_BASE_URL}/api/expenses/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setExpenses(expenses.filter(expense => expense._id !== id));
            setFilteredExpenses(filteredExpenses.filter(expense => expense._id !== id));
        } catch (error) {
            console.error('Error deleting expense:', error?.response?.data || error.message);
            alert('Failed to delete expense.');
        }
    };

    const openModal = () => {
        setShowAddExpense(true);
        document.body.classList.add('no-scroll');
    };

    const closeModal = () => {
        setShowAddExpense(false);
        document.body.classList.remove('no-scroll');
    };

    return (
        <div className="expense-page">
            <h1>Expense Tracker</h1>
            <div className="action-buttons">
                <button className="action-btn" onClick={openModal}>
                    <FaPlus className="icon" /> Add Expense
                </button>
                <button className="action-btn" onClick={() => navigate('/expense-charts')}>
                    <FaChartPie className="icon" /> Expense Charts
                </button>
                <button className="action-btn" onClick={() => navigate('/expense-insights')}>
                    <FaLightbulb className="icon" /> Expense Insights
                </button>
            </div>
            <BudgetAlerts expenses={expenses} budgetLimit={budgetLimit} />
            <ExpenseFilters expenses={expenses} onFilterChange={setFilteredExpenses} />
            <div className="expense-section">
                <h2>Expense List</h2>
                <table className="expense-table">
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Category</th>
                            <th>Amount</th>
                            <th>Description</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredExpenses.map((expense) => (
                            <tr key={expense._id}>
                                <td>{new Date(expense.date).toLocaleDateString()}</td>
                                <td>{expense.category}</td>
                                <td>${expense.amount.toFixed(2)}</td>
                                <td>{expense.description}</td>
                                <td>
                                    <button className="edit-btn">
                                        <FaEdit />
                                    </button>
                                    <button className="delete-btn" onClick={() => deleteExpense(expense._id)}>
                                        <FaTrash />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <AutomationTools expenses={expenses} />
            <CollaborationTools expenses={expenses} />
            <SecurityBackup expenses={expenses} />
            {showAddExpense && (
                <div className="modal-overlay" onClick={closeModal}>
                    <div className="modal slide-up" onClick={(e) => e.stopPropagation()}>
                        <button className="close-icon" onClick={closeModal}>
                            <FaTimes />
                        </button>
                        <h2>Add Expense</h2>
                        <AddExpenseForm onAddExpense={addExpense} />
                    </div>
                </div>
            )}
        </div>
    );
};

export default ExpensePage;