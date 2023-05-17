// import React, { useContext } from 'react';
// import { AuthContext } from '../context/auth.context';
// import { Layout, Typography } from 'antd';
// import Dashboard from '../components/Dashboard';

// const { Header, Content, Footer } = Layout;

// function DashboardPage() {
//   const { user } = useContext(AuthContext);

//   return (
//     <Layout className="layout">
//       <Header>
//         <div className="logo" />
//       </Header>
//       <Content style={{ padding: '0 50px' }}>
//         <div className="site-layout-content">
//           <Dashboard />
//         </div>
//       </Content>
//       <Footer style={{ textAlign: 'center' }}>Your App ©2023 Created by You</Footer>
//     </Layout>
//   );
// }

// export default DashboardPage;


import React, { useContext } from 'react';
import { AuthContext } from '../context/auth.context';
import Dashboard from '../components/Dashboard';
import { Container, Navbar, NavbarBrand, Footer } from 'react-bootstrap';

function DashboardPage() {
  const { user } = useContext(AuthContext);

  return (
    <>
      <Navbar bg="dark" variant="dark">
        <NavbarBrand>Your App Logo</NavbarBrand>
      </Navbar>

      <Container style={{ padding: '50px 0' }}>
        <Dashboard />
      </Container>

      <Footer style={{ textAlign: 'center', padding: '10px 0', background: '#f8f9fa' }}>
        SpendSmart ©2023 Created by Muzna.
      </Footer>
    </>
  );
}

export default DashboardPage;

