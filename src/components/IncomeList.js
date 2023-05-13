import React, { useState, useEffect } from 'react';
import axios from 'axios';

function IncomeList() {
  const [incomes, setIncomes] = useState([]);

  useEffect(() => {
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

    fetchIncomeData();
  }, []);

  return (
    <div>
      <h2>Income List</h2>
      <ul>
        {incomes.map(income => (
          <li key={income._id}>
            {income.category}: {income.amount} {income.currency}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default IncomeList;

