import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function StartPage() {
  const [jokes, setJokes] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [text, setText] = useState('');
  const [updatedText, setUpdatedText] = useState('');
  const [updatingId, setUpdatingId] = useState(null);
  const [isUpdating, setIsUpdating] = useState(false);
  const navigate = useNavigate()
  
  useEffect(() => {
    const fetchJokes = async () => {
      try {
        const response = await axios.get('http://localhost:8080/');
        setJokes(response.data.rows);
      } catch (error) {
        console.error('Ошибка загрузки:', error);
      }
    };
    fetchJokes();
  }, []);

  const addJoke = async () => {
    if (text.trim() === "") {
      alert("Введите текст шутки!");
      return;
    }

    try {
      const response = await axios.post('http://localhost:8080/jokes', { content: text });
      setJokes(prev => [...prev, response.data]);
      setText('');
    } catch (error) {
      console.error('Ошибка:', error.response?.data || error.message);
    }
  };

  const deleteJoke = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/jokes/${id}`);
      setJokes(prev => prev.filter(joke => joke.id !== id));
    } catch (error) {
      console.error('Ошибка:', error.response?.data || error.message);
    }
  };

  const updateJoke = async () => {
    try {
      setIsUpdating(true);
      const response = await axios.put(`http://localhost:8080/jokes/${updatingId}`, { content: updatedText });
      setJokes(jokes.map(joke => 
        joke.id === updatingId ? response.data : joke
      ));
      setUpdatingId(null);
      setUpdatedText('');
    } catch (error) {
      console.error('Ошибка:', error.response?.data || error.message);
    } finally {
      setIsUpdating(false);
    }
  };

  const dateToday = async () => {
    const response = await axios.get(`http://localhost:8080/jokeofday`)
    console.log(response.data)
  }

  return (
    <div>
      <button onClick={() => navigate('/information')}>
        Информация об авторе
      </button>
      <button onClick={() => dateToday()}>Анекдот дня</button>
      {!isOpen && (
        <button disabled={updatingId !== null} onClick={() => setIsOpen(true)}>Добавить шутку</button>
      )}

      {isOpen && (
        <div>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Введите шутку"
          />
          <button 
            disabled={text.trim() === ""} 
            onClick={async () => {
              await addJoke();
              setIsOpen(false);
            }}
          >
            Подтвердить
          </button>
          <button onClick={() => {
            setText('');
            setIsOpen(false);
          }}>
            Отмена
          </button>
        </div>
      )}

      <div>
        {jokes.map((joke) => (
          <div key={joke.id}>
            {joke.content}
            <button disabled={isOpen || updatingId !== null} onClick={() => deleteJoke(joke.id)}>Удалить</button>
            
            {updatingId === joke.id ? (
              <>
                <textarea
                  value={updatedText}
                  onChange={(e) => setUpdatedText(e.target.value)}
                  disabled={isUpdating}
                />
                <button 
                  onClick={updateJoke} 
                  disabled={isUpdating || updatedText.trim() === ""}
                >
                  {isUpdating ? "Сохранение..." : "Сохранить"}
                </button>
                <button 
                  onClick={() => {
                    setUpdatingId(null);
                    setUpdatedText('');
                  }}
                  disabled={isUpdating}
                >
                  Отмена
                </button>
              </>
            ) : (
              <button 
                onClick={() => {
                  setUpdatingId(joke.id);
                  setUpdatedText(joke.content)
                }}
                disabled={updatingId !== null || isOpen}
              >
                Изменить
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default StartPage;