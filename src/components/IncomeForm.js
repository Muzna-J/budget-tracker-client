// import React, { useState, useContext } from 'react';
// import axios from 'axios';
// import { AuthContext } from '../context/auth.context';

// function IncomeForm() {
//   const { user } = useContext(AuthContext);
//   const [category, setCategory] = useState('');
//   const [amount, setAmount] = useState('');
//   const [date, setDate] = useState('');
//   const [currency, setCurrency] = useState('');
//   const [description, setDescription] = useState('');

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const response = await axios.post('/income', {
//         category,
//         amount,
//         date,
//         currency,
//         description,
//       }, {
//         headers: {
//           'Authorization': `Bearer ${user.token}`
//         }
//       });

//       if (response.status === 201) {
//         // Clear the form
//         setCategory('');
//         setAmount('');
//         setDate('');
//         setCurrency('');
//         setDescription('');
//         alert('Income saved successfully');
//       }
//     } catch (error) {
//       console.error('Failed to save income', error);
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <label>
//         Category:
//         <input type="text" value={category} onChange={(e) => setCategory(e.target.value)} required />
//       </label>
//       <label>
//         Amount:
//         <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} required />
//       </label>
//       <label>
//         Date:
//         <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
//       </label>
//       <label>
//         Currency:
//         <select value={currency} onChange={(e) => setCurrency(e.target.value)} required>
//           <option value="">--Please choose an option--</option>
//           <option value="USD">USD</option>
//           <option value="EUR">EUR</option>
//           <option value="JPY">JPY</option>
//         </select>
//       </label>
//       <label>
//         Description:
//         <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
//       </label>
//       <button type="submit">Submit</button>
//     </form>
//   );
// }

// export default IncomeForm;


import React, { useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/auth.context';

function IncomeForm() {
  const { user } = useContext(AuthContext);
  const [category, setCategory] = useState('');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState('');
  const [currency, setCurrency] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const authToken = localStorage.getItem('authToken');

    try {
      const response = await axios.post('/income', {
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

      if (response.status === 201) {
        // Clear the form
        setCategory('');
        setAmount('');
        setDate('');
        setCurrency('');
        setDescription('');
        alert('Income saved successfully');
      }
    } catch (error) {
      console.error('Failed to save income', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Category:
        <input type="text" value={category} onChange={(e) => setCategory(e.target.value)} required />
      </label>
      <label>
        Amount:
        <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} required />
      </label>
      <label>
        Date:
        <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
      </label>
      <label>
        Currency:
        <select value={currency} onChange={(e) => setCurrency(e.target.value)} required>
          <option value="">--Please choose an option--</option>
          <option value="USD">USD</option>
          <option value="EUR">EUR</option>
          <option value="JPY">JPY</option>
        </select>
      </label>
      <label>
        Description:
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
      </label>
      <button type="submit">Submit</button>
    </form>
  );
}

export default IncomeForm;
