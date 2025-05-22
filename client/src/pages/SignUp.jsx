import React, { useState } from 'react'
import api from '../API/mainAPI'
import { useNavigate } from 'react-router-dom'

const SignUp = ({setUser, user}) => {
    const navigate = useNavigate()

    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const signUp = async () => {
        const response = await api.signUp(username, email, password)
        const authUserData = {id: response.content.id, username: response.content.username, email: response.content.email, role: response.content.role}
        console.log(response)
        setUser(authUserData)
        navigate('/')
    }
  return (
    <div>
      <h1>Sign Up</h1>
      <input type="text" placeholder='Username' onChange={(e) => setUsername(e.target.value)} />
      <input type="text" placeholder='Email' onChange={(e) => setEmail(e.target.value)} />
      <input type="password" placeholder='Password' onChange={(e) => setPassword(e.target.value)} />
      <button onClick={() => signUp()}>Sign Up</button>
    </div>
  )
}

export default SignUp
