import { Router } from "express"
import contr from "./controller.js"

const router = new Router()

router.get('/ping', contr.ping)
router.get('/jokeofday', contr.getJokeOfDay)
router.get('/', contr.getAllJokes)
router.post('/jokes', contr.createJoke)
router.get('/jokes/:id', contr.getJoke)
router.put('/jokes/:id', contr.updateJoke)
router.delete('/jokes/:id', contr.deleteJoke)

export default router
