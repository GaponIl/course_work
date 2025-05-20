import pool from './db.js'
import path from 'path'
import { scheduler } from 'timers/promises'
import { fileURLToPath } from 'url'
import schedule from 'node-schedule'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

let dailyJoke = null

class Controller 
{
    constructor() {
        schedule.scheduleJob('0 0 * * *', async () => {
            try {
                const response = await pool.query(`SELECT * FROM jokes ORDER BY RANDOM() LIMIT 1`)
                dailyJoke = response
            } catch (error) {
                console.error(error)
            }
        })
    }
    async getAllJokes(req, res) {
        try {
            const response = await pool.query(`SELECT * FROM jokes`)
            res.json(response)
        } catch (error) {
            console.error(error)
        }
    }

    async getAllJokes(req, res) {
        try {
            const response = await pool.query(`SELECT * FROM jokes`)
            res.json(response)
        } catch (error) {
            console.error(error)
        }
    }

    async createJoke(req, res) {
        try {
            const {content} = req.body
            const response = await pool.query(`INSERT INTO jokes (content) values($1) RETURNING *`, [content])
            res.json(response)
        } catch (error) {
            console.error(error)
        }
    }

    async updateJoke(req, res) {
        try {
            const id = req.params.id
            const {content} = req.body
            const response = await pool.query(`UPDATE jokes set content = $1 where id = $2 RETURNING *`, [content, id])
            res.json(response)
        } catch (error) {
            console.error(error)
        }
    }

    async deleteJoke(req, res) {
        try { 
            const id = req.params.id
            const response = await pool.query(`DELETE FROM jokes where id = $1 RETURNING *`, [id])
            res.json(response.rows[0])
        } catch (error) {
            console.error(error)
        }
    }

    async getDailyJoke(req, res) {
        try {
            res.json(dailyJoke)
        } catch (error) {
            console.error
        }
    }
}

const contr = new Controller()

export default contr