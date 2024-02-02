import React, { useState, useEffect } from 'react';
import Header from '../Header';
import Messenger from './messenger/Messenger';
import { SlArrowRight } from "react-icons/sl";
import { SlArrowLeft } from "react-icons/sl";


function Contractors() {
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [expandedRowIndex, setExpandedRowIndex] = useState(null);
    const [originalData, setOriginalData] = useState([]);
    const [displayData, setDisplayData] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await fetch('/api/1c/users');
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const json = await response.json();
            setOriginalData(json);
            setDisplayData(json.slice(0, itemsPerPage));
        } catch (error) {
            console.error('Ошибка загрузки данных:', error);
        }
    };

    const handlePrevPage = () => {
        setExpandedRowIndex(null); // Закрыть открытый список при переключении страницы
        setCurrentPage((prev) => Math.max(prev - 1, 1));
        setDisplayData(originalData.slice((currentPage - 2) * itemsPerPage, (currentPage - 1) * itemsPerPage));
    };

    const handleNextPage = () => {
        setExpandedRowIndex(null);
        const totalPages = Math.ceil(originalData.length / itemsPerPage);
        setCurrentPage((prev) => Math.min(prev + 1, totalPages));
        setDisplayData(originalData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage));
    };

    const handleSearchTermChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleSearch = () => {
        const filteredData = originalData.filter((item) => {
            const searchFields = [item.name_user];
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
                <div className="box-main">
                    <table>
                        <thead>
                            <tr>
                                <th>ID User</th>
                                <th>ФИО</th>
                                <th>Номер телефона</th>
                                <th>Адресс </th>

                            </tr>
                        </thead>
                        <tbody id="search-results">
                            {Array.isArray(displayData) && displayData.map((item, index) => (
                                <React.Fragment key={index}>
                                    <tr onClick={() => setExpandedRowIndex((prevIndex) => (prevIndex === index ? null : index))}>
                                        <td>
                                            <p>{item.id_user} </p>
                                        </td>
                                        <td id='FIO'>
                                            <p>{item.name_user} </p>
                                        </td>
                                        <td>
                                            <p>{item.phone_user}</p>
                                        </td>
                                        <td>
                                            <p>{item.address_user}</p>
                                        </td>
                                    </tr>
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
            <Messenger />
        </div>
    )
}

export default Contractors
