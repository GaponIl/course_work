import { BrowserRouter, Routes, Route} from 'react-router-dom'
import StartPage from './pages/StartPage'
import InformationPage from './pages/InformationPage'
import api from './API/mainAPI'
import { useState, useEffect } from 'react'
import SignIn from './pages/SignIn'
import './style/App.css'
import SignUp from './pages/SignUp'

function App() {

  const [user, setUser] = useState(null)

  const [jokes, setJokes] = useState([])
  const [dailyJoke, setDaily] = useState([])

  const fetchJokes = async () => {
    try {
      const response = await api.getAllJokes()
      setJokes(response)
    } catch (error) {
      console.error(error)
    }
  }

  const getDayJoke = async () => {
    try {
      const response = await api.getDailyJoke()
      setDaily(response)
      
    } catch (error) {
      console.error(error)
    }
  }

  const getUser = async () => {
    try {
      const response = await api.getUser()
      if (response.status == "error") {
        console.error(response.content);
      } else {
        console.log(response.content);
        setUser(response.content)
      }
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    fetchJokes()
    getDayJoke()
    getUser()
  }, [])

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/information" element={<InformationPage />}/>

        <Route path="/signin" element={<SignIn setUser={setUser} user={user} />}/>
        <Route path="/signup" element={<SignUp setUser={setUser} user={user} />}/>

        <Route path="/" element={<StartPage 
          dailyJoke={dailyJoke} 
          setDaily={setDaily} 
          jokes={jokes} 
          setJokes={setJokes} 
          fetchJokes={fetchJokes}
          user={user}
          setUser={setUser}
        />}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App