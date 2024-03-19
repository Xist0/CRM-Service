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
  const [isEditing, setIsEditing] = useState(false); 
  const [editedData, setEditedData] = useState(null);
  const [isValid, setIsValid] = useState(false);
  const [errors, setErrors] = useState({
    endUserName: '',
    deviceAppearance: '',
    deviceEquipment: '',
    deviceSaleDate: '',
    endUserAddress: '',
    endUserPhone: '',
  });
  const minInputLength = 3;

  useEffect(() => {
    if (editedData) {
      const { end_user, device } = editedData;
      const isValiddeviceSn = device.device_sn && device.device_sn.trim().length >= minInputLength;
      const isValidDeviceAppearance = device.device_appearance && device.device_appearance.trim().length >= minInputLength;
      const isValidDeviceEquipment = device.device_equipment && device.device_equipment.trim().length >= minInputLength;
      const isValidEndUserAddress = end_user.user_address && end_user.user_address.trim().length >= minInputLength;
      const isValidEndUserPhone = end_user.user_phone && end_user.user_phone.trim().length >= minInputLength;

      setIsValid(
        isValidDeviceEquipment && isValiddeviceSn && isValidDeviceAppearance  && isValidEndUserAddress && isValidEndUserPhone
      );

      setErrors({
        deviceAppearance: isValidDeviceAppearance ? '' : `Поле должно содержать не менее ${minInputLength} символов`,
        deviceSn: isValiddeviceSn ? '' : `Поле должно содержать не менее ${minInputLength} символов`,
        deviceEquipment: isValidDeviceEquipment ? '' : `Поле должно содержать не менее ${minInputLength} символов`,
        endUserAddress: isValidEndUserAddress ? '' : `Поле должно содержать не менее ${minInputLength} символов`,
        endUserPhone: isValidEndUserPhone ? '' : `Поле должно содержать не менее ${minInputLength} символов`,
      });
    }
  }, [editedData, minInputLength]);

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

      console.log('Данные с файла:', response.data);
      const { data } = response;

      setReceivedData(data);
    } catch (error) {
      console.error('Ошибка загрузики:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleExpandedRow = (index) => {
    if (isEditing) return; 

    if (expandedRow === index) {
      setExpandedRow(null);
    } else {
      setExpandedRow(index);
    }
  };

  const handleEditClick = (data) => {
    setEditedData(data);
    setEditMode(true);
    setIsEditing(true); 
  };

  const handleSaveClick = async () => {
    if (!isValid) {
      console.log('Please fill in all required fields.');
      return;
    }
  
    try {
      const response = await axios.post('/api/1c/WarrantyOrder', editedData); 

      const order_id = response.data.order_id || '';
      const order_Error = response.data.order_Error || '';
  
      console.log('Данные успешно сохранены:', order_id);
      alert(`Номер заказа: ${order_id}\nСтатус: ${order_Error}`);
      setEditMode(false);
      setIsEditing(false);
    } catch (error) {
      console.error('Error saving data:', error);
    }
  };
  

  const handleCancelClick = () => {
    setEditMode(false);
    setIsEditing(false);
  };

  const renderEditButtons = () => {
    return (
      <div className='expanded-content-main-button'>
        <button disabled={!isValid} onClick={handleSaveClick} style={{ backgroundColor: isValid ? '' : 'gray' }}>Сохранить</button>
        <button onClick={handleCancelClick}>Отмена</button>
      </div>
    );
  };

  const renderEditModeContent = () => {
    const handleDeviceAppearance = (e) => {
      setEditedData({ ...editedData, device: { ...editedData.device, device_appearance: e.target.value } });
      setErrors({ ...errors, deviceAppearance: e.target.value.trim().length >= minInputLength ? '' : `Поле должно содержать не менее ${minInputLength} символов` });
    };
    const handleDeviceSn = (e) => {
      setEditedData({ ...editedData, device: { ...editedData.device, device_sn: e.target.value } });
      setErrors({ ...errors, deviceSn: e.target.value.trim().length >= minInputLength ? '' : `Поле должно содержать не менее ${minInputLength} символов` });
    };
    const handleDeviceEquipmentChange = (e) => {
      setEditedData({ ...editedData, device: { ...editedData.device, device_equipment: e.target.value } });
      setErrors({ ...errors, deviceEquipment: e.target.value.trim().length >= minInputLength ? '' : `Поле должно содержать не менее ${minInputLength} символов` });
    };
    const handleEndUserAddressChange = (e) => {
      setEditedData({ ...editedData, end_user: { ...editedData.end_user, user_address: e.target.value } });
      setErrors({ ...errors, endUserAddress: e.target.value.trim().length >= minInputLength ? '' : `Поле должно содержать не менее ${minInputLength} символов` });
    };

    const handleEndUserPhoneChange = (e) => {
      setEditedData({ ...editedData, end_user: { ...editedData.end_user, user_phone: e.target.value } });
      setErrors({ ...errors, endUserPhone: e.target.value.trim().length >= minInputLength ? '' : `Поле должно содержать не менее ${minInputLength} символов` });
    };

    return (
      <div className="expanded-content-active">
        <div className='expanded-content-main'>
          <h1>Покупатель</h1>
          <h4>{editedData.end_user.user_name} </h4>
        </div>
        <div className='expanded-content-main'>
          <h1>Внешний вид</h1>
          <div className="expanded-content-main-inpit">
            <input
              type="text"
              value={editedData.device.device_appearance}
              onChange={handleDeviceAppearance}
              style={{ borderColor: errors.deviceAppearance ? 'red' : '' }}
            />

          </div>
        </div>
        <div className='expanded-content-main'>
          <h1>Серийный номер</h1>
          <div className="expanded-content-main-inpit">
            <input
              type="text"
              value={editedData.device.device_sn}
              onChange={handleDeviceSn}
              style={{ borderColor: errors.deviceSn ? 'red' : '' }}
            />

          </div>
        </div>
        <div className='expanded-content-main'>
          <h1>Комплектация</h1>
          <div className="expanded-content-main-inpit">
            <input
              type="text"
              value={editedData.device.device_equipment}
              onChange={handleDeviceEquipmentChange}
              style={{ borderColor: errors.deviceEquipment ? 'red' : '' }}
            />
          </div>
        </div>
        <div className='expanded-content-main'>
          <h1>Дата продажи</h1>
          <h4>{editedData.device.device_sale_date}</h4>
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
          <div className="expanded-content-main-inpit">
            <input
              type="text"
              value={editedData.end_user.user_address}
              onChange={handleEndUserAddressChange}
              style={{ borderColor: errors.endUserAddress ? 'red' : '' }}
            />
          </div>
        </div>
        <div className='expanded-content-main'>
          <h1>Телефон</h1>
          <div className="expanded-content-main-inpit">
            <input
              type="text"
              value={editedData.end_user.user_phone}
              onChange={handleEndUserPhoneChange}
              style={{ borderColor: errors.endUserPhone ? 'red' : '' }}
            />
          </div>
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
          <h4><>{data.end_user.user_name}</></h4>
        </div>
        <div className='expanded-content-main'>
          <h1>Внешний вид</h1>
          <h4><>{data.device.device_appearance}</> </h4>
        </div>
        <div className='expanded-content-main'>
          <h1>Комплектация</h1>
          <h4><>{data.device.device_equipment}</> </h4>
        </div>
        <div className='expanded-content-main'>
          <h1>Дата продажи</h1>
          <h4><>{data.device.device_sale_date}</></h4>
        </div>
        <div className='expanded-content-main'>
          <h1>Полная модель</h1>
          <h4>{data.device.device_type} {data.device.device_brand} {data.device.device_model}</h4>
        </div>
        <div className='expanded-content-main'>
          <h1>Модель EXEL</h1>
          <h4>{data.device.device_sale_date}</h4>
        </div>
        <div className='expanded-content-main'>
          <h1>Адрес</h1>
          <h4>{data.end_user.user_address}</h4>
        </div>
        <div className='expanded-content-main'>
          <h1>Телефон</h1>
          <h4>{data.end_user.user_phone}</h4>
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
                        <tr className="expanded-row"  key={`expanded-${index}`} >
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

