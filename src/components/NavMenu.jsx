import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { GiHamburgerMenu } from 'react-icons/gi';
import { IoClose } from 'react-icons/io5';
import './components.css';
import XS from './img/XS.svg';
import App from '../App';

function NavMenu() {
  const [nav, setNav] = useState(false);



  return (
    <div className="menu-nav">
      <div className="menu--nav">
        <div className="burger-menu-mav" onClick={() => setNav(!nav)}>
          {nav ? <IoClose /> : <GiHamburgerMenu />}
        </div>

        <span className="logo">
          <img src={XS} alt="" />
        </span>
      </div>
      <ul className={nav ? 'navi, navi-active' : 'navi'}>
        <li><NavLink to="/">Главная</NavLink></li>
        <li><NavLink to="/Orders">Заказы</NavLink></li>
        <li><NavLink to="/OrderStatus">Состояние заказа</NavLink></li>
        <li><NavLink to="/SpareParts">Запчасти</NavLink></li>
        <li><NavLink to="/WarrantyRepair">Гарантийные ремонты</NavLink></li>
        <li><NavLink to="/ChangeOrder">Изменить заказ</NavLink></li>
        <li><NavLink to="/Works">Работы</NavLink></li>
        <li><NavLink to="/Employees">Сотрудники</NavLink></li>
        <li><NavLink to="/Calls">Записи звонков</NavLink></li>
      </ul>
    </div>
  );
}

export default NavMenu;
