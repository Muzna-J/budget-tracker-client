import React, { useContext } from 'react';
import { AuthContext } from '../context/auth.context';

function Dashboard() {
  const { user } = useContext(AuthContext);

  return (
    <div>
      <h1>Welcome to the Dashboard</h1>
      <h2>Hello, {user.name}!</h2>
    </div>
  );
}

export default Dashboard;



