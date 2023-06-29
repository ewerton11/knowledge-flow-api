import { Router } from 'express'
import childTopicController from '../controllers/childTopicController'
import topicController from '../controllers/topicController'

const router = Router()

router.post('/topics/create/topic', topicController.createTopic)
router.get('/topics', topicController.getTopics)
router.get('/topics/:id', topicController.getTopicsId)
router.put('/topics/:id', topicController.updateTopic)
router.delete('/topics/:id', topicController.deleteTopic)

router.post('/topics/create/child-topic', childTopicController.createChildTopic)
router.get('/topics/:id/child', childTopicController.getChildTopics)

router.get('/hellow', (req, res) => {
  res.send({ message: 'hellow' })
})

export default router
