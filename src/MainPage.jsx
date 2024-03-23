import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logOut } from './components/redux/authSlice';
import { useSelector } from 'react-redux';
import Header from './components/Header';
import AppMedia from './components/AppMedia';
import Messenger from './components/pages/messenger/Messenger';
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

const MainPage = () => {
    const dispatch = useDispatch();
    const token = useSelector((state) => state.auth.token);
    const role = useSelector((state) => state.auth.role);

    return (
        <>
            <Header />
            <AppMedia />
            <Messenger />
            <Routes>
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
            </Routes>
            {/* {
                role === "ADMIN" ? <p>УДАЛИТЬ ТОВАР</p> : <p>КУПИТЬ</p>
            }
            msrifluherui
            <button onClick={() => {
                dispatch(logOut())
            }}>log out</button> */}
        </>
    );
};

export default MainPage;
