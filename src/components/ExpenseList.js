// import React, { useState, useEffect, useContext } from 'react';
// import { AuthContext } from '../context/auth.context';

// function ExpenseList() {
//   const { user } = useContext(AuthContext);
//   const [expenses, setExpenses] = useState([]);

//   useEffect(() => {
//     fetchExpenseData();
//   }, []);

//   const fetchExpenseData = async () => {
//     try {
//       const response = await fetch('/expense', {
//         headers: {
//           'Authorization': `Bearer ${user.token}`
//         }
//       });

//       if (!response.ok) {
//         throw new Error('Something went wrong while fetching expense data.');
//       }

//       const data = await response.json();
//       setExpenses(data);
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   return (
//     <div>
//       <h2>Expense List</h2>
//       <ul>
//         {expenses.map(expense => (
//           <li key={expense._id}>
//             {expense.category}: {expense.amount} {expense.currency}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }

// export default ExpenseList;

import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ExpenseList() {
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
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

    fetchExpenseData();
  }, []);

  return (
    <div>
      <h2>Expense List</h2>
      <ul>
        {expenses.map(expense => (
          <li key={expense._id}>
            {expense.category}: {expense.amount} {expense.currency}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ExpenseList;
