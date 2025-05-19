import pool from './db.js'
import path from 'path'
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

class Controller 
{
    async ping(req, res)
    {
        res.status(200).json('ОТСОСИ БЛЯ')
    }
    getJokeOfDay(req, res)
    {
        const today = new Date()
        day = today.getDay()
        res.json(day)
    }
    async getAllJokes(req, res) 
    {
        const joke = await pool.query(`SELECT * FROM jokes`)
        res.json(joke)
    }
    async createJoke(req, res)
    {
        try 
        {
            const {content} = req.body
            const joke = await pool.query(`INSERT INTO jokes (content) values($1) RETURNING *`, [content])
            res.json(joke.rows[0])
        } 
        catch (err) 
        {
            console.error("Ошибка базы данных:", err)
            res.status(500).json({ error: "Внутренняя ошибка сервера" })
        }
    }
    async getJoke(req, res)
    {
        try 
        {
            const id = req.params.id
            const joke = await pool.query(`SELECT * FROM jokes where id = $1`, [id])
            if (!joke.rows[0]) res.status(404).json({ error: "Анекдот не найден" })
            res.json(joke.rows[0])
        } 
        catch (err) 
        {
            console.error("Ошибка базы данных:", err)
            res.status(500).json({ error: "Внутренняя ошибка сервера" })
        }
    }
    async updateJoke(req, res)
    {
        try 
        {
            const id = req.params.id
            const {content} = req.body
            const joke = await pool.query(`UPDATE jokes set content = $1 where id = $2 RETURNING *`, [content, id])
            if (!joke.rows[0]) res.status(404).json({ error: "Анекдот не найден" })
            res.json(joke.rows[0])
        } 
        catch (err) 
        {
            console.error("Ошибка базы данных:", err)
            res.status(500).json({ error: "Внутренняя ошибка сервера" })
        }
    }
    async deleteJoke(req, res)
    {
        try 
        {
            const id = req.params.id
            const joke = await pool.query(`DELETE FROM jokes where id = $1 RETURNING *`, [id])
            if (!joke.rows[0]) res.status(404).json({ error: "Анекдот не найден" })
            res.json(joke.rows[0])
        } 
        catch 
        {
            console.error("Ошибка базы данных:", err)
            res.status(500).json({ error: "Внутренняя ошибка сервера" })
        }
    }
}

const contr = new Controller()

export default contr