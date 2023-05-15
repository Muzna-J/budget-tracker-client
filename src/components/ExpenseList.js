import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ExpenseForm from './ExpenseForm'; 
import { Link } from 'react-router-dom';

function ExpenseList() {
  const [expenses, setExpenses] = useState([]);
  const [editingExpense, setEditingExpense] = useState(null);

  useEffect(() => {
    fetchExpenseData();
  }, []);

  const fetchExpenseData = async () => {
    const authToken = localStorage.getItem('authToken');
    try {
      const response = await axios.get('/expense', {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });

      setExpenses(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleEdit = (expense) => {
    setEditingExpense(expense);
  };

  const handleDelete = async (id) => {
    const authToken = localStorage.getItem('authToken');
    try {
      await axios.delete(`/expense/${id}`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
      // Refresh the list after delete
      fetchExpenseData();
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpdate = (updatedExpense) => {
    setExpenses(
      expenses.map((expense) => 
        expense._id === updatedExpense._id ? updatedExpense : expense
      )
    );
    setEditingExpense(null);
  };

  return (
    <div>
      <h2>Expense List</h2>
      <Link to="/expense/new">
        <button type="button" className="btn btn-primary mb-3">Add New Expense</button>
      </Link>
      <ul>
        {expenses.map((expense) => (
          <li key={expense._id}>
            {expense.category}: {expense.amount} {expense.currency}
            <button onClick={() => handleEdit(expense)}>Edit</button>
            <button onClick={() => handleDelete(expense._id)}>Delete</button>
          </li>
        ))}
      </ul>
      {editingExpense && (
        <ExpenseForm 
          expense={editingExpense} 
          handleUpdate={handleUpdate}
          cancelUpdate={() => setEditingExpense(null)}
        />
      )}
    </div>
  );
}

export default ExpenseList;

