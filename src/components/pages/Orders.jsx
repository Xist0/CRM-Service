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
    // Ваш блок кода для загрузки и обработки данных
    // ...

    // Пример: Генерация фиктивных данных для отображения
    const allData = Array.from({ length: 20 }, (_, index) => ({
      id: index + 1,
      client: `Client ${index + 1}`,
      device: `Device ${index + 1}`,
      model: `Model ${index + 1}`,
      master: `Master ${index + 1}`,
      status: `Status ${index + 1}`,
    }));

    // Вычисление индексов для отображаемых данных
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    // Выборка данных для отображения на текущей странице
    const currentDisplayData = allData.slice(startIndex, endIndex);

    // Установка данных для отображения
    setOriginalData(allData);
    setDisplayData(currentDisplayData);
  }, [currentPage, itemsPerPage]);

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
        item.client,
        item.device,
        item.model,
        item.master,
        item.status,
      ];

      return searchFields.some((field) =>
        field.toLowerCase().includes(searchTerm.toLowerCase())
      );
    });

    setDisplayData(filteredData);
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
        <QRScaner/>
        <div className="box-main">
          <table>
            <thead>
              <tr>
                <th># Акта</th>
                <th>Клиент</th>
                <th>Аппарат</th>
                <th>Модель</th>
                <th>Мастер</th>
                <th>Состояние</th>
              </tr>
            </thead>
            <tbody id="search-results">
              {displayData.map((item, index) => (
                <React.Fragment key={index}>
                  <tr onClick={() => setExpandedRowIndex((prevIndex) => (prevIndex === index ? null : index))}>
                    <td>
                      <p>{index + 1}</p>
                    </td>
                    <td>
                      <p>{item.client}</p>
                    </td>
                    <td>
                      <p>{item.device}</p>
                    </td>
                    <td>
                      <p>{item.model}</p>
                    </td>
                    <td>
                      <p>{item.master}</p>
                    </td>
                    <td>
                      <p>{item.status}</p>
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