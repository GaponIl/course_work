import { Router } from "express"
import contr from "./controller.js"
import jwt from 'jsonwebtoken' //JWT
import consts from "./consts.js";


const router = new Router()

const authenticateToken = (req, res, next) => { //Мидлвара авторизации
  
  const token = req?.cookies?.jwt;
  
  if (!token) return res.sendStatus(401);
  
  jwt.verify(token, consts.JWT_SECRET, (err, user) => { //Сверяем токен, получаем данные
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

router.get('/', contr.getAllJokes)
router.get('/dayJoke', contr.getDayJoke)
router.post('/jokes', authenticateToken, contr.createJoke) //Подключили мидлвару на авторизацию
router.put('/jokes/:id', authenticateToken, contr.updateJoke)
router.delete('/jokes/:id', authenticateToken, contr.deleteJoke)

//Авторизация
router.get('/me', contr.me)
router.post('/signup', contr.signUp)
router.post('/signin', contr.signIn)
router.post('/signout', contr.signOut)

export default router