import { Request, Response } from 'express'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

class TopicController {
  async deleteTopic(req: Request, res: Response) {
    const topicId = parseInt(req.params.id)

    try {
      const deletedTopic = await prisma.topic.delete({
        where: {
          id: topicId,
        },
      })

      return res.json({
        message: 'Topic deleted successfully',
        topic: deletedTopic,
      })
    } catch (error) {
      console.error('Error deleting topic:', error)
      return res
        .status(500)
        .json({ error: 'An error occurred while deleting the topic.' })
    }
  }

  async updateTopic(req: Request, res: Response) {
    const topicId = parseInt(req.params.id)
    const { title } = req.body

    try {
      const updatedTopic = await prisma.topic.update({
        where: {
          id: topicId,
        },
        data: {
          title,
        },
      })

      return res.json({
        message: 'Topic updated successfully',
        topic: updatedTopic,
      })
    } catch (error) {
      console.error('Error updating topic:', error)
      return res
        .status(500)
        .json({ error: 'An error occurred while updating the topic.' })
    }
  }
}

export default new TopicController()
