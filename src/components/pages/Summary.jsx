import React from 'react';

const Summary = ({ formData, onEditClick }) => {
  return (
    <div>
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
      {/* Добавьте отображение дополнительных данных по необходимости */}
      <button onClick={onEditClick}>Редактировать</button>
    </div>
  );
};

export default Summary;
