import React, { useState, useEffect } from 'react';
import { CiSearch } from "react-icons/ci";
import Header from '../Header';
import './pages.css/SeacrOrder.css';
import QRcodeScaner from './QRcodeScaner';
import { useLocation } from 'react-router-dom';

function SearcOrder() {
    const [number, setNumber] = useState('');
    const [records, setRecords] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const orderNumber = queryParams.get('orderNumber');
        if (orderNumber) {
            setNumber(orderNumber); // Устанавливаем номер заказа
            fetchData(orderNumber); // Выполняем поиск
        }
    }, [location.search]);

    const fetchData = async (searchNumber) => {
        if (searchNumber.trim() === '') {
            return;
        }
        setIsLoading(true);
        try {
            const response = await fetch(`/api/byt/order/${searchNumber}`);
            const data = await response.json();
            setRecords(data);
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleChange = (e) => {
        setNumber(e.target.value);
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            fetchData(number);
        }
    };

    const updateSearchWithQRCode = (qrCode) => {
        setNumber(qrCode); // Обновляем состояние номера заказа
        fetchData(qrCode); // Выполняем поиск
    };
    
    const renderData = () => {
        if (isLoading) {
            return (
                <div className="loading-animation">
                    <img src="/pic/4.gif" alt="" />
                </div>
            );
        }
        if (!records) {
            // Если нет данных, выводим текст с ошибкой
            return <p>Ничего не найдено</p>;
        }
        // Проверяем, что есть данные о работах и запчастях
        if (!records.parts || !records.work) {
            // Если отсутствуют данные о работах или запчастях, выводим текст с ошибкой
            return <p>Ничего не найдено</p>;
        }
        return (
            <div >
                <div className="container-search-result">
                    <div className="container-search-result-title">
                        <h1>Заказ: {records.id_order}</h1>
                    </div>
                    <div className="container-search-result-main">
                        <h2>Пользователь:</h2> <p>{records.user.name_user}</p>
                        <h2>Номер телефона:</h2> <p>{records.user.phone_user}</p>
                        <h2>Адресс:</h2> <p>{records.user.address_user}</p>
                        <h2>Тип устройства:</h2> <p>{records.device.type}</p>
                        <h2>Бренд:</h2> <p>{records.device.brand}</p>
                        <h2>Номер модели:</h2> <p>{records.device.model}</p>
                        <h2>Стутус:</h2> <p>{records.status.status_order}</p>
                        <h2>Серийный номер модели:</h2> <p>{records.device.sn}</p>
                        <h2>Дефект:</h2> <p>{records.device.defect}</p>
                    </div>
                    <div className="container-search-result-work">
                        <div className="container-search-result-parts-title">
                            <h1>Работы</h1>
                        </div>
                        {records.parts.map((workItem, index) => (
                            <div key={index} className='container-search-result-parts-main'>
                                <p>{workItem.parts_name}</p>
                                <h4>Цена:{workItem.parts_price}</h4>
                            </div>
                        ))}
                        <div className="container-search-result-parts">
                            <div className="container-search-result-parts-title">
                                <h1>Запчасти</h1>
                            </div>
                            <div className="container-search-result-parts-main">
                                {records.parts.map((partItem, index) => (
                                    <div key={index} className='container-search-result-parts-main'>
                                        <p>{partItem.parts_name}</p>
                                        <h4>Цена:{partItem.parts_price}</h4>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="container-search-result-staff">
                    {records.staff[0] && (
                        <div className='container-search-result-staff-main'>
                            <h1>Принял:</h1> <p>{records.staff[0].staff_name}</p>
                            <p>{records.staff[0].staff_job}</p>
                        </div>
                    )}
                    {records.staff[1] && (
                        <div className='container-search-result-staff-main'>
                            <h1>Мастер:</h1> <p>{records.staff[1].staff_name}</p>
                            <p>{records.staff[1].staff_job}</p>
                        </div>
                    )}
                </div>
            </div>
        );
    };
    return (
        <div>
            <Header />
            <div className="container-search">
                <input type="number"   pattern="\d*" value={number} onChange={handleChange} onKeyPress={handleKeyPress} placeholder='Введите номер заказа' />
                <CiSearch onClick={() => fetchData(number)} />
            </div>
            <QRcodeScaner updateSearchWithQRCode={updateSearchWithQRCode} />
            <div className="container-results">{renderData()}</div>
        </div>
    );
}

export default SearcOrder;
