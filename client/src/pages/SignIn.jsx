import React, { useState } from 'react'
import api from '../API/mainAPI'
import { useNavigate } from 'react-router-dom'
import '../style/SignInPage.css'

const SignIn = ({ setUser, user }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const signIn = async () => {
    const response = await api.signIn(email, password)
    setUser(response.content)
    navigate('/')
  }

  return (
    <div className='signUpPage'>
      <header className='header-login'></header>
      <div className='login'>
        <div className='login-form'>
          <div className='form-group'>
            <input type="text" className="form-input" placeholder='Email' onChange={(e) => setEmail(e.target.value)}/>
          </div>

          <div className='form-group'>
            <input type="password" className="form-input" placeholder='Password' onChange={(e) => setPassword(e.target.value)}/>
          </div>

          <div className='form-group'>
            <button className='login-button' onClick={signIn}>Войти</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SignIn
