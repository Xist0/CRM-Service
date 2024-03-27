import React, { useState, useEffect } from 'react';
import { Html5Qrcode } from 'html5-qrcode';
import './pages.css/QrScaner.css'

function QRcodeScaner({ updateSearchWithQRCode }) {
    const [isEnabled, setEnable] = useState(false);
    const [qrMessage, setQrMessenge] = useState('');

    const qrCodeSuccess = (decodedText) => {
        setQrMessenge(decodedText);
        setEnable(false);
    
        // Проверяем, содержит ли распознанный текст ссылку на страницу поиска заказа
        const searchOrderUrlRegex = /^https?:\/\/\d+\.\d+\.\d+\.\d+:\d+\/SearcOrder\?orderNumber=(\d+)$/;
        const match = decodedText.match(searchOrderUrlRegex);

        console.log(match);
        
        if (match) {
            // Если QR-код содержит ссылку на страницу поиска заказа с номером, извлекаем номер и заполняем поле ввода
            const orderNumber = match[1];
            updateSearchWithQRCode(orderNumber);
        } else {
            // Если QR-код содержит только номер заказа, просто заполняем поле ввода и выполняем поиск
            console.log(decodedText);
            updateSearchWithQRCode(decodedText);
        }
    };

    useEffect(() => {
        const config = { fps: 10, qrbox: { width: 200, height: 200 } };
        const html5QrCode = new Html5Qrcode('qrCodeContainer');

        const startScanner = () => {
            try {
                html5QrCode.start({ facingMode: 'environment' }, config, qrCodeSuccess);
                setQrMessenge('');
            } catch (error) {
                console.error('Error starting QR Code scanner:', error);
            }
        };

        const stopScanner = () => {
            try {
                if (html5QrCode && html5QrCode.isScanning) {
                    html5QrCode.stop().then(() => console.log('Scanner stopped')).catch(() => console.log('Scanner stop error'));
                }
            } catch (error) {
                console.error('Error stopping QR Code scanner:', error);
            }
        };

        if (isEnabled) {
            startScanner();
        } else {
            stopScanner();
        }

        return () => {
            stopScanner();
        };
    }, [isEnabled]);

    return (
        <div className="">
            <div className='visible'>
                <div id='qrCodeContainer' className={`scaner ${isEnabled ? 'visible' : 'hidden'}`}></div>
                <button className='start-button' onClick={() => setEnable(!isEnabled)}>
                    {isEnabled ? 'Выкл' : ` Сканировать QRCode `}
                </button>
            </div>
        </div>
    );
}

export default QRcodeScaner;
