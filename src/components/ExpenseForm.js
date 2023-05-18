import React, { useState, useEffect } from 'react';
import axios from 'axios';
//import { AuthContext } from '../context/auth.context';

function ExpenseForm({ expense = null, handleUpdate, cancelUpdate }) {
  //const { user } = useContext(AuthContext);
  const [category, setCategory] = useState(expense ? expense.category : '');
  const [amount, setAmount] = useState(expense ? expense.amount : '');
  const [date, setDate] = useState(expense ? expense.date : '');
  const [currency, setCurrency] = useState(expense ? expense.currency : '');
  const [description, setDescription] = useState(expense ? expense.description : '');

  useEffect(() => {
    if(expense){
      setCategory(expense.category);
      setAmount(expense.amount);
      setDate(expense.date);
      setCurrency(expense.currency);
      setDescription(expense.description);
    }
  }, [expense]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const authToken = localStorage.getItem('authToken');

    try {
      let response;
      if (expense) {
        response = await axios.put(`/expense/${expense._id}`, {
          category,
          amount,
          date,
          currency,
          description,
        }, {
          headers: {
            'Authorization': `Bearer ${authToken}`
          }
        });
      } else {
        response = await axios.post('/expense', {
          category,
          amount,
          date,
          currency,
          description,
        }, {
          headers: {
            'Authorization': `Bearer ${authToken}`
          }
        });
      }

      if (response.status === 200 || response.status === 201) {
        // Clear the form
        setCategory('');
        setAmount('');
        setDate('');
        setCurrency('');
        setDescription('');
        alert('Expense saved successfully');
        if (expense) {
          handleUpdate(response.data);
        }
      }
    } catch (error) {
      console.error('Failed to save expense', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form-group">
      <label>
        Category:
        <input type="text" className="form-control" value={category} onChange={(e) => setCategory(e.target.value)} required />
      </label>
      <label>
        Amount:
        <input type="number" className="form-control" value={amount} onChange={(e) => setAmount(e.target.value)} required />
      </label>
      <label>
        Date:
        <input type="date" className="form-control" value={date} onChange={(e) => setDate(e.target.value)} required />
      </label>
      <label>
        Currency:
        <select className="form-control" value={currency} onChange={(e) => setCurrency(e.target.value)} required>
          <option value="">--Please choose an option--</option>
          <option value="USD">USD</option>
          <option value="EUR">EUR</option>
          <option value="JPY">JPY</option>
        </select>
      </label>
      <label>
        Description:
        <textarea className="form-control" value={description} onChange={(e) => setDescription(e.target.value)} />
      </label>
      <button type="submit" className="btn btn-primary">{expense ? 'Update' : 'Submit'}</button>
      {expense && (
        <button type="button" className="btn btn-secondary" onClick={cancelUpdate}>Cancel</button>
      )}
    </form>
  );
}
export default ExpenseForm;
