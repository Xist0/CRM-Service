import React, { useState, useEffect } from 'react';
import Header from '../Header';
import './pages.css/SeacrOrder.css';
import { useLocation } from 'react-router-dom';
import Messenger from './messenger/Messenger';
import { IoMdCloseCircleOutline } from "react-icons/io";

function ChangeOrder() {
  const [number, setNumber] = useState('');
  const [records, setRecords] = useState(null);
  const [initialData, setInitialData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();
  const [matchedParts, setMatchedParts] = useState([]);
  const [selectedPart, setSelectedPart] = useState(null);
  const [formData, setFormData] = useState({
    nameParts: '',
    selectedParts: [],
  });
  const [editedPrices, setEditedPrices] = useState([]);
  const [deletedParts, setDeletedParts] = useState([]);
  const [changedData, setChangedData] = useState([]);

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
      setInitialData(data); // Сохраняем изначальные данные
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setIsLoading(false);
    }
  };
  // Функция для возвращения к изначальным данным
  const resetData = () => {
    setFormData({
      nameParts: '',
      selectedParts: [],
    });
    setEditedPrices([]);
    setDeletedParts([]);
    setChangedData([]);
  };

  const handleChange = (e) => {
    setNumber(e.target.value);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      fetchData(number);
    }
  };

  const searchParts = async (nameParts) => {
    try {
      const response = await fetch(`/api/works1c/${encodeURIComponent(nameParts)}`);
      const data = await response.json();
      setMatchedParts(data);
    } catch (error) {
      console.error('Error searching parts:', error);
      setMatchedParts([]);
    }
  };

  const handlePartClick = (part) => {
    setSelectedPart(part);
  };
  
  const handleRemoveButtonClick = (index) => {
    if (index < formData.selectedParts.length) {
      // Если удаляем выбранный элемент, обновляем состояние formData
      const updatedSelectedParts = formData.selectedParts.filter((_, i) => i !== index);
      setFormData({
        ...formData,
        selectedParts: updatedSelectedParts,
      });
    } else {
      // Если удаляем уже существующий элемент, удаляем его из массива changedData и обновляем initialData.parts
      const partIndex = index - formData.selectedParts.length;
      const updatedData = changedData.filter((_, i) => i !== partIndex);
      setChangedData(updatedData);
      const updatedDeletedParts = [...deletedParts, index];
      setDeletedParts(updatedDeletedParts);
  
      // Обновляем initialData.parts, удаляя удаленный элемент
      setInitialData(prevData => {
        const updatedParts = prevData.parts.filter((_, i) => i !== partIndex);
        return { ...prevData, parts: updatedParts };
      });
    }
  };
  
  
  const handleAddButtonClick = () => {
    if (selectedPart) {
      const newSelectedPart = { ...selectedPart, parts_price: selectedPart.parts_price };
      setFormData({
        ...formData,
        selectedParts: [...formData.selectedParts, newSelectedPart],
      });
      setSelectedPart(null);
      setChangedData([...changedData, newSelectedPart]);
      setInitialData(prevData => {
        const updatedParts = [...prevData.parts, newSelectedPart];
        return { ...prevData, parts: updatedParts };
      });
    }
  };
  
  
  const handlePriceChange = (index, event) => {
    const newPrices = [...editedPrices];
    newPrices[index] = event.target.value;
    setEditedPrices(newPrices);
  
    const updatedData = [...changedData];
    if (index < formData.selectedParts.length) {
      // Если измененная часть из выбранных, обновляем цену в formData
      formData.selectedParts[index].parts_price = event.target.value;
    } else {
      // Если измененная часть из изначальных данных, обновляем цену в initialData
      const partIndex = index - formData.selectedParts.length;
      initialData.parts[partIndex].parts_price = event.target.value;
      updatedData[partIndex] = { ...initialData.parts[partIndex], parts_price: event.target.value };
    }
    setChangedData(updatedData);
  };
  

  const handleSaveChanges = () => {
    // Формируем объект с измененными данными и id_order
    const changedDataToSend = {
      id_order: initialData.id_order,
      parts: [],
      work: [],
    };
  
    // Добавляем измененные части в массив
    changedData.forEach(item => {
      if (item.id_parts) {
        changedDataToSend.parts.push({ id_parts: item.id_parts, parts_price: item.parts_price });
      } else if (item.id_work) {
        changedDataToSend.work.push({ id_work: item.id_work, work_price: item.work_price });
      }
    });
  
    console.log('Измененные данные для отправки:', changedDataToSend);
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
              {records.work.map((workItem, key) => (
                <div key={key} className='container-search-result-parts-main'>
                  <p>{workItem.work_name}</p>
                  <h4>Цена:{workItem.work_price}</h4>
                </div>
              ))}
            </div>
          </div>
          <div className="forma-input input-column">
            <div className="container-block-orders">
              <div className="container-search-result-parts-title">
                <h1>Работы</h1>
              </div>
              {formData.selectedParts.concat(records.parts).map((partItem, index) => (
                deletedParts.includes(index) ? null : (
                  <div key={index} className='container-search-result-parts-main'>
                    <p>{partItem.name_parts || partItem.parts_name}</p>
                    <div className="container-search-result-parts-prise">
                      <input
                        type="text"
                        value={editedPrices[index] || partItem.parts_price}
                        onChange={(event) => handlePriceChange(index, event)}
                      />
                      <IoMdCloseCircleOutline onClick={() => handleRemoveButtonClick(index)} />
                    </div>
                  </div>
                )
              ))}
              <div className="container-block-search">
                <input
                  type="text"
                  placeholder="Название"
                  className="input-style input-valid"
                  onChange={(e) => {
                    handleChange(e);
                    searchParts(e.target.value);
                  }}
                />
                <button onClick={handleAddButtonClick} >Добавить</button>
              </div>
              {matchedParts && matchedParts.length > 0 && (
                <div className="matched-users">
                  {matchedParts.map((part, index) => (
                    <div
                      key={index}
                      className={`matched-user ${selectedPart === part ? 'matched-user-acktive' : ''}`}
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
        <div className="container-block-search">
          <button onClick={handleSaveChanges}>Сохранить</button>
        </div>
      </div>
    );
  };

  return (
    <div>
      <Header />
      <div className="container-box">
        <div className="container-block">
          <div className="container-block-search">
            <input
              type="number"
              pattern="\d*"
              value={number}
              onChange={handleChange}
              onKeyPress={handleKeyPress}
              placeholder='Введите номер заказа'
            />
            <button onClick={() => fetchData(number)}>Найти</button>
          </div>
          <div className="container-results">{renderData()}</div>

        </div>

      </div>
      <Messenger />
    </div>
  );
}

export default ChangeOrder;
