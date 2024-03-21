import React, { useState, useEffect, useRef } from 'react';
import Header from '../Header';
import './orders.css';
import Messenger from './messenger/Messenger';
import { Link } from 'react-router-dom';

// Компонент для отображения модального окна записи
const Modal = ({ cal, isModalOpen, toggleModal, downloadAudio }) => {
  const audioRef = useRef(null);

  const stopAudio = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  };

  const handleCloseModal = () => {
    stopAudio();
    toggleModal();
  };

  return (
    <div className={`modal-door${isModalOpen ? 'modal-dialog' : ''}`}>
      <div className="modal fade" id={`exampleModal-${cal.id_record}`} tabIndex="-1" aria-labelledby={`exampleModalLabel-${cal.name_record}`} aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id={`exampleModalLabel-${cal.id_record}`}>{cal.name}</h5>
            </div>
            <div className="modal-body">
              <audio controls ref={audioRef}>
                <source src={`http://192.168.1.10/static/song/${cal.name}`} type="audio/mpeg" />
              </audio>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-primary btn-sm" onClick={handleCloseModal}>
                Закрыть
              </button>
              <button
                className="btn btn-primary btn-sm"
                type="button"
                onClick={() => downloadAudio(cal.name)}
              >
                Скачать
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Calls = () => {
  const [date, setDate] = useState('');
  const [records, setRecords] = useState([]);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isTableHeaderVisible, setTableHeaderVisibility] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  // Функция для парсинга номера заказа
  const parseOrderNumber = (text) => {
    const orderNumberRegex = /00НФ-(\d+)/;
    const match = text.match(orderNumberRegex);

    if (match) {
      return match[1];
    } else {
      return null;
    }
  };

  const fetchData = async () => {
    if (date.trim() === '') {
      return;
    }
    setIsLoading(true);
    try {
      const response = await fetch(`/api/order/record/${date}`);
      const data = await response.json();
      setRecords(data);
      setTableHeaderVisibility(true);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchData();
  };

  const fetchRecordDetails = async (name) => {
    const response = await fetch(`/api/order/record/${date}/${name}`);

    try {
      const data = await response.json();
      setSelectedRecord({ name, data });
      setIsModalOpen(true);
      handleSearchTermChange({});
    } catch (error) {
      console.log(error);
    }
  };

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleSearchTermChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
  };

  const downloadAudio = (name) => {
    const audioUrl = `http://192.168.1.10/static/song/${name}`;
    const link = document.createElement('a');
    link.href = audioUrl;
    link.download = name;
    link.click();
  };

  const handleClick = (event) => {
    event.preventDefault();

    const text = event.target.textContent;
    const orderNumber = parseOrderNumber(text);

    if (orderNumber) {
      const searchUrl = `https://localhost:5173/SearcOrder?orderNumber=${orderNumber}`;
      window.location.href = searchUrl;
    } else {
      console.error('Failed to parse order number from link:', text);
    }
  };

  const renderRecords = () => {
    const filteredRecords = searchTerm.trim() === ''
      ? records
      : records.filter(record => record.outNombr_record.includes(searchTerm));

    return filteredRecords.map((cal, index) => {
      let logoCall;
      let playButton;

      if (cal.size_record <= 60000) {
        playButton = <td className='tdRed' id='td'><label>Отсутствует</label></td>;
        logoCall = cal.types_record === 'входящий' ? <img src="/pic/inCallErr.svg" style={{ color: 'transparent' }} /> : <img src="/pic/outCallErr.svg" style={{ color: 'blue' }} />;
      } else {
        playButton = (
          <td className="table-success" style={{ textAlign: 'center', backgroundColor: '#52f65257' }}>
            <button
              className="btn-td"
              onClick={() => {
                fetchRecordDetails(cal.name_record)
              }}
            >
              Воспроизвести
            </button>
          </td>
        );
        logoCall = cal.types_record === 'входящий' ? <img src="/pic/inCallOk.svg" style={{ color: 'red' }} /> : <img src="/pic/outCallOk.svg" style={{ color: 'blue' }} />;
      }

      return (
        <tr key={index}>
          <td id='type_call'>{cal.id_record}</td>
          <td id='type_call'>{cal.types_record}</td>
          <td>{cal.inNomberP_record}</td>
          <td>{cal.outNombr_record}</td>
          <td>{cal.users[0].name_user}</td>
          <td>{cal.orders[0].id_order.startsWith('00НФ') ? (
            <Link to="#" onClick={handleClick}>{cal.orders[0].id_order}</Link>
          ) : (
            cal.orders[0].id_order
          )}</td>
          <td>{cal.date_record}</td>
          <td>{cal.time_record}</td>
          <td>{logoCall}</td>
          <td id='type-butn'>{playButton}</td>
        </tr>
      );
    });
  };

  return (
    <div>
      <Header />
      <Messenger />
      <div className="container-box">
        <div className="calls-container">
          <div className="row row-cols-auto">
            <div className="p-3 mb-2">
              <form onSubmit={handleSubmit}>
                <div className="row-cols">
                  <label>Введите дату поиска записей</label>
                  <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="form-control" />
                </div>
                <input
                  type="number"
                  pattern="\d*"
                  value={searchTerm}
                  className='input-search'
                  onChange={(e) => handleSearchTermChange(e)} // Оберните вызов в функцию
                  placeholder="Поиск по номеру телефона"
                />
                <button type="submit" className="btn btn-primary">поиск</button>
              </form>
            </div>
          </div>
          <div className="calls-container">
            <div className="row row-cols-auto">
              <div className="col">
                {isLoading ? (
                  <div className="loading-animation"> <img src="/public/LogoAnims.svg" alt="" /></div>
                ) : (
                  <table className="table">
                    {isTableHeaderVisible && (
                      <thead>
                        <tr>
                          <th scope="col">#</th>
                          <th scope="col">тип звонка</th>
                          <th scope="col">набранный номер</th>
                          <th scope="col">номер звонящий</th>
                          <th scope="col">Ф.И.О</th>
                          <th scope="col">заказ наряд</th>
                          <th scope="col">дата звонка</th>
                          <th scope="col">время звонка</th>
                          <th className="icon"></th>
                          <th scope="col">воспроизвести</th>
                        </tr>
                      </thead>
                    )}
                    <tbody>{renderRecords()}</tbody>
                  </table>
                )}
              </div>
            </div>
          </div>
        </div>
        {selectedRecord && (
          <Modal
            cal={selectedRecord}
            isModalOpen={isModalOpen}
            toggleModal={toggleModal}
            downloadAudio={downloadAudio}
          />
        )}
      </div>
    </div>
  );
};

export default Calls;

