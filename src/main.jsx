import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import Works from './components/pages/Works.jsx'
import WarrantyRepair from "./components/pages/WarrantyRepair.jsx";
import SpareParts from "./components/pages/SpareParts.jsx";
import OrderStatus from "./components/pages/OrderStatus.jsx";
import Orders from "./components/pages/Orders.jsx";
import Employees from "./components/pages/Employees.jsx";
import ChangeOrder from "./components/pages/ChangeOrder.jsx";
import Calls from './components/pages/Calls.jsx'


<script src="./App.jsx"></script>
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Contractors from "./components/pages/Contractors.jsx";
import SearcOrder from "./components/pages/SearcOrder.jsx";
import Login from "./components/pages/UserAutorizechions/Login.jsx";
import PersonalAccount from "./components/pages/PersonalAccount.jsx";




const routes = createBrowserRouter([
  {
    path: '/app',
    element: <App />
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
    path: '/',
    element: <Login />
  },
  {
    path: '/PersonalAccount',
    element: <PersonalAccount/>
  },

])

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={routes} />
)
