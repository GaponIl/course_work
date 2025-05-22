import React, { useState, useEffect } from 'react'
import api from '../API/mainAPI'
import Header from '../components/Header.jsx'
import Form from '../components/Form.jsx'
import Button from '../components/Button.jsx'
import '../style/StartPage.css'

function StartPage({dailyJoke, setDaily, jokes, setJokes, fetchJokes, user, setUser}) {
  const [isOpenCreateForm, setIsOpenCreateForm] = useState(false)
  const [jokeText, setJokeText] = useState('')
  const [updatingID, setUpdatingID] = useState(null)
  const [newJokeText, setNewJokeText] = useState('')

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

  useEffect(() => {
    console.log(dailyJoke);
   // eslint-disable-next-line
  }, [])

  return (
  <div className='startPage'>

    <Header user={user} setUser={setUser}/>
    <button disabled={isOpenCreateForm || !(updatingID === null)} onClick={() => setIsOpenCreateForm(true)}>Добавить анекдот</button>

    {dailyJoke && (
      <div className="dailyJoke" id={dailyJoke.id}>
        <div className="dailyJoke-content">
          <h1>{dailyJoke.content}</h1>
        </div>
      </div>
    )}


    {isOpenCreateForm && (
      <Form title='Добавить анекдот'>
       <textarea 
        value={jokeText}
        onChange={(e) => setJokeText(e.target.value)}
       />
      <div className='forms-buttons'>
        <Button type='addButton' disabled={jokeText.trim() === ''} onClick={() => {createJoke(jokeText); setIsOpenCreateForm(false);}}>Подтвердить</Button>
        <Button type='returnButton' onClick={() => {setJokeText(''); setIsOpenCreateForm(false);}}>Отмена</Button>
      </div>
      </Form>
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
          user?.role == "admin" ? (
            <>
              <button disabled={isOpenCreateForm || !(updatingID === null)} onClick={() => {setUpdatingID(joke.id); setNewJokeText(joke.content)}}>Изменить</button>
              <button disabled={isOpenCreateForm || !(updatingID === null)} onClick={() => deleteJoke(joke.id)}>Удалить</button>
            </>
          ) : (
            <></>
          )
        )}
      </div>
    ))}
  </div>
)
}

export default StartPage