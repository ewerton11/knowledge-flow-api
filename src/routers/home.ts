import { Router } from 'express'
import homeController from '../controllers/homeController'

const router = Router()

router.get('/topics', homeController.getTopics)
router.get('/topics/:id/child', homeController.getChildTopics)
router.get('/topics/:id', homeController.getTopicsId)
// router.post('/', homeController.createTopic)
// router.post('/test', homeController.createChildTopic)
router.get('/hellow', (req, res) => {
  res.send({ message: 'hellow' })
})

export default router
