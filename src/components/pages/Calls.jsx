import React, { useState, useEffect } from 'react';
import Header from '../Header';
import './orders.css'; 

const Calls = () => {
  const [date, setDate] = useState('');
  const [records, setRecords] = useState([]);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchData = async () => {
    const response = await fetch(`https://localhost:3000/api/order/record/${date}`);
    const data = await response.json();
    setRecords(data);
  };

  useEffect(() => {
    fetchData();
  }, [date]);

  const fetchRecordDetails = async (name) => {
    const response = await fetch(`https://localhost:3000/api/order/record/${date}/${name}`);

    try {
      const data = await response.json();
      setSelectedRecord({ name, data });
      setIsModalOpen(true);
    } catch (error) {
      console.log(error);
    }
  }

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
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
    return records.map((cal, index) => {
      let logoCall;
      let playButton;

      if (cal.size_record <= 60000) {
        playButton = <td className="table-danger" style={{ textAlign: 'center', cursor: 'default' }}><label>Отсутствует</label></td>;
        logoCall = cal.types_record === 'входящий' ? <img src="/pic/inCallErr.svg" style={{ color: 'transparent' }} /> : <img src="/pic/outCallErr.svg" style={{ color: 'blue' }} />;
      } else {
        playButton = (
          <td className="table-success" style={{ textAlign: 'center', backgroundColor: 'green' }}>
            <button
              className="btn btn-primary btn-sm"
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
          <td>{cal.id_record}</td>
          <td>{cal.types_record}</td>
          <td>{cal.inNomberP_record}</td>
          <td>{cal.outNombr_record}</td>
          <td></td>
          <td></td>
          <td>{cal.date_record}</td>
          <td>{cal.time_record}</td>
          <td>{logoCall}{playButton}</td>
        
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
      {
        selectedRecord && renderModal(selectedRecord)
      }
    </div>
  );
};

export default Calls;
