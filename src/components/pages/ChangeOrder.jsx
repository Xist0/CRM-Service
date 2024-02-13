import React, { useState, useEffect } from 'react';
import Header from '../Header';
import './pages.css/SeacrOrder.css';
import { useLocation } from 'react-router-dom';
import Messenger from './messenger/Messenger'

function ChangeOrder() {
  const [number, setNumber] = useState('');
  const [records, setRecords] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();
  const [matchedOrder, setMmatchedOrder] = useState([]);
  const [selectedPart, setSelectedPart] = useState(null);

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const orderNumber = queryParams.get('orderNumber');
    if (orderNumber) {
      setNumber(orderNumber);
      fetchData(orderNumber);
    }
  }, [location.search]);

  const fetchData = async (searchNumber) => {
    if (searchNumber.trim() === '') {
      return;
    }
    setIsLoading(true);
    try {
      const response = await fetch(`/api/byt/order/${searchNumber}`);
      const data = await response.json();
      setRecords(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setIsLoading(false);
    }
  };
  const handleChange = (e) => {
    setNumber(e.target.value);
    searchUsers(e.target.value);
  };
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      fetchData(number);
    }
  };
  const searchUsers = async (nameParts) => {
    try {
      const response = await fetch(`/api/works1c/${encodeURIComponent(nameParts)}`);
      const data = await response.json();
      setMmatchedOrder(data);
    } catch (error) {
      console.error('Error searching users:', error);
      setMmatchedOrder([]);
    }
  };
  const handlePartClick = (part) => {
    setSelectedPart(part);
  };
  const renderData = () => {
    if (isLoading) {
      return (
        <div className="loading-animation">
          <img src="/public/LogoAnims.svg" alt="" />
        </div>
      );
    }
    if (!records) {
      return <p>Ничего не найдено</p>;
    }
    if (!records.parts || !records.work) {
      return <p>Ничего не найдено</p>;
    }
    return (
      <div >

        <div className="container-block-main">
          <div className='forma-input input-column'>
            <div className="container-search-result-title">
              <h1>Заказ: {records.id_order}</h1>
            </div>
            <div className="container-block-orders">
              <label >
                <h4>Пользователь:</h4> <p>{records.user.name_user}</p>
              </label>
              <label >
                <h4>Номер телефона:</h4> <p>{records.user.phone_user}</p>
              </label>
              <label >
                <h4>Адресс:</h4> <p>{records.user.address_user}</p>
              </label>
              <label >
                <h4>Тип устройства:</h4> <p>{records.device.type}</p>
              </label>
              <label >
                <h4>Бренд:</h4> <p>{records.device.brand}</p>
              </label>
              <label >
                <h4>Номер модели:</h4> <p>{records.device.model}</p>
              </label>
              <label >
                <h4>Стутус:</h4> <p>{records.status.status_order}</p>
              </label>
              <label >
                <h4>Серийный номер модели:</h4> <p>{records.device.sn}</p>
              </label>
              <label >
                <h4>Дефект:</h4> <p>{records.device.defect}</p>
              </label>
            </div>
            <select name="option">
              <option value="" disabled selected hidden>Выберите статус</option>
            </select>
          </div>
          <div className="forma-input input-column">
            <div className="container-block-orders">
              <div className="container-search-result-parts-title">
                <h1>Запчасти</h1>
              </div>

              {records.parts.map((workItem, index) => (
                <div key={index} className='container-search-result-parts-main'>
                  <p>{workItem.parts_name}</p>
                  <h4>Цена:{workItem.parts_price}</h4>
                </div>
              ))}
            </div>
            <div className="container-block-search">
              <input type="text" placeholder='Название' className='input-style input-valid'
              />
              <button>Добавить</button>
            </div>
          </div>
          <div className="forma-input input-column">
            <div className="container-block-orders">
              <div className="container-search-result-parts-title">
                <h1>Работы</h1>
              </div>
              {records.parts.map((partItem, index) => (
                <div key={index} className='container-search-result-parts-main'>
                  <p>{partItem.parts_name}</p>
                  <h4>Цена:{partItem.parts_price}</h4>
                </div>
              ))}
            </div>
            <div className="container-block-search">
              <input
                type="text"
                placeholder="Название"
                className="input-style input-valid"
                onChange={(e) => {
                  handleChange(e);
                  searchUsers(e.target.value);
                }}
              />
              <button >Добавить</button>
            </div>
            {matchedOrder && matchedOrder.length > 0 && (
              <div className="matched-users">
                {matchedOrder.map((part, index) => (
                  <div
                    key={index}
                    className={`matched-user ${selectedPart === part ? 'selected' : 'matched-user-acktive'
                      }`}
                    onClick={() => handlePartClick(part)}
                  >
                    {part.name_parts}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };
  return (
    <div>
      <Header />
      <div className="container-box">
        <div className="container-boxs">
          <div className="container-block">
            <div className="container-block-search">
              <input type="number" pattern="\d*" value={number} onChange={handleChange} onKeyPress={handleKeyPress} placeholder='Введите номер заказа' />
              <button onClick={() => fetchData(number)}>Найти</button>
            </div>
            <div className="container-results">{renderData()}</div>
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