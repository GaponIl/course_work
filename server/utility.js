import pool from './db.js'
import schedule from 'node-schedule'

let dailyJoke = null

const initializeDailyJoke = async () => {
    try {
        const { rows } = await pool.query(`SELECT * FROM jokes ORDER BY RANDOM() LIMIT 1`)
        dailyJoke = rows[0]
    } catch (error) {
        console.error(error)
    }
};

schedule.scheduleJob('0 0 * * *', async () => {
    try {
        const { rows } = await pool.query(`SELECT * FROM jokes ORDER BY RANDOM() LIMIT 1`)
        dailyJoke = rows[0]
        console.log('Daily joke updated:', new Date())
    } catch (error) {
        console.error('Error updating daily joke:', error)
    }
});

initializeDailyJoke()

export { dailyJoke }