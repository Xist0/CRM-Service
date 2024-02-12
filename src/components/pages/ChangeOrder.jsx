import React from 'react'
import Header from '../Header'
import Messenger from './messenger/Messenger'

function ChangeOrder() {
  return (
    <div>
      <Header />
      <div className="container-box">
        <div className="container-boxs">
          <div className="container-block">
            <div className="container-block-search">
              <input type="text" placeholder='Номер заказа' />
              <button>Найти</button>
            </div>
            <div className="container-block-main">
              <div className='forma-input input-column'>
                <h2>Заказ номер { }</h2>
                <label>
                  <h4>Фамилия</h4>
                  <input
                    type="text"
                    name="fullName"
                    placeholder="Фамилия клиента"
                    className='input-style input-valid'
                  />
                </label>
                <label>
                  <h4>Имя </h4>
                  <input
                    type="text"
                    name="fullName"
                    placeholder="Имя клиента"
                    className='input-style input-valid'
                  />
                </label>
                <label>
                  <h4>Отчество </h4>
                  <input
                    type="text"
                    name="fullName"
                    placeholder="Отчество клиента"
                    className='input-style input-valid'
                  />
                </label>
                <label>
                  <h4>Номер </h4>
                  <input
                    type="tel"
                    name="phoneNumber"
                    placeholder="Номер Телефона"
                    className='input-style input-valid'
                  />
                </label>
                <label>
                  <h4>Фирма</h4>
                  <input
                    type="text"
                    name="firma"
                    placeholder="Фирма"
                    className='input-style input-valid'
                  />
                </label>
                <label>
                  <h4>Модель</h4>
                  <input
                    type="text"
                    name="model"
                    placeholder="Модель"
                    className='input-style input-valid'
                  />
                </label>
                <label>
                  <h4>Серийный номер</h4>
                  <input
                    type="text"
                    name="seriaonumber"
                    placeholder="Серийный номер"
                    className='input-style input-valid'
                  />
                </label>
                <select
                  name="option"
                >
                  <option value="" disabled selected hidden>Выберите статус</option>
                </select>

              </div>
              <div className="forma-input input-column">
                <h1>Запчасти</h1>
                <table>
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Наименование</th>
                      <th>Цена</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>1</td>
                      <td>4232323</td>
                      <td>3232323</td>
                    </tr>
                  </tbody>
                </table>
                <div className="container-block-search">
                  <input type="text" placeholder='Название' className='input-style input-valid'
                  />
                  <button>Добавить</button>
                </div>
              </div>
              <div className="forma-input input-column">
                <h1>Работы</h1>
                <table>
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Наименование</th>
                      <th>Цена</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>1</td>
                      <td>4232323</td>
                      <td>3232323</td>
                    </tr>
                  </tbody>
                </table>
                <div className="container-block-search">
                  <input type="text" placeholder='Название' className='input-style input-valid'
                  />
                  <button>Добавить</button>
                </div>
              </div>
            </div>
            <div className="container-block-search">
              <button>Сохранить</button>
            </div>
          </div>
        </div>

      </div>
      <Messenger />
    </div>
  )
}

export default ChangeOrder