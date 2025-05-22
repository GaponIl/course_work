import React, { useState } from 'react'
import api from '../API/mainAPI'
import { useNavigate } from 'react-router-dom'

const SignIn = ({setUser, user}) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()

    const signIn = async () => {
        const response = await api.signIn(email, password)
        setUser(response.content)
        navigate('/')
    }

  return (
    <div>
      <h1>Sign In</h1>
      <input type="text" placeholder='Email' onChange={(e) => setEmail(e.target.value)} />
      <input type="password" placeholder='Password' onChange={(e) => setPassword(e.target.value)} />
      <button onClick={() => signIn()}>Sign In</button>
    </div>
  )
}

export default SignIn
