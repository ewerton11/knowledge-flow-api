import { Router } from 'express'
import homeController from '../controllers/homeController'

const router = Router()

router.get('/', homeController.getTopics)
router.get('/:id', homeController.getTopicsId)
router.post('/', homeController.createTopic)
// router.post('/test', homeController.createChildTopic)
router.get('/hellow', (req, res) => {
  res.send({ message: 'hellow' })
})

export default router
