import React, { useState } from 'react';
import Header from '../Header';
import Messenger from './messenger/Messenger';
import axios from 'axios';

function WarrantyRepair() {
  const [isLoading, setIsLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [receivedData, setReceivedData] = useState(null);
  const [expandedRow, setExpandedRow] = useState(null);

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
                    <th>Фирма</th>
                    <th>Серийный номер</th>
                    <th>Деффект</th>
                  </tr>
                </thead>
                <tbody>
                  {receivedData.map((data, index) => (
                    <React.Fragment key={index}>
                      <tr onClick={() => toggleExpandedRow(index)}>
                        <td>{data.order_id}</td>
                        <td>{data.seller}</td>
                        <td>{data.order_type}</td>
                        <td>{data.company}</td>
                        <td>{data.device.device_sn}</td>
                        <td>{data.device.device_defect}</td>
                      </tr>
                      {expandedRow === index && (
                        <tr className="expanded-row" key={`expanded-${index}`}>
                          <td colSpan="6">
                            <div className="expanded-content">
                              <div className='expanded-content-main'>
                                <h1>Покупатель</h1>
                                <h4></h4>
                              </div>
                              <div className='expanded-content-main'>
                                <h1>Внешний вид</h1>
                                <h4></h4>
                              </div>
                              <div className='expanded-content-main'>
                                <h1>Комплектация</h1>
                                <h4>{data.device.device_equipment}</h4>
                              </div>
                              <div className='expanded-content-main'>
                                <h1>Дата продажи</h1>
                                <h4>{data.device.device_sale_date}</h4>
                              </div>
                            </div>
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
