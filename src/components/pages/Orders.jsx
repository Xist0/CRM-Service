import React, { useState, useEffect } from 'react';
import Header from '../Header';
import { CiSearch } from 'react-icons/ci';
import { SlArrowRight } from "react-icons/sl";
import { SlArrowLeft } from "react-icons/sl";
import Messenger from './messenger/Messenger';

function Orders() {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [expandedRowIndex, setExpandedRowIndex] = useState(null);
  const [originalData, setOriginalData] = useState([]);
  const [displayData, setDisplayData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true); // Добавляем состояние для отображения анимации загрузки

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`api/order/${itemsPerPage}/${(currentPage - 1) * itemsPerPage}`);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const json = await response.json();
        setOriginalData(json);
        setDisplayData(json.slice(0, itemsPerPage));
        setLoading(false); // Устанавливаем loading в false после загрузки данных
      } catch (error) {
        console.error('Ошибка загрузки данных:', error);
      }
    };

    fetchData();
  }, [itemsPerPage, currentPage]);

  const handlePrevPage = () => {
    setExpandedRowIndex(null); // Закрыть открытый список при переключении страницы
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNextPage = () => {
    setExpandedRowIndex(null);
    const totalPages = Math.ceil(originalData.length / itemsPerPage);
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  const handleSearchTermChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearch = () => {
    const filteredData = originalData.filter((item) => {
      const searchFields = [
      ];

      return searchFields.some((field) =>
        String(field).toLowerCase().includes(searchTerm.toLowerCase())
      );
    });

    setDisplayData(filteredData.slice(0, itemsPerPage));
  };

  return (
    <div>
      <Header />
      <div className="container-box">
        <div className="box">
          <div className="box-title">
            <h1>Заказы</h1>
          </div>
          <div className="box-line"></div>
          <div className="box-serah">
            <input
              type="text"
              value={searchTerm}
              onChange={handleSearchTermChange}
            />
            <CiSearch onClick={handleSearch} />
          </div>
          <div className="box-main">
            <table>
              <thead>
                <tr>
                  <th># Акта</th>
                  <th>ФИО</th>
                  <th>Аппарат</th>
                  <th>Модель </th>
                  <th>Мастер</th>
                  <th>Состояние</th>
                </tr>
              </thead>
              <tbody id="search-results">
                {Array.isArray(displayData) && displayData.map((item, index) => (
                  <React.Fragment key={index}>
                    <tr onClick={() => setExpandedRowIndex((prevIndex) => (prevIndex === index ? null : index))}>
                      <td>
                        <p>{item.id_order} </p>
                      </td>
                      <td id='FIO'>
                        <p>{item.user.first_name} </p>
                      </td>
                      <td>
                        <p>{item.device.type}</p>
                      </td>
                      <td>
                        <p>{item.device.model}</p>
                      </td>
                      <td id='FIO'>
                        <p>{item.staff.first_name}</p>
                      </td>
                      <td>
                        <p>{item.status.status_order}</p>
                      </td>
                    </tr>
                  </React.Fragment>
                ))}
              </tbody>
            </table>
            {loading && (
              <div className="loading-animation"> <img src="/public/LogoAnims.svg" alt="" /></div>

            )}
          </div>
        </div>
        <div className="pagination-custom">
          <SlArrowLeft onClick={handlePrevPage} disabled={currentPage === 1} />
          <span>{currentPage}</span>
          <SlArrowRight onClick={handleNextPage} disabled={currentPage === Math.ceil(originalData.length / itemsPerPage)} />
        </div>
      </div>
      <Messenger />
    </div>
  );
}

export default Orders;
