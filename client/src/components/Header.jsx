import React from 'react'
import { useNavigate } from 'react-router-dom'
import '../style/Header.css'
import api from '../API/mainAPI'
import Button from './Button'

const Header = ({user, setUser}) => {
    const navigate = useNavigate()
  return (
    <header className='header'>
        {/* <button onClick={() => navigate('/information')}>Информация об авторе сайта</button> */}
        <div className='header-buttons'>
        {user !== null ? (
            <Button type='addButton' onClick={() => {
              api.signOut()
              setUser(null)
              navigate('/')
            }}>Выход</Button>
        ) : (
            <>
                <Button type='addButton' onClick={() => navigate('/signin')}>Вход</Button>
                <Button type='addButton' onClick={() => navigate('/signup')}>Регистрация</Button>
            </>
        )}
        </div>
    </header>
  )
}

export default Header
