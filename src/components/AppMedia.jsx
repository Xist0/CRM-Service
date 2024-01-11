import React from 'react'
import { NavLink } from 'react-router-dom';
import './components.css';

function AppMedia() {
    return (
        <div className="container">
            <div className="block-top">
                <div className="block"><NavLink to="/Orders">Заказы</NavLink></div>
                <div className="block"><NavLink to="/Employees">Сотрудники</NavLink></div>
                <div className="block"><NavLink to="/Calls">Записи звонков</NavLink></div>
                <div className="block"><NavLink to="/OrderStatus">Состояние заказа</NavLink></div>
                <div className="block"><NavLink to="/SpareParts">Запчасти</NavLink></div>
                <div className="block"><NavLink to="/Works">Работы</NavLink></div>
                <div className="block"><NavLink to="/WarrantyRepair">Гарантийные ремонты</NavLink></div>
                <div className="block"><NavLink to="/ChangeOrder">Изменить заказ</NavLink></div>
            </div>
        </div>
    )
}

export default AppMedia