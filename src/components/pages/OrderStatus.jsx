import React, { useState } from 'react';
import Summary from './Summary'; // Укажите правильный путь до вашего компонента Summary
import Header from '../Header';

const OrderStatus = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    option: '',
    fullName: '',
    phoneNumber: '',
    address: '',
    // Добавьте дополнительные поля по необходимости
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleNextStep = () => {
    setStep((prevStep) => prevStep + 1);
  };

  const handlePrevStep = () => {
    setStep((prevStep) => prevStep - 1);
  };

  const handleSubmit = () => {
    // Здесь вы можете добавить логику для отправки данных в базу данных
    console.log('Отправка данных в базу данных:', formData);

    if (step < 3) {
      // Если это не последний шаг, перейдите к следующему шагу
      setStep((prevStep) => prevStep + 1);
    } else {
      // Если это последний шаг, сбросьте состояние формы и вернитесь на первый шаг
      setFormData({
        option: '',
        fullName: '',
        phoneNumber: '',
        address: '',
        // Сбросьте дополнительные поля по необходимости
      });
      setStep(1);
    }
  };

  const handleEditClick = () => {
    // Вернуться на предыдущий этап (редактирование данных)
    setStep((prevStep) => prevStep - 1);
  };

  return (
    <div>
      <Header/>
      {step === 1 && (
        <div>
          <h2>Шаг 1: Выбор вариантов</h2>
          <label>
            Вариант:
            <select name="option" value={formData.option} onChange={handleChange}>
              <option value="">Выберите вариант</option>
              <option value="вариант1">Вариант 1</option>
              <option value="вариант2">Вариант 2</option>
              {/* Добавьте дополнительные варианты по необходимости */}
            </select>
          </label>
          <button onClick={handleNextStep}>Далее</button>
        </div>
      )}

      {step === 2 && (
        <div>
          <h2>Шаг 2: Ввод данных</h2>
          <label>
            ФИО:
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
            />
          </label>
          <label>
            Номер телефона:
            <input
              type="tel"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
            />
          </label>
          <label>
            Адрес:
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
            />
          </label>
          {/* Добавьте дополнительные поля по необходимости */}
          <button onClick={handlePrevStep}>Назад</button>
          <button onClick={handleSubmit}>Отправить</button>
        </div>
      )}

      {step === 3 && (
        <Summary formData={formData} onEditClick={handleEditClick} />
      )}
    </div>
  );
};

export default OrderStatus;
