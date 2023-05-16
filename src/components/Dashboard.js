import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/auth.context';
import { Pie } from 'react-chartjs-2';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import {Chart, ArcElement} from 'chart.js'
import { Link } from 'react-router-dom';


function Dashboard() {
  const { user } = useContext(AuthContext);
  const [incomes, setIncomes] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  Chart.register(ArcElement);


  useEffect(() => {
    const fetchIncomeAndExpense = async () => {
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
        setIncomes(incomeResponse.data);
        setExpenses(expenseResponse.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchIncomeAndExpense();
  }, [user]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const totalIncome = incomes.reduce((total, income) => total + income.amount, 0);
  const totalExpense = expenses.reduce((total, expense) => total + expense.amount, 0);
  const netIncome = totalIncome - totalExpense;

  // Prepare data for the chart
  const chartData = {
    labels: ['Income', 'Expense', 'Net Income'],
    datasets: [
      {
        data: [totalIncome, totalExpense, netIncome],
        backgroundColor: [
          'rgba(75, 192, 192, 0.6)', // Income color
          'rgba(255, 99, 132, 0.6)', // Expense color
          'rgba(54, 162, 235, 0.6)', // Net Income color
        ],
        borderColor: [
          'rgba(75, 192, 192, 1)',
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  // Chart options
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      datalabels: {
        color: '#fff',
        anchor: 'end',
        align: 'start',
        offset: 8,
        formatter: (value) => `${value}%`,
      },
    },
  };


  return (
  <div className="container">
    <h1 className="mb-4">Welcome to the Dashboard</h1>
    <h2>Hello, {user.name}!</h2>
    <div className="row">
      <div className="col-md-6">
        <p>Total Income: {totalIncome}</p>
        <p>Total Expense: {totalExpense}</p>
        <p>Net Income: {netIncome}</p>
        <Link to="/income">
          <button type="button" className="btn btn-primary mr-2">Income List</button>
        </Link>
        <Link to="/expense">
          <button type="button" className="btn btn-primary">Expense List</button>
        </Link>
        <Link to="/profile">
          <button type="button" className="btn btn-primary">Profile</button>
        </Link>
      </div>
      <div className="col-md-6">
        <div className="chart-container">
          <Pie data={chartData} options={chartOptions} plugins={[ChartDataLabels]} />
        </div>
      </div>
    </div>
  </div>
);
}

export default Dashboard;
