import pool from './db.js'
import path from 'node:path';
import { fileURLToPath } from 'url'
import fs from 'node:fs/promises'

import jwt from 'jsonwebtoken' //JWT
import consts from "./consts.js";
import bcrypt from 'bcryptjs'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const FILE_PATH = path.join(__dirname, 'dailyJoke.json'); //Путь для файла dailyJoke.json

async function getDailyJoke() {
    try {
        const data = await fs.readFile(FILE_PATH, 'utf-8');
        return JSON.parse(data);
    } catch (err) {
        if (err.code === 'ENOENT') {
            console.log('Файл dailyJoke.json не найден.');
            return null;
        }
        console.error('Ошибка при чтении файла:', err);
        return null;
    }
}

function checkAuth(req) {
    try {
        const token = req?.cookies?.jwt;
        
        if (!token) {
            return { status: "error", content: "nonAuthorized" };
        }
        
        try {
            const user = jwt.verify(token, consts.JWT_SECRET);
            return { status: "success", content: user };
        } catch (err) {
            return { status: "error", content: "someError" };
        }
    } catch (error) {
        console.error(error);
        return { status: "error", content: "someError" };
    }
}


class Controller {

    async me(req, res) {
        try {
            const authCheck = checkAuth(req);
            if (authCheck.status === "error") {
                res.send({ status: "error", content: authCheck.content });
            }
            else {
                const user = await pool.query('SELECT id, username, email, role FROM users WHERE id = $1', [authCheck.content.id]);
                res.send({ status: "success", content: user.rows[0] });
            }
        } catch (error) {
            console.error(error);
            res.status(500).send({ status: "error", content: "Внутренняя ошибка сервера" });
        }
    }

    async signUp(req, res) {
        try {
            const authCheck = checkAuth(req);
            
            if (authCheck.status === "error" && authCheck.content !== "nonAuthorized") {
                res.send({ status: "error", content: authCheck.content });
            }
            else if (authCheck.status === "error" && authCheck.content === "nonAuthorized") {
                try {
                    const { username, email, password } = req.body;
                    const hashedPassword = await bcrypt.hash(password, 10);
                    
                    const role = 'user';
                    const result = await pool.query(
                        'INSERT INTO users (username, email, password, role) VALUES ($1, $2, $3, $4) RETURNING *',
                        [username, email, hashedPassword, role]
                    );

                    const token = jwt.sign(
                        { id: result.rows[0].id, email: result.rows[0].email },
                        consts.JWT_SECRET,
                        { expiresIn: '30d' }
                    );

                    res.cookie('jwt', token, {
                        httpOnly: true,
                        maxAge: 3600000 * 24 * 30, // 1 Месяц
                    });

                    res.status(201).send({ status: "success", content: result.rows[0] });
                } catch (err) {
                    console.log(err);
                    
                    res.status(500).send({ status: "error", content: err.message });
                }
            }
            else {
                const user = await pool.query('SELECT id, username, email, role FROM users WHERE id = $1', [authCheck.content.id]);
                res.send({ status: "success", content: user.rows[0] });
            }
        } catch (error) {
            console.error(error);
            res.status(500).send({ status: "error", content: "Внутренняя ошибка сервера" });
        }
    }

    async signIn(req, res) {
        try {
            const authCheck = checkAuth(req);
            
            if (authCheck.status === "error" && authCheck.content !== "nonAuthorized") {
                res.send({ status: "error", content: authCheck.content });
            }
            else if (authCheck.status === "error" && authCheck.content === "nonAuthorized") {
                try {
                    const { email, password } = req.body;

                    const user = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
                    if (user.rows.length === 0) return res.status(401).send({ status: "error", content: 'Пользователь не найден' });

                    const validPassword = await bcrypt.compare(password, user.rows[0].password);
                    if (!validPassword) return res.status(401).send({ status: "error", content: 'Неправильный пароль' });

                    const token = jwt.sign(
                        { id: user.rows[0].id, email: user.rows[0].email },
                        consts.JWT_SECRET,
                        { expiresIn: '30d' }
                    );

                    res.cookie('jwt', token, {
                        httpOnly: true,
                        maxAge: 3600000 * 24 * 30, // 1 Месяц
                    });

                    const authUser = await pool.query('SELECT id, username, email, role FROM users WHERE id = $1', [user.rows[0].id]);
                    res.status(201).send({ status: "success", content: authUser.rows[0] });
                } catch (err) {
                    console.log(err);
                    
                    res.status(500).send({ status: "error", content: err.message });
                }
            }
            else {
                const user = await pool.query('SELECT id, username, email, role FROM users WHERE id = $1', [authCheck.content.id]);
                res.send({ status: "success", content: user.rows[0] });
            }
        } catch (error) {
            console.error(error);
            res.status(500).send({ status: "error", content: "Внутренняя ошибка сервера" });
        }
    }

    async signOut(req, res) {
        res.clearCookie('jwt');
        res.status(200).send({ status: "success", content: 'Успешный выход из профиля' });
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

    async getDayJoke(req, res) {
        try {
            res.json(await getDailyJoke())
        } catch (error) {
            console.error(error)
        }
    }

    async createJoke(req, res) {
        try {
            const { content } = req.body
            const response = await pool.query(`INSERT INTO jokes (content) values($1) RETURNING *`, [content])
            res.json(response)
        } catch (error) {
            console.error(error)
        }
    }

    async updateJoke(req, res) {
        try {
            const id = req.params.id
            const { content } = req.body
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
}

const contr = new Controller()

export default contr