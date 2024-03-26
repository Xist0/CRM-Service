import React, { useState } from 'react';
import Messenger from './messenger/Messenger';
import Header from '../Header';

function Maxvi() {
    const [isLoading, setIsLoading] = useState(false);
    const [records, setRecords] = useState(null);
    const [searchValue, setSearchValue] = useState('');
    const [isEditing, setIsEditing] = useState(false);
    const [editedRecords, setEditedRecords] = useState(null);

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

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditedRecords(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleEdit = () => {
        setIsEditing(true);
        setEditedRecords(records);
    };

    const handleSave = () => {
        // Здесь можно отправить editedRecords на сервер или выполнить другие действия
        console.log('Сохранение данных:', editedRecords);
        setIsEditing(false);
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
                <div className="container-maxvi">
                    {isLoading ? (
                        <div className="loading-animation">
                            <img src="/public/LogoAnims.svg" alt="" />
                        </div>
                    ) : (
                        records && (
                            <div className="order-details">
                                <div className="order-details-header">
                                    <div className="section-order-maxvi">
                                        <h1>Заказ {records.order_id}</h1>
                                        <div className="table-row">
                                            <div className="table-cell">Дата заказа: {records.order_date}</div>
                                            <div className="table-cell">Тип заказа: {records.order_type}</div>
                                        </div>
                                    </div>
                                </div>
                                <div className="order-details-main-container">
                                    <div className="order-details-main-container-sell">
                                        <div className="section-seller">
                                            <h1>Продавец</h1>
                                            <div className="table-row">
                                                <div className="table-cell">Имя продавца:</div>
                                                <div className="table-cell">{records.retail_user.user_name}</div>
                                            </div>
                                            <div className="table-row">
                                                <div className="table-cell">Номер телефона:</div>
                                                <div className="table-cell">{records.retail_user.user_phone}</div>
                                            </div>
                                            <div className="table-row">
                                                <div className="table-cell">Адрес:</div>
                                                <div className="table-cell">{records.retail_user.user_address}</div>
                                            </div>
                                            <div className="table-row">
                                                <div className="table-cell">Физический адрес:</div>
                                                <div className="table-cell">{records.retail_user.user_legal_address}</div>
                                            </div>
                                            <div className="table-row">
                                                <div className="table-cell">Тип продавца:</div>
                                                <div className="table-cell">{records.retail_user.user_type}</div>
                                            </div>
                                        </div>
                                        <div className="section">
                                            <h1>Устройство</h1>
                                            <div className="table-row">
                                                <div className="table-cell">Номер устройства:</div>
                                                {isEditing ? (
                                                    <input
                                                        type="text"
                                                        name="device_id"
                                                        value={editedRecords.device.device_id}
                                                        onChange={handleChange}
                                                        className='table-input'
                                                    />
                                                ) : (
                                                    <div className="table-cell">{records.device.device_id}</div>
                                                )}
                                            </div>
                                            <div className="table-row">
                                                <div className="table-cell">Дата продажи:</div>
                                                {isEditing ? (
                                                    <input
                                                        type="text"
                                                        name="device_sale_date"
                                                        value={editedRecords.device.device_sale_date}
                                                        onChange={handleChange}
                                                        className='table-input'

                                                    />
                                                ) : (
                                                    <div className="table-cell">{records.device.device_sale_date}</div>
                                                )}
                                            </div>
                                            <div className="table-row">
                                                <div className="table-cell">Полная модель:</div>
                                                {isEditing ? (
                                                    <input
                                                        type="text"
                                                        name="device_full_model"
                                                        value={editedRecords.device.device_full_model}
                                                        onChange={handleChange}
                                                        className='table-input'

                                                    />
                                                ) : (
                                                    <div className="table-cell">{records.device.device_full_model}</div>
                                                )}
                                            </div>
                                            <div className="table-row">
                                                <div className="table-cell">Тип устройства:</div>
                                                {isEditing ? (
                                                    <input
                                                        type="text"
                                                        name="device_type"
                                                        value={editedRecords.device.device_type}
                                                        onChange={handleChange}
                                                        className='table-input'

                                                    />
                                                ) : (
                                                    <div className="table-cell">{records.device.device_type}</div>
                                                )}
                                            </div>
                                            <div className="table-row">
                                                <div className="table-cell">Бренд:</div>
                                                {isEditing ? (
                                                    <input
                                                        type="text"
                                                        name="device_brand"
                                                        value={editedRecords.device.device_brand}
                                                        onChange={handleChange}
                                                        className='table-input'

                                                    />
                                                ) : (
                                                    <div className="table-cell">{records.device.device_brand}</div>
                                                )}
                                            </div>
                                            <div className="table-row">
                                                <div className="table-cell">Модель:</div>
                                                {isEditing ? (
                                                    <input
                                                        type="text"
                                                        name="device_model"
                                                        value={editedRecords.device.device_model}
                                                        onChange={handleChange}
                                                        className='table-input'

                                                    />
                                                ) : (
                                                    <div className="table-cell">{records.device.device_model}</div>
                                                )}
                                            </div>
                                            <div className="table-row">
                                                <div className="table-cell">Серийник:</div>
                                                {isEditing ? (
                                                    <input
                                                        type="text"
                                                        name="device_sn"
                                                        value={editedRecords.device.device_sn}
                                                        onChange={handleChange}
                                                        className='table-input'

                                                    />
                                                ) : (
                                                    <div className="table-cell">{records.device.device_sn}</div>
                                                )}
                                            </div>
                                            <div className="table-row">
                                                <div className="table-cell">IMEI:</div>
                                                {isEditing ? (
                                                    <input
                                                        type="text"
                                                        name="device_imei"
                                                        value={editedRecords.device.device_imei}
                                                        onChange={handleChange}
                                                        className='table-input'

                                                    />
                                                ) : (
                                                    <div className="table-cell">{records.device.device_imei}</div>
                                                )}
                                            </div>
                                            <div className="table-row">
                                                <div className="table-cell">Состояние устройства:</div>
                                                {isEditing ? (
                                                    <input
                                                        type="text"
                                                        name="device_appearance"
                                                        value={editedRecords.device.device_appearance}
                                                        onChange={handleChange}
                                                        className='table-input'

                                                    />
                                                ) : (
                                                    <div className="table-cell">{records.device.device_appearance}</div>
                                                )}
                                            </div>
                                            <div className="table-row">
                                                <div className="table-cell">Комплектация:</div>
                                                {isEditing ? (
                                                    <input
                                                        type="text"
                                                        name="device_equipment"
                                                        value={editedRecords.device.device_equipment}
                                                        onChange={handleChange}
                                                        className='table-input'

                                                    />
                                                ) : (
                                                    <div className="table-cell">{records.device.device_equipment}</div>
                                                )}
                                            </div>
                                            <div className="table-row-button">
                                                {isEditing ? (
                                                    <button onClick={handleSave}>Сохранить</button>
                                                ) : (
                                                    <button onClick={handleEdit}>Редактировать</button>
                                                )}
                                            </div>
                                        </div>

                                        <div className="section">
                                            <h1>Покупатель</h1>
                                            <div className="table-row">
                                                <div className="table-cell">Имя покупателя:</div>
                                                <div className="table-cell">{records.end_user.user_name}</div>
                                            </div>
                                            <div className="table-row">
                                                <div className="table-cell">Номер телефона:</div>
                                                <div className="table-cell">{records.end_user.user_phone}</div>
                                            </div>
                                            <div className="table-row">
                                                <div className="table-cell">Адрес:</div>
                                                <div className="table-cell">{records.end_user.user_address}</div>
                                            </div>
                                            <div className="table-row">
                                                <div className="table-cell">Физический адрес:</div>
                                                <div className="table-cell">{records.end_user.user_legal_address}</div>
                                            </div>
                                            <div className="table-row">
                                                <div className="table-cell">Тип покупателя:</div>
                                                <div className="table-cell">{records.end_user.user_type}</div>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                                <div className="order-details-main-container-zapchasti">
                                    <div className="section">
                                        <h1>Запчасти</h1>
                                        <div>Название запчасти: {records.parts.part_name}</div>
                                        <div>Цена запчасти: {records.parts.part_price}</div>
                                    </div>
                                    <div className="section">
                                        <h1>Работы</h1>
                                        <div>Название работы: {records.works.work_name}</div>
                                        <div>Цена работы: {records.works.work_price}</div>
                                    </div>
                                </div>
                                <div className="table-row-button">
                                    {isEditing ? (
                                        <button onClick={handleSave}>Сохранить</button>
                                    ) : (
                                        <button onClick={handleEdit}>Редактировать</button>
                                    )}
                                </div>
                            </div>
                        )
                    )}
                </div>
            </div>
            <Messenger />
        </div>
    );
}

export default Maxvi;
