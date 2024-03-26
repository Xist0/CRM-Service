import React, { useState } from 'react';
import Messenger from './messenger/Messenger';
import Header from '../Header';

function Maxvi() {
    const [isLoading, setIsLoading] = useState(false);
    const [records, setRecords] = useState(null);
    const [searchValue, setSearchValue] = useState('');

    const fetchMaxvi = async () => {
        if (searchValue.trim() === '') {
            return;
        }
        setIsLoading(true);
        try {
            const response = await fetch(`/api/WarrantyOrdermaxvi/${encodeURIComponent(searchValue)}`);
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const data = await response.json();
            const firstObject = data[0];
            setRecords(firstObject);
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const renderOrderMaxvi = () => {
        if (isLoading) {
            return (
                <div className="loading-animation">
                    <img src="/public/LogoAnims.svg" alt="" />
                </div>
            );
        }
        if (!records) {
            return <p>Ничего не найдено</p>;
        }
        return (
            <div className="order-table">
                <div className="table-header">

                </div>
                <div className="table-body">
                    <div className="table-row">
                    <div>Номер заказа{records.order_id}</div>
                    <div>Дата заказа{records.order_date}</div>
                    <div>Тип заказа{records.order_type}</div>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div>
            <Header />
            <div className="container-box">
                <div className="maxvi-header">
                    <input
                        type="text"
                        placeholder="Введите номер заказа"
                        value={searchValue}
                        onChange={(e) => setSearchValue(e.target.value)}
                    />
                    <button onClick={fetchMaxvi}>Найти</button>
                </div>
                <div className="container-results">{renderOrderMaxvi()}</div>
            </div>
            <Messenger />
        </div>
    );
}

export default Maxvi;
