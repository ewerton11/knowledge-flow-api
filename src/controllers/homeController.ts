import { Request, Response } from 'express'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

class HomeController {
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

  async getChildTopics(req: Request, res: Response) {
    const topicId = parseInt(req.params.id)

    try {
      const parentTopic = await prisma.topic.findUnique({
        where: {
          id: topicId,
        },
        include: {
          childTopics: true,
        },
      })

      if (!parentTopic) {
        return res.status(404).json({ error: 'Parent topic not found' })
      }

      const childTopics = parentTopic.childTopics

      res.status(200).json(childTopics)
    } catch (error) {
      console.error('Error fetching child topics:', error)
      return res
        .status(500)
        .json({ error: 'An error occurred while fetching child topics.' })
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

  async createChildTopic(req: Request, res: Response) {
    try {
      const { title, parentId } = req.body

      const parentTopic = await prisma.topic.findUnique({
        where: {
          id: parentId,
        },
      })

      if (parentTopic) {
        const newChildTopic = await prisma.topic.create({
          data: {
            title,
            parentId,
            createdAt: new Date(),
            isChecked: false,
          },
        })

        res.status(201).json(newChildTopic)
      } else {
        throw new Error('Parent topic not found.')
      }
    } catch (error) {
      console.error('Error creating child topic:', error)
      res
        .status(500)
        .json({ error: 'An error occurred while creating the child topic.' })
    }
  }
}

export default new HomeController()
