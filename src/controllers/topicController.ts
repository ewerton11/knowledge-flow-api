import { Request, Response } from 'express'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

class TopicController {
  async createTopic(req: Request, res: Response) {
    try {
      const { title, parentId } = req.body

      const newTopic = await prisma.topic.create({
        data: {
          title,
          parentId,
          createdAt: new Date(),
          isChecked: false,
        },
      })

      res.status(201).json(newTopic)
    } catch (error) {
      console.error('Error creating topic:', error)
      res
        .status(500)
        .json({ error: 'An error occurred while creating the topic.' })
    }
  }

  async getTopicsId(req: Request, res: Response) {
    //Busca os topicos, porem como vai começar com valor vazio, retornará todos
    const topicId = parseInt(req.params.id)

    try {
      const topic = await prisma.topic.findUnique({
        where: {
          id: topicId,
        },
      })

      if (!topic) {
        return res.status(404).json({ error: 'Topic not found' })
      }

      return res.status(200).json(topic)
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' })
    }
  }

  async getTopics(req: Request, res: Response) {
    try {
      const topics = await prisma.topic.findMany({
        where: {
          parentId: null, // Filtra apenas os tópicos pai (sem parentId)
        },
      })

      return res.json(topics)
    } catch (error) {
      console.error('Error fetching topics:', error)
      return res
        .status(500)
        .json({ error: 'An error occurred while fetching topics.' })
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
}

export default new TopicController()
