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
      <p>
        <strong>Тип устройства:</strong> {formData.deviceType}
      </p>
      <p>
        <strong>Фирма:</strong> {formData.brand}
      </p>
      <p>
        <strong>Модель:</strong> {formData.model}
      </p>
      <p>
        <strong>Серийный номер:</strong> {formData.serialNumber}
      </p>
      <p>
        <strong>Комментарии к внешнему виду:</strong> {formData.appearanceComments}
      </p>
      <p>
        <strong>Комментарии к комплектации:</strong> {formData.equipmentComments}
      </p>
      <p>
        <strong>Пожелания:</strong> {formData.wishes}
      </p>
      <p>
        <strong>Мастер:</strong> {formData.master}
      </p>
      <p>
        <strong>Статус:</strong> {formData.status}
      </p>

      <button onClick={onEditClick}>Редактировать</button>
    </div>
  );
};

export default Summary;
