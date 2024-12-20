import { Router } from 'express'
import apiController from '../controller/apiController'
import rateLimit from '../middleware/rateLimit'

const router = Router()

router.route('/register').post(rateLimit, apiController.register)

router.route('/login').post(rateLimit, apiController.login)
export default router

