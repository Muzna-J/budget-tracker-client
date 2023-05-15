import React, { useState, useEffect } from 'react';
import axios from 'axios';
import IncomeForm from './IncomeForm';
import { Link } from 'react-router-dom';

function IncomeList() {
  const [incomes, setIncomes] = useState([]);
  const [editingIncome, setEditingIncome] = useState(null);
  
  useEffect(() => {
    fetchIncomeData();
  }, []);

  const fetchIncomeData = async () => {
    const authToken = localStorage.getItem('authToken');
    try {
      const response = await axios.get('/income', {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });

      setIncomes(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleEdit = income => {
    setEditingIncome(income);
  };

  const handleDelete = async (id) => {
    const authToken = localStorage.getItem('authToken');
    try {
      await axios.delete(`/income/${id}`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });

      // Update the local state
      setIncomes(incomes.filter(income => income._id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h2>Income List</h2>
      <Link to="/income/new">
        <button type="button" className="btn btn-primary mb-3">Add New Income</button>
      </Link>
      <ul>
        {incomes.map(income => (
          <li key={income._id}>
            {income.category}: {income.amount} {income.currency}
            <button onClick={() => handleEdit(income)}>Edit</button>
            <button onClick={() => handleDelete(income._id)}>Delete</button>
          </li>
        ))}
      </ul>

      {editingIncome && (
        <div>
          <h2>Edit Income</h2>
          <IncomeForm income={editingIncome} onFinish={() => { 
            fetchIncomeData();
            setEditingIncome(null); }} />
          <button onClick={() => setEditingIncome(null)}>Cancel</button>
        </div>
      )}
    </div>
  );
}

export default IncomeList;
