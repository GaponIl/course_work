import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import '../style/InformationPage.css'
import Header from '../components/Header.jsx'
import Button from '../components/Button.jsx'

function InformationPage({user, setUser})
{
    const navigate = useNavigate()
    return (
        <div className='informationPage'>
            <Header user={user} setUser={setUser}/>
            <div className='info'>
                <div className='info-content'>
                    <p>ФИО: Гапонов Илья Алексеевич</p>
                    <p>Группа: М3О-111БВ-24</p>
                </div>
            </div>
            <Button type='backButton' onClick={() => navigate('/')}></Button>
        </div>
    )
}

export default InformationPage