import React from 'react';  
import './orders.css';

const Summary = ({ formData, onEditClick }) => {
  return (
    <div className='forma-input'>
      <h2>Итог: Просмотр данных</h2>
      <p>
        <strong>Вариант:</strong> {formData.option}
      </p>
      <p>
        <strong>ФИО:</strong> {formData.fullName}
      </p>
      <p>
        <strong>Номер телефона:</strong> {formData.phoneNumber}
      </p>
      <p>
        <strong>Адрес:</strong> {formData.address}
      </p>

      <button onClick={onEditClick}>Редактировать</button>
    </div>
  );
};

export default Summary;
