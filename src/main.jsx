import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Works from './components/pages/Works.jsx';
import WarrantyRepair from './components/pages/WarrantyRepair.jsx';
import SpareParts from './components/pages/SpareParts.jsx';
import OrderStatus from './components/pages/OrderStatus.jsx';
import Orders from './components/pages/Orders.jsx';
import Employees from './components/pages/Employees.jsx';
import ChangeOrder from './components/pages/ChangeOrder.jsx';
import Calls from './components/pages/Calls.jsx';
import Contractors from './components/pages/Contractors.jsx';
import SearcOrder from './components/pages/SearcOrder.jsx';
import Login from './components/pages/UserAutorizechions/Login.jsx';
import PersonalAccount from './components/pages/PersonalAccount.jsx';
import App from './App.jsx'; 
import './index.css';

const Main = () => {
  const [userRole] = useState(null);



  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
          <>
            <Route path="/app" element={<App />} /> 
            <Route path="/Works" element={<Works />} />
            <Route path="/WarrantyRepair" element={<WarrantyRepair />} />
            <Route path="/SpareParts" element={<SpareParts />} />
            <Route path="/OrderStatus" element={<OrderStatus />} />
            <Route path="/Orders" element={<Orders />} />
            <Route path="/Employees" element={<Employees />} />
            <Route path="/ChangeOrder" element={<ChangeOrder />} />
            <Route path="/Calls" element={<Calls />} />
            <Route path="/Contractors" element={<Contractors />} />
            <Route path="/SearcOrder" element={<SearcOrder />} />
            <Route path="/PersonalAccount" element={<PersonalAccount />} />
          </>
      </Routes>
    </Router>
  );
};

ReactDOM.createRoot(document.getElementById('root')).render(<Main />);
