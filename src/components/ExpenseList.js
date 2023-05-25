
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ExpenseForm from './ExpenseForm';
import { Link } from 'react-router-dom';

function ExpenseList() {
  const [expenses, setExpenses] = useState([]);
  const [editingExpense, setEditingExpense] = useState(null);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const [newExpense, setNewExpense] = useState({
    category: '',
    amount: '',
    date: new Date().toLocaleDateString('en-GB').split('/').join('.'),
    currency: '',
    description: '',
  });

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

      if (Array.isArray(response.data)) {
        setExpenses(response.data);
      } else {
        console.log("Error: Expected array but received:", response.data);
      }    
    } catch (error) {
      console.error(error);
    }
  };


  const handleEdit = expense => {
    const expenseToEdit = { ...expense };
  
    // Convert date into required format yyyy-MM-dd
    const date = new Date(expenseToEdit.date);
    let day = date.getUTCDate(); // get the day as a number (1-31)
    let month = date.getUTCMonth() + 1; // get the month as a number (0-11) + 1
    let year = date.getUTCFullYear(); // get the year as a number
  
    // Add leading zeros if day or month is less than 10
    day = day < 10 ? `0${day}` : day;
    month = month < 10 ? `0${month}` : month;
  
    const formattedDate = `${year}-${month}-${day}`;  // combine year, month, day with hyphens
  
    expenseToEdit.date = formattedDate;
    
    setEditingExpense(expenseToEdit);
  };

  const handleInputChange = (e, expenseSetter) => {
    const { name, value } = e.target;
    expenseSetter((prevExpense) => ({
      ...prevExpense,
      [name]: value,
    }));
  };

  const handleDelete = async (id) => {
    const authToken = localStorage.getItem('authToken');
    try {
      await axios.delete(`/expense/${id}`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });

      setExpenses(expenses.filter((expense) => expense._id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = async (e, expense, setter) => {
    e.preventDefault();

    const authToken = localStorage.getItem('authToken');
    try {
      setIsUpdating(true);

      if (expense._id) {
        await axios.put(`/expense/${expense._id}`, expense, {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        });
      } else {
        await axios.post('/expense', expense, {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        });
      }

      fetchExpenseData();
      setter({
        category: '',
        amount: '',
        date: new Date().toLocaleDateString('en-GB').split('/').join('.'),
        currency: '',
        description: '',
      });
      setIsSubmitted(true);
    } catch (error) {
      console.error(error);
    } finally {
      setIsUpdating(false);
    }
  };

  useEffect(() => {
    if (isSubmitted) {
      setEditingExpense(null);
      setIsSubmitted(false);
    }
  }, [isSubmitted]);

  return (
    <div className="container" style={{ paddingTop: '50px', paddingBottom: '50px', minWidth: '60%' /*width: '40%'*/  }}  > 
      <h1 className="mb-3">Expense List</h1>

      <button
        type="button"
        className="btn"
        style={{ color: 'white', backgroundColor: '#e76e50', marginTop: '20px' }}
        onClick={() => setEditingExpense({})}
      >
        Add New Expense
      </button>
      <div className="card mx-auto" style={{ maxWidth: '800px', backgroundColor: '#82c4be', marginTop: '20px' }}>
        <table className="table">
          <thead>
            <tr>
              <th>Category</th>
              <th>Amount</th>
              <th>Date</th>
              <th>Currency</th>
              <th>Description</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
          {Array.isArray(expenses) && expenses.map(expense => (
              <tr key={expense._id}>
                <td>{expense.category}</td>
                <td>{expense.amount}</td>
                <td>{new Date(expense.date).toLocaleDateString('en-GB')}</td>
                <td>{expense.currency}</td>
                <td>{expense.description}</td>
                <td>
                  <button
                    onClick={() => handleEdit(expense)}
                    className="btn btn-sm mr-2"
                    style={{ color: 'white', backgroundColor: '#006c75' }}
                  >
                    Edit
</button>
                  <button
                    onClick={() => handleDelete(expense._id)}
                    className="btn btn-danger btn-sm"
                    style={{ backgroundColor: '#yourBackgroundColor', color: '#yourTextColor', marginLeft: '4px' }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {editingExpense && (
        <div className="mt-3">
          <h3>{editingExpense._id ? 'Edit Expense' : 'Add New Expense'}</h3>
          <form onSubmit={(e) => handleSubmit(e, editingExpense, setEditingExpense)}>
            <table className="table">
              <tbody>
                <tr>
                  <td className="no-border">
                    <label>Category:</label>
                  </td>
                  <td className="no-border">
                    <input
                      type="text"
                      className="form-control"
                      name="category"
                      required
                      value={editingExpense.category || ''}
                      onChange={(e) => handleInputChange(e, setEditingExpense)}
                      style={{ width: '55%' }}
                    />
                  </td>
                  <td className="no-border">
                    <label>Amount:</label>
                  </td>
                  <td className="no-border">
                    <input
                      type="number"
                      className="form-control"
                      name="amount"
                      required
                      value={editingExpense.amount || ''}
                      onChange={(e) => handleInputChange(e, setEditingExpense)}
                      style={{ width: '30%' }}
                    />
                  </td>
                </tr>
                <tr>
                  <td className="no-border">
                    <label>Date:</label>
                  </td>
                  <td className="no-border">
                    <input
                      type="date"
                      className="form-control"
                      name="date"
                      required
                      value={editingExpense.date || ''}
                      onChange={(e) => handleInputChange(e, setEditingExpense)}
                      style={{ width: '55%' }}
                    />
                  </td>
                  <td className="no-border">
                    <label>Currency:</label>
                  </td>
                  <td className="no-border">
                    <select
                      className="form-control"
                      name="currency"
                      required
                      value={editingExpense.currency || ''}
                      onChange={(e) => handleInputChange(e, setEditingExpense)}
                      style={{ width: '30%' }}
                    >
                      <option value="">Please choose an option</option>
                      <option value="USD">USD</option>
                      <option value="EUR">EUR</option>
                      <option value="JPY">JPY</option>
                    </select>
                  </td>
                </tr>
                <tr>
                  <td className="no-border">
                    <label>Description:</label>
                  </td>
                  <td className="no-border" colSpan="3">
                    <textarea
                      className="form-control"
                      name="description"
                      value={editingExpense.description || ''}
                      onChange={(e) => handleInputChange(e, setEditingExpense)}
                      style={{ width: '71.7%' }}
                    ></textarea>
                  </td>
                </tr>
                <tr>
                  <td colSpan="4" className="no-border">
                  
                    <button type="submit" style={{ color: 'white', backgroundColor: '#e76e50', marginRight: '5px' }} className="btn" disabled={isUpdating}>
{isUpdating ? 'Updating...' : 'Submit'}
                    </button>
                    <button onClick={() => setEditingExpense(null)} className="btn btn-secondary" disabled={isUpdating}>
                      Cancel
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </form>
        </div>
      )}
    </div>
  );
}

export default ExpenseList;

