import { Router } from 'express'
import homeController from '../controllers/homeController'

const router = Router()

router.get('/', homeController.getTopics)
router.post('/', homeController.createTopic)
router.get('/hellow', (req, res) => {
  res.send({ message: 'hellow' })
})

export default router
