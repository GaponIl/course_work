import { BrowserRouter, Routes, Route} from 'react-router-dom'
import StartPage from './pages/StartPage'
import InformationPage from './pages/InformationPage'
import api from './API/mainAPI'
import { useState, useEffect } from 'react'

function App() {
  const [jokes, setJokes] = useState([])

  const fetchJokes = async () => {
    try {
      const response = await api.getAllJokes()
      setJokes(response)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {fetchJokes()}, [])

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/information" element={<InformationPage />}/>
        <Route path="/" element={<StartPage jokes={jokes} setJokes={setJokes} fetchJokes={fetchJokes}/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App