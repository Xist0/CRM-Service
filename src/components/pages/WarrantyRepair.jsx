import React, { useState } from 'react';
import Header from '../Header';
import Messenger from './messenger/Messenger';
import axios from 'axios';

function WarrantyRepair() {
  const [isLoading, setIsLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [navOpen, setNavOpen] = useState(false);
  const [detailsOpen, setDetailsOpen] = useState(null);

  const toggleDetails = (index) => {
    if (detailsOpen === index) {
      setDetailsOpen(null);
    } else {
      setDetailsOpen(index);
    }
  };

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
          'Content-Type': 'multipart/form-data', // Устанавливаем правильный Content-Type для FormData
        },
      });

      console.log('File uploaded successfully:', response.data);
    } catch (error) {
      console.error('Error uploading file:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleNav = () => {
    setNavOpen(!navOpen);
  };
  
  const WarrantyOrder = () => {
    if (isLoading) {
      return (
        <div className="loading-animation">
          <img src="/public/LogoAnims.svg" alt="" />
        </div>
      );
    }

    const orders = [
      {
        number: 312312,
        seller: 'ИП Ленинг',
        repairType: 'Проверка качества',
        company: 'geozon',
        serialNumber: '4603765754179',
        defect: 'Не верно показывает давление (ПК)',
        buyer: 'Аблаева Алина Валерерьевна',
        phone: '+79872042250',
        deviceType: 'Часы',
        fullModel: 'Умные часы GEOZON RUNNER G-SM12 Black',
        exelModel: 'Умные часы GEOZON RUNNER G-SM12 Black',
        IMEI: '4603765754179',
        appearance: '',
        equipment: 'Полная',
        saleDate: '23.02.2024',
      },
    ];

    return (
      <div className="Warranty-Conteiner">
        <h1>Заказы</h1>
        <div className="Warranty-Conteiner-line"></div>
        <div className="Warranty-Conteiner-box">
          <table
            className={
              navOpen
                ? 'Warranty-Conteiner-nav Warranty-Conteiner-nav-open'
                : 'Warranty-Conteiner-nav'
            }
          >
            <tbody>
              {orders.map((order, index) => (
                <tr key={index} onClick={() => toggleDetails(order.number)}>
                  <td>
                    <h1>№ заказа</h1>
                    <h4>{order.number}</h4>
                  </td>
                  <td>
                    <h1>Продавец</h1>
                    <h4>{order.seller}</h4>
                  </td>
                  <td>
                    <h1>Тип ремонта</h1>
                    <h4>{order.repairType}</h4>
                  </td>
                  <td>
                    <h1>Фирма</h1>
                    <h4>{order.company}</h4>
                  </td>
                  <td>
                    <h1>Серийный номер</h1>
                    <h4>{order.serialNumber}</h4>
                  </td>
                  <td>
                    <h1>Деффект</h1>
                    <h4>{order.defect}</h4>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {detailsOpen && (
            <div className="Warranty-Conteiner-nav-open">
              {orders.map((order) => (
                detailsOpen === order.number && (
                  <React.Fragment key={order.number}>
                    <div className="Warranty-Conteiner-info">
                      <div className="Warranty-Conteiner-info-header">
                        <h1>Покупатель</h1>
                      </div>
                      <div className="Warranty-Conteiner-info-content">
                        <h4>{order.buyer}</h4>
                      </div>
                    </div>
                    <div className="Warranty-Conteiner-info">
                      <div className="Warranty-Conteiner-info-header">
                        <h1>Внешний вид</h1>
                      </div>
                      <div className="Warranty-Conteiner-info-content">
                        <h4>{order.appearance}</h4>
                      </div>
                    </div>
                    <div className="Warranty-Conteiner-info">
                      <div className="Warranty-Conteiner-info-header">
                        <h1>Комплектация</h1>
                      </div>
                      <div className="Warranty-Conteiner-info-content">
                        <h4>{order.equipment}</h4>
                      </div>
                    </div>
                    <div className="Warranty-Conteiner-info">
                      <div className="Warranty-Conteiner-info-header">
                        <h1>Дата продажи</h1>
                      </div>
                      <div className="Warranty-Conteiner-info-content">
                        <h4>{order.saleDate}</h4>
                      </div>
                    </div>
                  </React.Fragment>
                )
              ))}
              <div className="Warranty-Conteiner-table-open-button">
                <button>Сохранить</button>
              </div>
            </div>
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
            <input type="file" name="file"  onChange={handleFileChange}/>
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
