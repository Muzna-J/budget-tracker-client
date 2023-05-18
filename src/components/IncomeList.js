// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import IncomeForm from './IncomeForm';
// import { Link } from 'react-router-dom';

// function IncomeList() {
//   const [incomes, setIncomes] = useState([]);
//   const [editingIncome, setEditingIncome] = useState(null);
  
//   useEffect(() => {
//     fetchIncomeData();
//   }, []);

//   const fetchIncomeData = async () => {
//     const authToken = localStorage.getItem('authToken');
//     try {
//       const response = await axios.get('/income', {
//         headers: {
//           Authorization: `Bearer ${authToken}`,
//         },
//       });

//       setIncomes(response.data);
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   const handleEdit = income => {
//     setEditingIncome(income);
//   };

//   const handleDelete = async (id) => {
//     const authToken = localStorage.getItem('authToken');
//     try {
//       await axios.delete(`/income/${id}`, {
//         headers: {
//           Authorization: `Bearer ${authToken}`,
//         },
//       });

//       // Update the local state
//       setIncomes(incomes.filter(income => income._id !== id));
//     } catch (error) {
//       console.error(error);
//     }
//   };



//   return (
//     <div className="container" style={{ paddingTop: '50px', paddingBottom: '50px' }}>
//       <h2 className="mb-3">Income List</h2>
//       <Link to="/income/new">
//         <button type="button" className="btn" style={{ color: 'white', backgroundColor: '#e76e50', marginTop: '20px' }}>Add New Income</button>
//       </Link>
//       <div className="card mx-auto" style={{ maxWidth: '800px', backgroundColor: '#82c4be', marginTop: '20px' }}>
//         <table className="table">
//           <thead>
//             <tr>
//               <th>Category</th>
//               <th>Amount</th>
//               <th>Currency</th>
//               <th>Date</th>
//               <th>Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {incomes.map(income => (
//               <tr key={income._id}>
//                 <td>{income.category}</td>
//                 <td>{income.amount}</td>
//                 <td>{income.currency}</td>
//                 <td>{new Date(income.date).toLocaleDateString('en-GB')}</td>
//                 <td>
//                   <button onClick={() => handleEdit(income)} className="btn btn-sm mr-2" style={{ color: 'white', backgroundColor: '#006c75' }}>Edit</button>
//                   <button onClick={() => handleDelete(income._id)} className="btn btn-danger btn-sm" style={{ backgroundColor: '#yourBackgroundColor', color: '#yourTextColor', marginLeft: '4px' }}>Delete</button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       {editingIncome && (
//         <div className="mt-3">
//           <h2>Edit Income</h2>
//           <IncomeForm income={editingIncome} onFinish={() => {
//             fetchIncomeData();
//             setEditingIncome(null);
//           }} />
//           <button onClick={() => setEditingIncome(null)} className="btn btn-secondary mt-2">Cancel</button>
//         </div>
//       )}
//     </div>
//   );
// }    
// export default IncomeList;


import React, { useState, useEffect } from 'react';
import axios from 'axios';

function IncomeList() {
  const [incomes, setIncomes] = useState([]);
  const [editingIncome, setEditingIncome] = useState(null);
  const [isUpdating, setIsUpdating] = useState(false); // Define isUpdating
  const [isSubmitted, setIsSubmitted] = useState(false); // Define isSubmitted


  const [newIncome, setNewIncome] = useState({
    category: '',
    amount: '',
    date: new Date().toLocaleDateString('en-GB').split('/').join('.'),  // Set date to today's date
    currency: '',
    description: '',
  });
  

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

  const handleInputChange = (e, incomeSetter) => {
    const { name, value } = e.target;
    incomeSetter(prevIncome => ({
      ...prevIncome,
      [name]: value,
    }));
  };

  const handleDelete = async (id) => {
    const authToken = localStorage.getItem('authToken');
    try {
      await axios.delete(`/income/${id}`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });

      setIncomes(incomes.filter(income => income._id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = async (e, income, setter) => {
    e.preventDefault();

    const authToken = localStorage.getItem('authToken');
    try {
      setIsUpdating(true); // Set isUpdating to true before making the request

      if (income._id) {
        await axios.put(`/income/${income._id}`, income, {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        });
      } else {
        await axios.post('/income', income, {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        });
      }

      fetchIncomeData();
      setter({
        category: '',
        amount: '',
        date: new Date().toLocaleDateString('en-GB').split('/').join('.'),  // Set date to today's date
        currency: '',
        description: '',
      });
      setIsSubmitted(true); 
    } catch (error) {
      console.error(error);
    } finally {
      setIsUpdating(false); // Set isUpdating back to false after the request is complete
    }
  };
  useEffect(() => {
     if (isSubmitted) {
     setEditingIncome(null); // Reset editingIncome after form submission
       setIsSubmitted(false); // Reset isSubmitted state
    }
  }, [isSubmitted]);

  return (
    <div className="container" style={{ paddingTop: '50px', paddingBottom: '50px', minWidth: '60%' }}>
      <h2 className="mb-3">Income List</h2>
      <button type="button" className="btn" style={{ color: 'white', backgroundColor: '#e76e50', marginTop: '20px' }} onClick={() => setEditingIncome({})}>Add New Income</button>
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
            {incomes.map(income => (
              <tr key={income._id}>
                <td>{income.category}</td>
                <td>{income.amount}</td>
                <td>{new Date(income.date).toLocaleDateString('en-GB')}</td>
                <td>{income.currency}</td>
                <td>{income.description}</td>
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
          <h3>{editingIncome._id ? "Edit Income" : "Add New Income"}</h3>
          <form onSubmit={(e) => handleSubmit(e, editingIncome, setEditingIncome)}>
            <table className="table">
              <tbody >
                <tr >
                  <td className="no-border"><label>Category:</label></td>
                  <td className="no-border" ><input type="text" className="form-control" name="category" required value={editingIncome.category || ''} onChange={(e) => handleInputChange(e, setEditingIncome)} style={{ width: '55%' }} /></td>
                  <td className="no-border"><label>Amount:</label></td>
                  <td className="no-border"><input type="number" className="form-control" name="amount" required value={editingIncome.amount || ''} onChange={(e) => handleInputChange(e, setEditingIncome)} style={{ width: '30%' }} /></td>
                </tr>
                <tr>
                  <td className="no-border"><label>Date:</label></td>
                  <td className="no-border"><input type="date" className="form-control" name="date" required value={editingIncome.date || ''} onChange={(e) => handleInputChange(e, setEditingIncome)} style={{ width: '55%' }} /></td>
                  <td className="no-border"><label>Currency:</label></td>
                  <td className="no-border">
                    <select className="form-control" name="currency" required value={editingIncome.currency || ''} onChange={(e) => handleInputChange(e, setEditingIncome)} style={{ width: '30%' }}>
                      <option value="">Please choose an option</option>
                      <option value="USD">USD</option>
                      <option value="EUR">EUR</option>
                      <option value="JPY">JPY</option>
                    </select>
                  </td>
                </tr>
                <tr>
                  <td className="no-border"><label>Description:</label></td>
                  <td className="no-border" colSpan="3"><textarea className="form-control" name="description" value={editingIncome.description || ''} onChange={(e) => handleInputChange(e, setEditingIncome)} style={{ width: '71.7%' }}></textarea></td>
                </tr>
                <tr>
                  <td colSpan="4" className="no-border">
                    <button type="submit" className="btn btn-primary" disabled={isUpdating}>
                      {isUpdating ? 'Updating...' : 'Submit'}
                    </button>
                    <button onClick={() => setEditingIncome(null)} className="btn btn-secondary" disabled={isUpdating}>Cancel</button>
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

export default IncomeList;

