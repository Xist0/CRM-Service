import React, { useState } from 'react';
import Messenger from './messenger/Messenger'
import Header from '../Header'

function Maxvi() {
    const [isLoading, setIsLoading] = useState(false);
    const [records, setRecords] = useState(null); 

    const fetchMaxvi = async (numberMaxvi) => {
        if (numberMaxvi.trim() === '') {
            return;
        }
        setIsLoading(true);
        try {
            const response = await fetch(`/stud/hs/api/getfulorder/${numberMaxvi}`);
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const data = await response.json();
            setRecords(data);
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const renderOrderMaxvi = () => {
        if (isLoading) {
            return (
                <div className="loading-animation"> <img src="/public/LogoAnims.svg" alt="" /></div>
            );
        }
        if (!records) { 
            return (<p>Ничего не найдено</p>);
        }
        return (
            <div className="order-table">
                <div className="table-header">
                    <div>Номер заказа</div>
                    <div>Дата заказа</div>
                    <div>Тип заказа</div>
                </div>
                <div className="table-body">
                    {orders.map((order, index) => (
                        <div className="table-row" key={index}>
                            <div>{order.order_id}</div>
                            <div>{order.order_date}</div>
                            <div>{order.order_type}</div>
                        </div>
                    ))}
                </div>
            </div>
        );
    };

    return (
        <div>
            <Header />
            <div className="container-box">
                <div className="maxvi-header">
                    <input type="text" name="" id="" placeholder='Введите номер закза' onChange={(e) => fetchMaxvi(e.target.value)} /> 
                    <button onClick={() => fetchMaxvi(e.target.value)}>Найти</button> 
                </div>
                <div className="container-results">{renderOrderMaxvi()}</div>
            </div>
            <Messenger />
        </div>
    );
}

export default Maxvi;
