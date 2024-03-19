import React, { useState, useEffect } from 'react';
import Header from '../Header';
import Messenger from './messenger/Messenger';
import axios from 'axios';

function WarrantyRepair() {
  const [isLoading, setIsLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [receivedData, setReceivedData] = useState(null);
  const [expandedRow, setExpandedRow] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [editedData, setEditedData] = useState(null);
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    if (editedData) {
      const { end_user, device } = editedData;
      if (end_user.user_name && device.device_equipment && device.device_sale_date && end_user.user_address && end_user.user_phone) {
        setIsValid(true);
      } else {
        setIsValid(false);
      }
    }
  }, [editedData]);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleSubmit = async () => {
    if (!selectedFile) {
      console.log("No file selected");
      return;
    }

    setIsLoading(true);

    try {
      const formData = new FormData();
      formData.append('file', selectedFile);

      const response = await axios.post('/api/parser/warrantyorder', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log('File uploaded successfully:', response.data);
      const { data } = response;

      setReceivedData(data);
    } catch (error) {
      console.error('Error uploading file:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleExpandedRow = (index) => {
    if (expandedRow === index) {
      setExpandedRow(null);
    } else {
      setExpandedRow(index);
    }
  };

  const handleEditClick = (data) => {
    setEditedData(data);
    setEditMode(true);
  };

  const handleSaveClick = () => {
    // Проверка валидности перед сохранением данных
    if (!isValid) {
      console.log('Please fill in all required fields.');
      return;
    }

    // Handle saving edited data here (e.g., make API call)
    console.log('Saving edited data:', editedData);
    setEditMode(false);
  };

  const handleCancelClick = () => {
    setEditMode(false);
  };

  const renderEditButtons = () => {
    return (
      <div className='expanded-content-main-button'>
        <button disabled={!isValid} onClick={handleSaveClick}>Сохранить</button>
        <button onClick={handleCancelClick}>Отмена</button>
      </div>
    );
  };

  const renderEditModeContent = () => {
    const handleEndUserNameChange = (e) => {
      setEditedData({ ...editedData, end_user: { ...editedData.end_user, user_name: e.target.value } });
    };

    const handleDeviceEquipmentChange = (e) => {
      setEditedData({ ...editedData, device: { ...editedData.device, device_equipment: e.target.value } });
    };

    const handleDeviceSaleDateChange = (e) => {
      setEditedData({ ...editedData, device: { ...editedData.device, device_sale_date: e.target.value } });
    };

    const handleEndUserAddressChange = (e) => {
      setEditedData({ ...editedData, end_user: { ...editedData.end_user, user_address: e.target.value } });
    };

    const handleEndUserPhoneChange = (e) => {
      setEditedData({ ...editedData, end_user: { ...editedData.end_user, user_phone: e.target.value } });
    };


    // Все кроме покеупателя и даты продажи и имэй 
    return (
      <div className="expanded-content">
        <div className='expanded-content-main'>
          <h1>Покупатель</h1>
          <input type="text" value={editedData.end_user.user_name} onChange={(e) => setEditedData({ ...editedData, end_user: { ...editedData.end_user, user_name: e.target.value } })} />
        </div>
        <div className='expanded-content-main'>
          <h1>Внешний вид</h1>
          <h4><label> </label> </h4>
        </div>
        <div className='expanded-content-main'>
          <h1>Комплектация</h1>
          <input type="text" value={editedData.device.device_equipment} onChange={handleDeviceEquipmentChange} />
        </div>
        <div className='expanded-content-main'>
          <h1>Дата продажи</h1>
          <input type="text" value={editedData.device.device_sale_date} onChange={handleDeviceSaleDateChange} />
        </div>
        <div className='expanded-content-main'>
          <h1>Полная модель</h1>
          <h4>{editedData.device.device_type} {editedData.device.device_brand} {editedData.device.device_model}</h4>
        </div>
        <div className='expanded-content-main'>
          <h1>Модель EXEL</h1>
          <h4><label>{editedData.device.device_excel_model}</label></h4>
        </div>
        <div className='expanded-content-main'>
          <h1>Адрес</h1>
          <input type="text" value={editedData.end_user.user_address} onChange={handleEndUserAddressChange} />
        </div>
        <div className='expanded-content-main'>
          <h1>Телефон</h1>
          <input type="text" value={editedData.end_user.user_phone} onChange={handleEndUserPhoneChange} />
        </div>
        {renderEditButtons()}
      </div>
    );
  };
  const renderViewModeContent = (data) => {
    return (
      <div className="expanded-content">
        <div className='expanded-content-main'>
          <h1>Покупатель</h1>
          <h4><label>{data.end_user.user_name}</label></h4>
        </div>
        <div className='expanded-content-main'>
          <h1>Внешний вид</h1>
          <h4><label> </label> </h4>
        </div>
        <div className='expanded-content-main'>
          <h1>Комплектация</h1>
          <h4><label>{data.device.device_equipment}</label> </h4>
        </div>
        <div className='expanded-content-main'>
          <h1>Дата продажи</h1>
          <h4><label>{data.device.device_sale_date}</label></h4>
        </div>
        <div className='expanded-content-main'>
          <h1>Полная модель</h1>
          <h4>{data.device.device_type} {data.device.device_brand} {data.device.device_model}</h4>
        </div>
        <div className='expanded-content-main'>
          <h1>Модель EXEL</h1>
          <h4><label>{data.device.device_sale_date}</label></h4>
        </div>
        <div className='expanded-content-main'>
          <h1>Адрес</h1>
          <h4><label>{data.end_user.user_address}</label></h4>
        </div>
        <div className='expanded-content-main'>
          <h1>Телефон</h1>
          <h4><label>{data.end_user.user_phone}</label></h4>
        </div>

        <div className='expanded-content-main-button'>
          <button onClick={() => handleEditClick(data)}>Редактировать</button>
        </div>
      </div>
    );
  };

  const WarrantyOrder = () => {
    if (isLoading) {
      return (
        <div className="loading-animation">
          <img src="/public/LogoAnims.svg" alt="" />
        </div>
      );
    }

    return (
      <div className="Warranty-Conteiner">
        <h1>Заказы</h1>
        <div className="Warranty-Conteiner-line"></div>
        <div className="Warranty-Conteiner-box">
          {receivedData && receivedData.length > 0 ? (
            <div className="table-container">
              <table className="Warranty-Conteiner-nav">
                <thead>
                  <tr>
                    <th>№ заказа</th>
                    <th>Продавец</th>
                    <th>Тип ремонта</th>
                    <th>Тип аппарата</th>
                    <th>Фирма</th>
                    <th>Модель</th>
                    <th>Серийный номер</th>
                    <th>IMEI</th>
                    <th>Деффект</th>
                  </tr>
                </thead>
                <tbody>
                  {receivedData.map((data, index) => (
                    <React.Fragment key={index}>
                      <tr onClick={() => toggleExpandedRow(index)}>
                        <td>{data.order_id}</td>
                        <td>{data.retail_user.user_name}</td>
                        <td><label>{data.order_type}</label></td>
                        <td><label>{data.device.device_type}</label></td>
                        <td>{data.device.device_brand}</td>
                        <td>{data.device.device_model}</td>
                        <td><label>{data.device.device_sn} </label></td>
                        <td><label>{data.device.device_imei} </label></td>
                        <td><label>{data.device.device_defect}</label></td>
                      </tr>
                      {expandedRow === index && (
                        <tr className="expanded-row" key={`expanded-${index}`}>
                          <td colSpan="9">
                            {editMode ? renderEditModeContent() : renderViewModeContent(data)}
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
                  ))}
                </tbody>
              </table>
              {expandedRow !== null && (
                <div className="expanded-content-wide">
                  <h1>asdasda</h1>
                </div>
              )}
            </div>
          ) : (
            <div>Нет данных для отображения</div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div>
      <Header />
      <div className="container-box">
        <div className="WarrantySearch">
          <form encType="multipart/form-data">
            <input type="file" name="file" onChange={handleFileChange} />
            <button type="button" onClick={handleSubmit}>Отправить</button>
          </form>
        </div>
        {WarrantyOrder()}
      </div>
      <Messenger />
    </div>
  );
}

export default WarrantyRepair;
