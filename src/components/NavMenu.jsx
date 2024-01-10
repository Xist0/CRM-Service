import React from 'react'
import { NavLink, } from 'react-router-dom'
import './components.css'

function NavMenu() {
  return (
    <div className='menu-nav'>
      <span className='logo'>CRMB</span>
      <ul className="nav">
        <li><NavLink to='/'>Главная</NavLink></li>
        <li><NavLink to='/Orders'>Заказы</NavLink></li>
        <li><NavLink to='/OrderStatus'>Состояние заказа</NavLink></li>
        <li><NavLink to='/SpareParts'>Запчасти </NavLink></li>
        <li><NavLink to='/WarrantyRepair'>Гарантийные ремонты</NavLink></li>
        <li><NavLink to='/ChangeOrder'>Изменить заказ</NavLink></li>
        <li><NavLink to='/Works'>Работы</NavLink></li>
        <li><NavLink to='/Employees'>Сотрудники</NavLink></li>
        <li><NavLink to='/Calls'>Записи звонков</NavLink></li>
      </ul>
    </div>
  )
}

export default NavMenu