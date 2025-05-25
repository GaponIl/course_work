import React, { useState, useEffect } from 'react'
import api from '../API/mainAPI'
import Header from '../components/Header.jsx'
import Form from '../components/Form.jsx'
import Button from '../components/Button.jsx'
import '../style/StartPage.css'

function StartPage({ dailyJoke, setDaily, jokes, setJokes, fetchJokes, user, setUser }) {
  const [isOpenCreateForm, setIsOpenCreateForm] = useState(false)
  const [jokeText, setJokeText] = useState('')
  const [updatingID, setUpdatingID] = useState(null)
  const [newJokeText, setNewJokeText] = useState('')
  const MAX_LENGTH = 512

  const createJoke = async (jokeText) => {
    try {
      if (jokeText.length > MAX_LENGTH) {
        alert(`Внимание! Превышена максимальная длина. Максимум ${MAX_LENGTH} символов`)
        setJokeText('')
      }
      const response = await api.createJoke(jokeText)
      setJokes(prev => [response, ...prev])
      console.log(response)
      setJokeText('')
    } catch (error) {
      console.error(error)
    }
  }

  const updateJoke = async (id, text) => {
    try {
      if (newJokeText.length > MAX_LENGTH) {
        alert(`Внимание! Превышена максимальная длина. Максимум ${MAX_LENGTH} символов`)
        setUpdatingID(null)
        setNewJokeText('')
      }
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

      <Header user={user} setUser={setUser} />

      {dailyJoke && (
        <div className="dailyJoke" id={dailyJoke.id}>
          <div className="dailyJoke-content">
            <h1>{dailyJoke.content}</h1>
          </div>
        </div>
      )}

      <div className='container'>
        {user?.role === 'admin' ? (
          <Button type='createButton' disabled={isOpenCreateForm || !(updatingID === null)} onClick={() => setIsOpenCreateForm(true)}></Button>
        ) : (
          <></>
        )}
      </div>

      {isOpenCreateForm && (
        <Form title='Добавить анекдот'>
          <textarea
            value={jokeText}
            onChange={(e) => setJokeText(e.target.value)}
          />
          <div className="char-counter">
            {jokeText.length}/{MAX_LENGTH}
          </div>
          <div className='forms-buttons'>
            <Button type='addButton' disabled={jokeText.trim() === ''} onClick={() => { createJoke(jokeText); setIsOpenCreateForm(false); }}>Подтвердить</Button>
            <Button type='returnButton' onClick={() => { setJokeText(''); setIsOpenCreateForm(false); }}>Отмена</Button>
          </div>
        </Form>
      )}
      {jokes.map(joke => (
        <div className='joke' key={joke.id}>
          <div className='joke-content'>
            {joke.content}
            {updatingID === joke.id ? (
              <Form title='Измените анекдот'>
                <textarea className='joke-edit-textarea'
                  value={newJokeText}
                  onChange={(e) => setNewJokeText(e.target.value)}
                  autoFocus
                />
                <div>
                  <div className="char-counter">
                    {newJokeText.length}/{MAX_LENGTH}
                  </div>
                  <div>
                    <Button type='addButton' disabled={newJokeText.trim() === ''} onClick={() => updateJoke(joke.id, newJokeText)}>Подтвердить</Button>
                    <Button type='returnButton' onClick={() => { setUpdatingID(null); setNewJokeText('') }}>Отмена</Button>
                  </div>
                </div>
              </Form>
            ) : (
              <div className='joke-content'>
                {user?.role === 'admin' && (
                  <div className='updateDelete-button'>
                    <Button type='updateButton' disabled={isOpenCreateForm || !(updatingID === null)} onClick={() => { setUpdatingID(joke.id); setNewJokeText(joke.content) }}></Button>
                    <Button type='deleteButton' disabled={isOpenCreateForm || !(updatingID === null)} onClick={() => deleteJoke(joke.id)}></Button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}

export default StartPage