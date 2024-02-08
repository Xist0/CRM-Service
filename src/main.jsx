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
import App from './App.jsx'; // Импорт компонента App

const Main = () => {
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    // Здесь можно добавить логику для получения роли пользователя из localStorage или другого источника
    const role = localStorage.getItem('userRole');
    setUserRole(role);
  }, []);

  const renderRoute = (Component, allowedRoles) => {
    if (!userRole) {
      return <Navigate to="/" replace />;
    }
    if (allowedRoles.includes(userRole)) {
      return <Component />;
    } else {
      return <Navigate to="/" replace />;
    }
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/app" element={<App />} /> {/* Обновленный путь */}
        <Route path="/Works" element={renderRoute(Works, ['Admin', 'Engineer'])} />
        <Route path="/WarrantyRepair" element={renderRoute(WarrantyRepair, ['Admin', 'Engineer'])} />
        <Route path="/SpareParts" element={renderRoute(SpareParts, ['Admin', 'Engineer'])} />
        <Route path="/OrderStatus" element={renderRoute(OrderStatus, ['Admin', 'Engineer'])} />
        <Route path="/Orders" element={renderRoute(Orders, ['Admin', 'Engineer'])} />
        <Route path="/Employees" element={renderRoute(Employees, ['Admin', 'Engineer'])} />
        <Route path="/ChangeOrder" element={renderRoute(ChangeOrder, ['Admin'])} />
        <Route path="/Calls" element={renderRoute(Calls, ['Admin'])} />
        <Route path="/Contractors" element={renderRoute(Contractors, ['Admin'])} />
        <Route path="/SearcOrder" element={renderRoute(SearcOrder, ['Admin', 'Engineer'])} />
        <Route path="/PersonalAccount" element={renderRoute(PersonalAccount, ['Admin', 'Engineer'])} />
      </Routes>
    </Router>
  );
};

ReactDOM.createRoot(document.getElementById('root')).render(<Main />);
