import { Request, Response } from 'express'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

class HomeController {
  async getTopics(req: Request, res: Response) {
    try {
      const topics = await prisma.topic.findMany()
      res.json(topics)
    } catch (error) {
      console.error('Error fetching topics:', error)
      res
        .status(500)
        .json({ error: 'An error occurred while fetching topics.' })
    }
  }

  async createTopic(req: Request, res: Response) {
    try {
      const { title, parentId } = req.body

      const newTopic = await prisma.topic.create({
        data: {
          title,
          parentId,
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
}

export default new HomeController()
