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
    <div className="container" style={{ paddingTop: '50px', paddingBottom: '50px' }}>
      <h2 className="mb-3">Income List</h2>
      <Link to="/income/new">
        <button type="button" className="btn" style={{ color: 'white', backgroundColor: '#e76e50', marginTop: '20px' }}>Add New Income</button>
      </Link>
      <div className="card mx-auto" style={{ maxWidth: '800px', backgroundColor: '#82c4be', marginTop: '20px' }}>
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
            {incomes.map(income => (
              <tr key={income._id}>
                <td>{income.category}</td>
                <td>{income.amount}</td>
                <td>{income.currency}</td>
                <td>{new Date(income.date).toLocaleDateString('en-GB')}</td>
                <td>
                  <button onClick={() => handleEdit(income)} className="btn btn-sm mr-2" style={{ color: 'white', backgroundColor: '#006c75' }}>Edit</button>
                  <button onClick={() => handleDelete(income._id)} className="btn btn-danger btn-sm" style={{ backgroundColor: '#yourBackgroundColor', color: '#yourTextColor', marginLeft: '4px' }}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {editingIncome && (
        <div className="mt-3">
          <h2>Edit Income</h2>
          <IncomeForm income={editingIncome} onFinish={() => {
            fetchIncomeData();
            setEditingIncome(null);
          }} />
          <button onClick={() => setEditingIncome(null)} className="btn btn-secondary mt-2">Cancel</button>
        </div>
      )}
    </div>
  );
}    
export default IncomeList;
