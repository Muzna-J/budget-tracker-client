import React, { useContext } from 'react';
import { AuthContext } from '../context/auth.context';
import { Layout, Typography } from 'antd';
import Dashboard from '../components/Dashboard';

const { Header, Content, Footer } = Layout;

function DashboardPage() {
  const { user } = useContext(AuthContext);

  return (
    <Layout className="layout">
      <Header>
        <div className="logo" />
      </Header>
      <Content style={{ padding: '0 50px' }}>
        <div className="site-layout-content">
          <Dashboard />
        </div>
      </Content>
      <Footer style={{ textAlign: 'center' }}>Your App ©2023 Created by You</Footer>
    </Layout>
  );
}

export default DashboardPage;
