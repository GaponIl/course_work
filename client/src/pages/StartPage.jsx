import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../API/mainAPI'

function StartPage({jokes, setJokes, fetchJokes}) {
  const [isOpenCreateForm, setIsOpenCreateForm] = useState(false)
  const [jokeText, setJokeText] = useState('')
  const [updatingID, setUpdatingID] = useState(null)
  const [newJokeText, setNewJokeText] = useState('')
  const [dailyJoke, setDailyJoke] = useState(null)
  const navigate = useNavigate()

  const createJoke = async (jokeText) => {
    try {
      const response = await api.createJoke(jokeText)
      setJokes(prev => [...prev, response])
      console.log(response)
      setJokeText('')
    } catch (error) {
      console.error(error)
    }
  }

  const updateJoke = async (id, text) => {
    try {
      const response = await api.updateJoke(id, text)
      setJokes(prev => prev.map(joke => joke.id === updatingID ? { ...response } : joke))
      setUpdatingID(null)
      setNewJokeText('')
    } catch (error) {
      console.error(error)
    }
  }

  const deleteJoke = async (id) => {
    try {
      await api.deleteJoke(id)
      setJokes(prev => prev.filter(joke => joke.id !== id));
    } catch (error) {
      console.error(error);
    }
  }

  const fetchDailyJoke = async () => {
    try {
      const response = await api.getDailyJoke()
      setDailyJoke(response)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => fetchDailyJoke, [])
  return (
  <div>
    <button disabled={isOpenCreateForm || !(updatingID === null)} onClick={() => navigate('/information')}>Информация об авторе сайта</button>

    <h1>Анекдот дня</h1>
    <p1>{dailyJoke.content}</p1>

    <button disabled={isOpenCreateForm || !(updatingID === null)} onClick={() => setIsOpenCreateForm(true)}>Добавить анекдот</button>

    {isOpenCreateForm && (
      <>
       <textarea 
        value={jokeText}
        onChange={(e) => setJokeText(e.target.value)}
       />
      <button disabled={jokeText.trim() === ''} onClick={() => {createJoke(jokeText); setIsOpenCreateForm(false);}}>Подтвердить</button>
      <button onClick={() => {setJokeText(''); setIsOpenCreateForm(false);}}>Отмена</button>
      </>
    )}
    {jokes.map(joke => (
      <div key={joke.id}>{joke.content}
        {updatingID === joke.id ? (
          <>
            <textarea 
              value={newJokeText}
              onChange={(e) => setNewJokeText(e.target.value)}
            />
            <button disabled={newJokeText.trim() === ''} onClick={() => updateJoke(joke.id, newJokeText)}>Подтвердить</button>
            <button onClick={() => {setUpdatingID(null); setNewJokeText('')}}>Отмена</button>
          </>
        ) : (
          <>
            <button disabled={isOpenCreateForm || !(updatingID === null)} onClick={() => {setUpdatingID(joke.id); setNewJokeText(joke.content)}}>Изменить</button>
            <button disabled={isOpenCreateForm || !(updatingID === null)} onClick={() => deleteJoke(joke.id)}>Удалить</button>
          </>
        )}
      </div>
    ))}
  </div>
)
}

export default StartPage