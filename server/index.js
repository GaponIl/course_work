import express from 'express'
import router from './router.js'
import bodyParser from 'body-parser' // middleware, который парсит тело HTTP-запросов
import cors from 'cors'
import cookieParser from 'cookie-parser';
import consts from './consts.js';
import schedule from 'node-schedule' // Установка расписания скрипта
import pool from './db.js' //Берем pull бд

import { fileURLToPath } from 'node:url'; 
import path from 'node:path';
import fs from 'node:fs/promises'; // Получение пути к папке (проблемно из-за работы в ES модулях)

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const FILE_PATH = path.join(__dirname, 'dailyJoke.json'); //Путь для файла dailyJoke.json
 
async function saveDaily(dailyJoke) {
    try {
        await fs.writeFile(FILE_PATH, JSON.stringify(dailyJoke, null, 2)); //Записываем в файл шутку дня
        console.log('Шутка успешно сохранена!');
    } catch (error) {
        console.error('Ошибка при записи файла:', err);
    }
}
schedule.scheduleJob('0 0 * * *', async () => {
    let dailyJoke
    try {
        const { rows } = await pool.query(`SELECT * FROM jokes ORDER BY RANDOM() LIMIT 1`) // Получаем шутку
        dailyJoke = rows[0]
        await saveDaily(dailyJoke) //Сохраняем
    } catch (error) {
        console.error('Не получилось получить шутку дня:', error)
    }
});

const app = express()

app.use(cors({
    origin: consts.CLIENT_URL, // фронтенд-домен
    credentials: true // это ключевой параметр
  }));
app.use(bodyParser.json()) // подключает middleware body-parser для парсинга JSON-данных из тела HTTP-запроса (возможно, можно обойтись без bodyParser, а исопльзовать express.json() для новых версий)
app.use(cookieParser())
app.use(router)

app.listen(consts.PORT, () => {
    console.log('Сервер запущен');
})