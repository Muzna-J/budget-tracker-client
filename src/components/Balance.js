import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Balance() {
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalExpense, setTotalExpense] = useState(0);

  useEffect(() => {
    const fetchIncomeAndExpenseData = async () => {
      const authToken = localStorage.getItem('authToken');
      try {
        const incomeResponse = await axios.get('/income', {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        });

        const expenseResponse = await axios.get('/expense', {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        });

        const incomeTotal = incomeResponse.data.reduce(
          (total, income) => total + income.amount,
          0
        );
        const expenseTotal = expenseResponse.data.reduce(
          (total, expense) => total + expense.amount,
          0
        );

        setTotalIncome(incomeTotal);
        setTotalExpense(expenseTotal);
      } catch (error) {
        console.error(error);
      }
    };

    fetchIncomeAndExpenseData();
  }, []);

  const balance = totalIncome - totalExpense;

  return (
    <div>
      <h2>Balance</h2>
      <p>Total Income: {totalIncome}</p>
      <p>Total Expense: {totalExpense}</p>
      <p>Balance: {balance}</p>
    </div>
  );
}

export default Balance;
