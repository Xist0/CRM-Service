import React, { useState, useEffect } from 'react';
import Header from '../Header';
import { CiSearch } from 'react-icons/ci';
import { SlArrowRight } from "react-icons/sl";
import { SlArrowLeft } from "react-icons/sl";
import './pages.css/pages.css';
import QRScaner from './QRScaner';

function Orders() {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [expandedRowIndex, setExpandedRowIndex] = useState(null);
  const [originalData, setOriginalData] = useState([]);
  const [displayData, setDisplayData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetch('http://192.168.1.65/api/users')
      .then(res => res.json())
      .then(json => {
        setOriginalData(json);
        setDisplayData(json.slice(0, itemsPerPage));
      })
      .catch(error => console.error('Ошибка загрузки данных:', error));
  }, [itemsPerPage]);

  const handlePrevPage = () => {
    setExpandedRowIndex(null); // Закрыть открытый список при переключении страницы
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNextPage = () => {
    setExpandedRowIndex(null); // Закрыть открытый список при переключении страницы
    // Предполагается, что у вас есть общее количество данных или другой способ определения общего числа страниц
    const totalPages = Math.ceil(originalData.length / itemsPerPage);
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  const handleSearchTermChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearch = () => {
    const filteredData = originalData.filter((item) => {
      const searchFields = [
        item.id_user,
        item.first_name,
        item.last_name,
        item.midl_name,
        item.name_user,
        item.phone_user,
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
        <QRScaner />
        <div className="box-main">
          <table>
            <thead>
              <tr>
                <th># Акта</th>
                <th>Имя</th>
                <th>Фамилия</th>
                <th>Отчество</th>
                <th>Пользователь</th>
                <th>Телефон</th>
              </tr>
            </thead>
            <tbody id="search-results">
              {displayData.map((item, index) => (
                <React.Fragment key={index}>
                  <tr onClick={() => setExpandedRowIndex((prevIndex) => (prevIndex === index ? null : index))}>
                    <td>
                      <p>{item.id_user}</p>
                    </td>
                    <td>
                      <p>{item.first_name}</p>
                    </td>
                    <td>
                      <p>{item.last_name}</p>
                    </td>
                    <td>
                      <p>{item.midl_name}</p>
                    </td>
                    <td>
                      <p>{item.name_user}</p>
                    </td>
                    <td>
                      <p>{item.phone_user}</p>
                    </td>
                  </tr>
                  {expandedRowIndex === index && (
                    <tr id='table-active'>
                      <td>
                        <p>Доп. 1</p>
                      </td>
                      <td>
                        <p>Доп. 2</p>
                      </td>
                      <td>
                        <p>Доп. 3</p>
                      </td>
                      <td>
                        <p>Доп. 4</p>
                      </td>
                      <td>
                        <p>Доп. 5</p>
                      </td>
                      <td>
                        <p>Доп. 6</p>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="pagination-custom">
        <SlArrowLeft onClick={handlePrevPage} disabled={currentPage === 1} />
        <span>{currentPage}</span>
        <SlArrowRight onClick={handleNextPage} disabled={currentPage === Math.ceil(originalData.length / itemsPerPage)} />
      </div>
    </div>
  );
}

export default Orders;
