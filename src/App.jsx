import { useState } from 'react'
import './index.css'
import { RouterProvider, createBrowserRouter, Navigate } from 'react-router-dom'
import Reg from './components/pages/UserAutorizechions/Reg.jsx'
import Log from './components/pages/UserAutorizechions/Auth.jsx'
import { useSelector } from 'react-redux'
import MainPage from './MainPage'
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
import PersonalAccount from './components/pages/PersonalAccount.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Navigate to="/auth" />
  },
  {
    path: '/reg',
    element: <Reg />
  },
  {
    path: '/auth',
    element: <Log />
  },
  {
    path: '/Works',
    element: <Navigate to="/" />
  },
  {
    path: '/WarrantyRepair',
    element: <Navigate to="/" />
  },
  {
    path: '/SpareParts',
    element: <Navigate to="/" />
  },
  {
    path: '/OrderStatus',
    element: <Navigate to="/" />
  },
  {
    path: '/Orders',
    element: <Navigate to="/" />
  },
  {
    path: '/Employees',
    element: <Navigate to="/" />
  },
  {
    path: '/ChangeOrder',
    element: <Navigate to="/" />
  },
  {
    path: '/Calls',
    element: <Navigate to="/" />
  },
  {
    path: '/Contractors',
    element: <Navigate to="/" />
  },
  {
    path: '/SearcOrder',
    element: <Navigate to="/" />
  },
  {
    path: '/PersonalAccount',
    element: <Navigate to="/" />
  },
])

const authRouter = createBrowserRouter([
  {
    path: '/',
    element: <MainPage />
  },
  {
    path: '/reg',
    element: <Navigate to="/" />
  },
  {
    path: '/auth',
    element: <Navigate to="/" />
  },
  {
    path: '/Works',
    element: <Works />
  },
  {
    path: '/WarrantyRepair',
    element: <WarrantyRepair />
  },
  {
    path: '/SpareParts',
    element: <SpareParts />
  },
  {
    path: '/OrderStatus',
    element: <OrderStatus />
  },
  {
    path: '/Orders',
    element: <Orders />
  },
  {
    path: '/Employees',
    element: <Employees />
  },
  {
    path: '/ChangeOrder',
    element: <ChangeOrder />
  },
  {
    path: '/Calls',
    element: <Calls />
  },
  {
    path: '/Contractors',
    element: <Contractors />
  },
  {
    path: '/SearcOrder',
    element: <SearcOrder />
  },
  {
    path: '/PersonalAccount',
    element: <PersonalAccount />
  },
])

const authRouterAdmin = createBrowserRouter([
  {
    path: '/',
    element: <MainPage />
  },
  {
    path: '/admin',
    element: <>admin</>
  }
])

function App() {
  const token = useSelector((state) => state.auth.token)
  const role = useSelector((state) => state.auth.role)

  return (
    <RouterProvider router={token ? (role === "ADMIN" ? authRouterAdmin : authRouter) : router} />
  )
}

export default App
