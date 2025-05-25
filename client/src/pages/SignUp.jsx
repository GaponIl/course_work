import React, { useState } from 'react'
import api from '../API/mainAPI'
import { useNavigate } from 'react-router-dom'
import '../style/SignUpPage.css'

const SignUp = ({ setUser, user }) => {
  const navigate = useNavigate()

  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const signUp = async () => {
    const response = await api.signUp(username, email, password)
    const authUserData = { id: response.content.id, username: response.content.username, email: response.content.email, role: response.content.role }
    console.log(response)
    setUser(authUserData)
    navigate('/')
  }
  return (
    <div className='signUpPage'>
      <header className='header-signup'></header>
      <div className='signup'>
        <div className='signup-form'>
          <div className="form-group">
            <input
              type="text"
              placeholder='Username'
              className="form-input"
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div className="form-group">
            <input
              type="email"
              placeholder='Email'
              className="form-input"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="form-group">
            <input
              type="password"
              placeholder='Password'
              className="form-input"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button className="signup-button" onClick={signUp}>ЗАРЕГИСТРИРОВАТЬСЯ</button>
        </div>
      </div>
    </div>
  )
}

export default SignUp
