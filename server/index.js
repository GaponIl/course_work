import express from 'express'
import router from './router.js'
import bodyParser from 'body-parser' // middleware, который парсит тело HTTP-запросов
import cors from 'cors'

const app = express()

app.use(cors());
app.use(bodyParser.json()) // подключает middleware body-parser для парсинга JSON-данных из тела HTTP-запроса (возможно, можно обойтись без bodyParser, а исопльзовать express.json() для новых версий)
app.use(router)

app.listen(8080, () => {
    console.log('Сервер запущен');
})