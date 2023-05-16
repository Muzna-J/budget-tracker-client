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
      <div className="container">
        <h2 className="mb-3">Income List</h2>
        <Link to="/income/new">
          <button type="button" className="btn btn-primary mb-3">Add New Income</button>
        </Link>
        <ul className="list-group">
          {incomes.map(income => (
            <li key={income._id} className="list-group-item d-flex justify-content-between align-items-center">
              {income.category}: {income.amount} {income.currency}
              <div>
                <button onClick={() => handleEdit(income)} className="btn btn-info btn-sm mr-2">Edit</button>
                <button onClick={() => handleDelete(income._id)} className="btn btn-danger btn-sm">Delete</button>
              </div>
            </li>
          ))}
        </ul>
  
        {editingIncome && (
          <div className="mt-3">
            <h2>Edit Income</h2>
            <IncomeForm income={editingIncome} onFinish={() => { 
              fetchIncomeData();
              setEditingIncome(null); }} />
            <button onClick={() => setEditingIncome(null)} className="btn btn-secondary mt-2">Cancel</button>
          </div>
        )}
      </div>
    );
  }
    
export default IncomeList;
