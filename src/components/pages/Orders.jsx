import React from 'react'
import Header from '../Header'
import { CiSearch } from "react-icons/ci";
import './pages.css/pages.css'

function Orders() {
  return (

    <div >
      <Header />
      <div className="box">
        <div className="box-title">
          <h1>Заказы</h1>
        </div>
        <div className="box-line"></div>
        <div className="box-serah">
          <input type="text" />
          <CiSearch />
        </div>
        <div className="box-main">
          <table>
            <thead>
              <tr>
                <th>
                  # Акта
                </th>
                <th>
                  Клиент
                </th>
                <th>
                  Аппарат
                </th>
                <th>
                  Модель
                </th>
                <th>
                  Мастер
                </th>
                <th>
                  Состояние
                </th>
              </tr>
            </thead>
            <tbody id="search-results">
              <tr >
                <td>
                  <p>1</p>
                </td>
                <td>
                  <p>1</p>
                </td>
                <td>
                  <p>1</p>
                </td>
                <td>
                  <p>1</p>
                </td>
                <td>
                  <p>1</p>
                </td>
                <td>
                  <p>1</p>
                </td>
              </tr>
            </tbody>
          </table>
        </div >
      </div >
    </div >
  )
}

export default Orders