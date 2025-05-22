import { Router } from "express"
import contr from "./controller.js"

const router = new Router()

router.get('/', contr.getAllJokes)
router.post('/jokes', contr.createJoke)
router.put('/jokes/:id', contr.updateJoke)
router.delete('/jokes/:id', contr.deleteJoke)

export default router