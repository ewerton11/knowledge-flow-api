import { Router } from 'express'
import homeController from '../controllers/homeController'
import topicController from '../controllers/topicController'

const router = Router()

router.get('/topics', homeController.getTopics)
router.get('/topics/:id/child', homeController.getChildTopics)
router.get('/topics/:id', homeController.getTopicsId)
router.post('/topics/create/topic', homeController.createTopic)
router.post('/topics/create/child-topic', homeController.createChildTopic)
router.delete('/topics/:id', topicController.deleteTopic)
router.get('/hellow', (req, res) => {
  res.send({ message: 'hellow' })
})

export default router
