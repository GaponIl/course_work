import React from 'react'
import { useNavigate } from 'react-router-dom'
import '../style/Header.css'
import api from '../API/mainAPI'
import Button from './Button'

const Header = ({ user, setUser }) => {
  const navigate = useNavigate()
  return (
    <header className='header'>
      <div className='header-buttons'>
        {user !== null ? (
          <Button type='signoutButton' onClick={() => {
            api.signOut()
            setUser(null)
            navigate('/')
          }}></Button>
        ) : (
          <>
            <Button type='loginButton' onClick={() => navigate('/signin')}></Button>
            <Button type='signupButton' onClick={() => navigate('/signup')}></Button>
          </>
        )}
        <Button type='infoButton' onClick={() => navigate('/information')}></Button>
      </div>
    </header>
  )
}

export default Header
