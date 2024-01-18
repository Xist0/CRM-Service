import React, { useState, useEffect } from 'react';
import Header from '../Header';
import './orders.css'; // Подключение файла стилей
import { url } from 'inspector';

const Calls = () => {
  const [date, setDate] = useState('');
  const [records, setRecords] = useState([]);
  const [selectedRecord, setSelectedRecord] = useState({ name: null, data: [], audioUrl: null });
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchData = async () => {
    try {
      const response = await fetch(`/api/order/record/${date}`);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      setRecords(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [date]);

  const fetchRecordDetails = () => {
    setIsModalOpen(!isModalOpen);
  }



  const renderModal = (cal) => {
    return <>      
    <div key={cal.name_record} className={`modal-door${isModalOpen ? 'modal-dialog' : ''}`}>
      <div className="modal fade" id={`exampleModal-${cal.name_record}`} tabIndex="-1" aria-labelledby={`exampleModalLabel-${cal.name_record}`} aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id={`exampleModalLabel-${cal.name_record}`}>{cal.name_record}</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Закрыть"></button>
            </div>
            <div className="modal-body">
              <audio controls>
                <source src={url} type="audio/mpeg" />
                Your browser does not support the audio element.
              </audio>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-primary btn-sm" onClick={fetchRecordDetails}>
                Закрыть
              </button>
              <button className="btn btn-primary btn-sm" type="button" >
                Скачать
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>

  }

  const renderRecords = () => {
    return records.map((cal, index) => {
      let logoCall;
      let playButton;

      if (cal.size_record <= 60000) {
        playButton = <td className="table-danger" style={{ textAlign: 'center' }}><label>Отсутствует</label></td>;
        logoCall = cal.types_record === 'входящий' ? <img src="/static/pic/inCallErr.svg" /> : <img src="/static/pic/outCallErr.svg" />;
      } else {
        playButton = (
          <td className="table-success" style={{ textAlign: 'center' }}>
            <button
              className="btn btn-primary btn-sm"
              onClick={() => fetchRecordDetails(cal.name_record, date)}
            >
              Воспроизвести
            </button>

          </td>
        );
        logoCall = cal.types_record === 'входящий' ? <img src="/static/pic/inCallOk.svg" /> : <img src="/static/pic/outCallOk.svg" />;
      }

      return (
        <tr key={index}>
          <td>{cal.id_record}</td>
          <td>{cal.types_record}</td>
          <td>{cal.inNomberP_record}</td>
          <td>{cal.outNombr_record}</td>
          <td></td>
          <td></td>
          <td>{cal.date_record}</td>
          <td>{cal.time_record}</td>
          {playButton}
          <td>{logoCall}</td>
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
            <form onSubmit={(e) => { e.preventDefault(); fetchData(); }}>
              <label>Введите дату поиска записей</label>
              <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="form-control" />
              <button type="submit" className="btn btn-primary">поиск</button>
            </form>
          </div>
        </div>
        <div className="calls-container">
          <div className="row row-cols-auto">
            <div className="col">
              <table className="table">
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
                    <th scope="col">воспроизвести</th>
                  </tr>
                </thead>
                <tbody>{renderRecords()}</tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      
      {records.map((cal, index) => renderModal(cal))}

    </div>
  );
};

export default Calls;
