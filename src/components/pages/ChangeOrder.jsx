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
      setNumber(orderNumber); // Устанавливаем номер заказа
      fetchData(orderNumber); // Выполняем поиск
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
    searchUsers(e.target.value); // Вызываем поиск пользователей при изменении ввода
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
    setSelectedPart(part); // Устанавливаем выбранный вариант совпадения
  };



  const renderData = () => {
    if (isLoading) {
      return (
        <div className="loading-animation"> <img src="/public/LogoAnims.svg" alt="" /></div>

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
            <div className="">
              <h2>Пользователь:</h2> <p>{records.user.name_user}</p>
              <h2>Номер телефона:</h2> <p>{records.user.phone_user}</p>
              <h2>Адресс:</h2> <p>{records.user.address_user}</p>
              <h2>Тип устройства:</h2> <p>{records.device.type}</p>
              <h2>Бренд:</h2> <p>{records.device.brand}</p>
              <h2>Номер модели:</h2> <p>{records.device.model}</p>
              <h2>Стутус:</h2> <p>{records.status.status_order}</p>
              <h2>Серийный номер модели:</h2> <p>{records.device.sn}</p>
              <h2>Дефект:</h2> <p>{records.device.defect}</p>
            </div>
            <div className="container-search-result-staff">
              {records.staff[0] && (
                <div className='container-search-result-staff-main'>
                  <h1>Принял:</h1> <p>{records.staff[0].staff_name}</p>
                  <p>{records.staff[0].staff_job}</p>
                </div>
              )}
              {records.staff[1] && (
                <div className='container-search-result-staff-main'>
                  <h1>Мастер:</h1> <p>{records.staff[1].staff_name}</p>
                  <p>{records.staff[1].staff_job}</p>
                </div>
              )}
            </div>
            <select
              name="option"
            >
              <option value="" disabled selected hidden>Выберите статус</option>
            </select>

          </div>
          <div className="forma-input input-column">
            <div className="container-search-result-parts">
              <div className="container-search-result-parts-title">
                <h1>Запчасти</h1>
              </div>

              {records.parts.map((partItem, index) => (
                <div key={index} className='container-search-result-parts-main'>
                  <p>{partItem.parts_name}</p>
                  <h4>Цена:{partItem.parts_price}</h4>
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
            <div className="container-search-result-work">
              <div className="container-search-result-parts-title">
                <h1>Работы</h1>
              </div>
              {records.work.map((workItem, index) => (
                <div key={index} className='container-search-result-parts-main'>
                  <p>{workItem.parts_name}</p>
                  <h4>Цена:{workItem.parts_price}</h4>
                </div>
              ))}
            </div>
            <div className="container-block-search">
              <input type="text" placeholder='Название' className='input-style input-valid'
                onChange={(e) => {
                  handleChange(e);
                  searchUsers(e.target.value);
                }}
              />
              <button>Добавить</button>
            </div>
            {matchedOrder && matchedOrder.length > 0 && (
              <div className="matched-users">
                {matchedOrder.map((part, index) => (
                  <div key={index} className="matched-user">
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