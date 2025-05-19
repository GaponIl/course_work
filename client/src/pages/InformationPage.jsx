import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function InformationPage()
{
    const navigate = useNavigate()
    return (
        <div>
            <h1>ФИО: Илья Гапонов</h1>
            <button onClick={() => navigate('/')}>Назад</button>
        </div>
    )
}

export default InformationPage