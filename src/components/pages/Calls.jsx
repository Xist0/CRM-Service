import React, { useState, useEffect } from 'react';
import Header from '../Header';
import './orders.css';

const Calls = () => {
  const [date, setDate] = useState('');
  const [records, setRecords] = useState([]);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isTableHeaderVisible, setTableHeaderVisibility] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

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

  const renderModal = (cal) => {
    return (
      <div key={cal.id_record} className={`modal-door${isModalOpen ? 'modal-dialog' : ''}`}>
        <div className="modal fade" id={`exampleModal-${cal.id_record}`} tabIndex="-1" aria-labelledby={`exampleModalLabel-${cal.name_record}`} aria-hidden="true">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id={`exampleModalLabel-${cal.id_record}`}>{cal.name}</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Закрыть"></button>
              </div>
              <div className="modal-body">
                <audio controls>
                  <source src={`http://192.168.1.68/static/song/${cal.name}`} type="audio/mpeg" />
                </audio>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-primary btn-sm" onClick={toggleModal}>
                  Закрыть
                </button>
                <button className="btn btn-primary btn-sm" type="button">
                  Скачать
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
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
          <td></td>
          <td></td>
          <td>{cal.date_record}</td>
          <td>{cal.time_record}</td>
          <td>{logoCall}</td>
          <td >{playButton}</td>
        </tr>

      );
    });
  };

  return (
    <div>
      <Header />
      <div className="calls-container">
        <div className="row row-cols-auto">
          <div className="p-3 mb-2">
            <form onSubmit={handleSubmit}>
              <div className="row-cols">
                <label>Введите дату поиска записей</label>
                <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="form-control" />
              </div>
              <input
                type="text"
                value={searchTerm}
                className='input-search'
                onChange={handleSearchTermChange}
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
                <img src="/pic/4.gif" alt="" />
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
      {selectedRecord && renderModal(selectedRecord)}
    </div>
  );
};

export default Calls;
