import React, { useState, useEffect } from 'react';
import Summary from './Summary';
import Header from '../Header';
import './orders.css';
import Messenger from './messenger/Messenger';

const OrderStatus = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    option: '',
    fullName: '',
    phoneNumber: '',
    address: '',
    source_user: '',
    deviceType: '',
    brand: '',
    model: '',
    serialNumber: '',
    appearanceComments: '',
    equipmentComments: '',
    wishes: '',
    master: '',
    status: '',
  });

  const [validation, setValidation] = useState({
    option: false,
    fullName: false,
    phoneNumber: false,
    address: false,
    deviceType: false,
    brand: false,
    model: false,
    serialNumber: false,
    appearanceComments: false,
    equipmentComments: false,
    wishes: false,
    master: false,
    status: false,
  });

  const [types, setTypes] = useState([]);

  useEffect(() => {
    fetchTypes();
  }, []);

  const fetchTypes = async () => {
    try {
      const response = await fetch('/api/typeofrepaire');
      const data = await response.json();
      setTypes(data.types);
    } catch (error) {
      console.error('Error fetching types:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "phoneNumber") {
      const formattedValue = value.replace(/\D/g, '');
      const formattedPhoneNumber = `+7 ${formattedValue.slice(1, 4)} ${formattedValue.slice(4, 7)}-${formattedValue.slice(7, 9)}-${formattedValue.slice(9, 11)}`;
      setFormData((prevData) => ({
        ...prevData,
        [name]: formattedPhoneNumber,
      }));

      setValidation((prevValidation) => ({
        ...prevValidation,
        [name]: formattedValue.length === 11,
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));

      setValidation((prevValidation) => ({
        ...prevValidation,
        [name]: value.trim() !== '',
      }));
    }
  };

  const isFormValid = Object.values(validation).every((isValid) => isValid);

  const handleNextStep = () => {
    if (step < 5 && isFormValid) {
      setStep((prevStep) => prevStep + 1);
    }
  };

  const handlePrevStep = () => {
    setStep((prevStep) => prevStep - 1);
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const result = await response.json();
      console.log('Order submitted:', result);

      setFormData({
        option: '',
        fullName: '',
        phoneNumber: '',
        address: '',
        source_user: '',
        deviceType: '',
        brand: '',
        model: '',
        serialNumber: '',
        appearanceComments: '',
        equipmentComments: '',
        wishes: '',
        master: '',
        status: '',
      });
      setStep(1);
    } catch (error) {
      console.error('Error during fetch:', error.message);
    }
  };

  const handleEditClick = () => {
    setStep((prevStep) => prevStep - 1);
  };




  return (
    <div>
      <Header />
      <div className='Multi-forma'>
      {step === 1 && (
          <div className='forma-input'>
            <h2>Шаг 1: Тип ремонта</h2>
            <label className="input-column">
              <select
                name="option"
                value={formData.option}
                onChange={handleChange}
                className={validation.option ? '' : 'input-error'}
              >
                <option value="" disabled selected hidden>Выберите тип ремонта</option>
    
                {types.map((type, index) => (
                  <option key={index} value={type}>{type}</option>
                ))}
              </select>
              <button onClick={handleNextStep} disabled={!validation.option}>Далее</button>
            </label>
          </div>
        )}
        {step === 2 && (
          <div className='forma-input input-column'>
            <h2>Шаг 2: Ввод данных</h2>
            <label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                className={`input-style ${validation.fullName ? 'input-valid' : 'input-error'}`}
                placeholder="Ф.И.О. клиента"
              />
            </label>
            <label>
              <input
                type="tel"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                className={`input-style ${validation.phoneNumber ? 'input-valid' : 'input-error'}`}
                placeholder="Номер Телефона"
              />
            </label>
            <label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                className={`input-style ${validation.address ? 'input-valid' : 'input-error'}`}
                placeholder="Адрес"
              />
            </label>
            <select name="option-step-2" id="">
            <option value="" disabled selected hidden>Как узнали о нас</option>
              <option 
              value={formData.source_user}>
              </option>
            </select>
            <div className="divButton">
              <button onClick={handleNextStep} disabled={!validation.option}>Далее</button>
              <button onClick={handlePrevStep}>Назад</button>
            </div>
          </div>
        )}
        {step === 3 && (
          <div className='forma-input input-column'>
            <h4>Шаг 3: Устройство</h4>
            <label>
              <input
                type=""
                name=""
                className={`input-style ${validation.address ? 'input-valid' : 'input-error'}`}
                placeholder="Тип аппарата"
              />
            </label>
            <label>
              <input
                type=""
                name=""
                className={`input-style ${validation.address ? 'input-valid' : 'input-error'}`}
                placeholder="Фирма"
              />
            </label>
            <label>
              <input
                type=""
                name=""
                className={`input-style ${validation.address ? 'input-valid' : 'input-error'}`}
                placeholder="Модель"
              />
            </label>
            <label>
              <input
                type=""
                name=""
                className={`input-style ${validation.address ? 'input-valid' : 'input-error'}`}
                placeholder="Серийный номер"
              />
            </label>
            <label id='comments'>
              <h4>Внешний вид:</h4>
              <textarea
                type="text"
                id='comment-inp'
                className={`input-style ${validation.address ? 'input-valid' : 'input-error'}`}
              />
            </label>
            <label id='comments'>
              <h4>Комплектация:</h4>
              <textarea
                type="text"
                id='comment-inp'
                className={`input-style ${validation.address ? 'input-valid' : 'input-error'}`}
              />
            </label>
            <label id='comments'>
              <h4>Пожелания:</h4>
              <textarea
                type="text"
                className={`input-style ${validation.address ? 'input-valid' : 'input-error'}`}
                id='comment-inp'
              />
            </label>
            <div className="divButton">
              <button onClick={handleNextStep} disabled={!validation.option}>Далее</button>
              <button onClick={handlePrevStep}>Назад</button>
            </div>
          </div>
        )}
        {step === 4 && (
          <div className='forma-input input-column'>
            <h4>Шаг 4: Мастер</h4>
            <label>
              <input
                type=""
                name=""
                className={`input-style ${validation.address ? 'input-valid' : 'input-error'}`}
                placeholder="Мастер"
              />
            </label>
            <label>
              <input
                type=""
                name=""
                className={`input-style ${validation.address ? 'input-valid' : 'input-error'}`}
                placeholder="Статус"
              />
            </label>
            <div className="divButton">
              <button onClick={handleSubmit} disabled={!isFormValid}>Отправить</button>
              <button onClick={handlePrevStep}>Назад</button>
            </div>
          </div>
        )}
        {step === 5 && (
          <Summary formData={formData} onEditClick={handleEditClick} />
        )}
      </div>
      <Messenger />
    </div>
  );
};

export default OrderStatus;
