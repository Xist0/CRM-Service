import React, { useState } from 'react';
import Summary from './Summary';
import Header from '../Header';
import './orders.css';

const OrderStatus = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    option: '',
    fullName: '',
    phoneNumber: '',
    address: '',
  });

  const [validation, setValidation] = useState({
    option: false,
    fullName: false,
    phoneNumber: false,
    address: false,
  });

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
    setStep((prevStep) => prevStep + 1);
  };

  const handlePrevStep = () => {
    setStep((prevStep) => prevStep - 1);
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch('http://192.168.1.65/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          option: formData.option,
          fullName: formData.fullName,
          phoneNumber: formData.phoneNumber,
          address: formData.address,
        }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const result = await response.json();
      console.log('Order submitted:', result);

      if (step < 3) {
        setStep((prevStep) => prevStep + 1);
      } else {
        setFormData({
          option: '',
          fullName: '',
          phoneNumber: '',
          address: '',
        });
        setStep(1);
      }
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
            <h2>Шаг 1: Выбор вариантов</h2>
            <label className="input-column">
              <select
                name="option"
                value={formData.option}
                onChange={handleChange}
                className={validation.option ? '' : 'input-error'}
              >
                <option value="">Выберите вариант</option>
                <option value="вариант1">Вариант 1</option>
                <option value="вариант2">Вариант 2</option>
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
                placeholder="Введите ФИО"
              />
            </label>
            <label>
              <input
                type="tel"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                className={`input-style ${validation.phoneNumber ? 'input-valid' : 'input-error'}`}
                placeholder="Введите номер телефона"
              />
            </label>
            <label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                className={`input-style ${validation.address ? 'input-valid' : 'input-error'}`}
                placeholder="Введите адрес"
              />
            </label>
            <div className="divButton">
              <button onClick={handleSubmit} disabled={!isFormValid}>Отправить</button>
              <button onClick={handlePrevStep}>Назад</button>
            </div>
          </div>
        )}

        {step === 3 && (
          <Summary formData={formData} onEditClick={handleEditClick} />
        )}
      </div>
    </div>
  );
};

export default OrderStatus;
