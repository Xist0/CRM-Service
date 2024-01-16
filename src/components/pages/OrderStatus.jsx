import React, { useState } from 'react';
import Summary from './Summary'; // Укажите правильный путь до вашего компонента Summary
import Header from '../Header';
import './orders.css'; // Импортируем стили

const OrderStatus = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    option: '',
    fullName: '',
    phoneNumber: '',
    address: '',
    // Добавьте дополнительные поля по необходимости
  });

  const [validation, setValidation] = useState({
    option: false,
    fullName: false,
    phoneNumber: false,
    address: false,
    // Добавьте дополнительные поля по необходимости
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "phoneNumber") {
      // Валидация и форматирование для номера телефона
      const formattedValue = value.replace(/\D/g, ''); // Удаляем все нецифровые символы
      const formattedPhoneNumber = `+7${formattedValue.slice(1, 11)}`; // Добавляем +7 и ограничиваем до 10 символов
      setFormData((prevData) => ({
        ...prevData,
        [name]: formattedPhoneNumber,
      }));
      // При изменении значения, снова проверяем валидность
      setValidation((prevValidation) => ({
        ...prevValidation,
        [name]: formattedValue.length === 11, // Устанавливаем в true, если символов 11
      }));
    } else {
      // Для других полей
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
      // При изменении значения, снова проверяем валидность
      setValidation((prevValidation) => ({
        ...prevValidation,
        [name]: value.trim() !== '', // Устанавливаем в true, если значение не пустое
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
                {/* Добавьте дополнительные варианты по необходимости */}
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
            {/* Добавьте дополнительные поля по необходимости */}
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
