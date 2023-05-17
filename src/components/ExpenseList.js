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
    <div className="container" style={{ paddingTop: '80px' }}>
      <h1 className="mb-3">Expense List</h1>
      <Link to="/expense/new">
      <button type="button" className="btn" style={{ color: 'white', backgroundColor: '#e76e50' , marginTop: '20px' }}>Add New Expense</button>
      </Link>
      <div className="card mx-auto" style={{ maxWidth: '800px' , marginTop: '20px'}}>
      <table className="table">
        <thead>
          <tr>
            <th>Category</th>
            <th>Amount</th>
            <th>Currency</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {expenses.map((expense) => (
            <tr key={expense._id}>
              <td>{expense.category}</td>
              <td>{expense.amount}</td>
              <td>{expense.currency}</td>
              <td>{new Date(expense.date).toLocaleDateString('en-GB')}</td>

              <td>
              <button onClick={() => handleEdit(expense)} className="btn btn-sm mr-2" style={{ color: 'white', backgroundColor: '#006c75' }}>Edit</button>
              <button onClick={() => handleDelete(expense._id)} className="btn btn-danger btn-sm" style={{ backgroundColor: '#yourBackgroundColor', color: '#yourTextColor', marginLeft: '4px' }}>Delete</button>
              </td>

            </tr>
          ))}
        </tbody>
      </table>
      </div>
      {editingExpense && (
        <div className="mt-3">
    <ExpenseForm 
      expense={editingExpense} 
      handleUpdate={handleUpdate}
      cancelUpdate={() => setEditingExpense(null)}
      date={editingExpense.date} // Pass the date as a prop
    />
  </div>
      )}
    </div>
  );
}

export default ExpenseList;

