import React, { useState, useEffect } from 'react';
import axios from 'axios';
//import { AuthContext } from '../context/auth.context';

function IncomeForm({ income, onFinish }) {
  //const { user } = useContext(AuthContext);
  const [category, setCategory] = useState(income ? income.category : '');
  const [amount, setAmount] = useState(income ? income.amount : '');
  const [date, setDate] = useState(income ? income.date : '');
  const [currency, setCurrency] = useState(income ? income.currency : '');
  const [description, setDescription] = useState(income ? income.description : '');
  

  useEffect(() => {
    if (income) {
      setCategory(income.category);
      setAmount(income.amount);
      setDate(income.date);
      setCurrency(income.currency);
      setDescription(income.description);
    }
  }, [income]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const authToken = localStorage.getItem('authToken');

    try {
      let response;
      if (income) {
        // Update existing income
        response = await axios.put(`/income/${income._id}`, {
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
        // Create new income
        response = await axios.post('/income', {
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

      if ([200, 201].includes(response.status)) {
        // Clear the form if it's a new income form
        if (!income) {
          setCategory('');
          setAmount('');
          setDate('');
          setCurrency('');
          setDescription('');
        }

        alert('Income saved successfully');
        if (onFinish) onFinish();
      }
    } catch (error) {
      console.error('Failed to save income', error);
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
      <button type="submit" className="btn btn-primary">Submit</button>
    </form>
  );
}

export default IncomeForm;


