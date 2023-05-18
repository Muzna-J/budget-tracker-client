import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/auth.context';
import { Pie } from 'react-chartjs-2';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { Chart, ArcElement } from 'chart.js';
import { Card } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoneyBillWave, faShoppingCart, faWallet } from '@fortawesome/free-solid-svg-icons';


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

  let totalIncome = 0
  let totalExpense = 0
  let Balance = 0

  if (incomes.length === 0) {
    totalIncome = incomes.reduce((total, income) => total + income.amount, 0);
  }

  if (expenses.length === 0) {
    totalExpense = expenses.reduce((total, expense) => total + expense.amount, 0);
  }

  Balance = totalIncome - totalExpense;

  // Prepare data for the chart
  const chartData = {
    labels: ['Income', 'Expense', 'Balance'],
    datasets: [
      {
        data: [totalIncome, totalExpense, Balance],
        backgroundColor: [
          'rgba(75, 192, 192, 0.6)', // Income color
          'rgba(255, 99, 132, 0.6)', // Expense color
          'rgba(54, 162, 235, 0.6)', // Balance color
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

    <h1 className="mb-4 mt-5">Welcome to your Dashboard, {user.name}!</h1>
      
      <div className="row justify-content-center">
        <div className="col-lg-4">
          <Card className="mb-3" style={{backgroundColor: "#c3e6cb"}}>
            <Card.Body>
              <Card.Title><FontAwesomeIcon icon={faMoneyBillWave} /> Total Income</Card.Title>
              <Card.Text>{totalIncome}</Card.Text>
            </Card.Body>
          </Card>
        </div>
  
        <div className="col-lg-4">
          <Card className="mb-3" style={{backgroundColor: "#f5c6cb"}}>
            <Card.Body>
              <Card.Title><FontAwesomeIcon icon={faShoppingCart} /> Total Expense</Card.Title>
              <Card.Text>{totalExpense}</Card.Text>
            </Card.Body>
          </Card>
        </div>
      </div>
  
      <div className="row justify-content-center">
        <div className="col-md-6">
          <Card className="mb-3" style={{backgroundColor: "#ffeeba"}}>
            <Card.Body>
              <Card.Title><FontAwesomeIcon icon={faWallet} /> Balance</Card.Title>
              <Card.Text>{Balance}</Card.Text>
            </Card.Body>
          </Card>
        </div>
      </div>
  
      <div className="row justify-content-center mt-3">
      <div className="col-lg-10">
        <div className="chart-container" style={{ height: '300px' }}>
          <Pie data={chartData} options={chartOptions} plugins={[ChartDataLabels]} />
        </div>
        </div>
      </div>
    </div>
  );
  }
  
export default Dashboard;
