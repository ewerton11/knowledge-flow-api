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

  async getTopicsId(req: Request, res: Response) {
    const topicId = parseInt(req.params.id)

    try {
      const topic = await prisma.topic.findUnique({
        where: {
          id: topicId,
        },
      })

      if (topic) {
        res.status(200).json(topic)
      } else {
        res.status(404).json({ error: 'Topic not found' })
      }
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

  // async createChildTopic(req: Request, res: Response) {
  //   try {
  //     const { title, parentId } = req.body

  //     const parentTopic = await prisma.topic.findUnique({
  //       where: {
  //         id: parentId,
  //       },
  //     })

  //     if (parentTopic) {
  //       const newChildTopic = await prisma.topic.create({
  //         data: {
  //           title: title,
  //           parentId: parentId,
  //         },
  //       })

  //       res.status(201).json(newChildTopic)
  //     } else {
  //       res.status(404).json({ error: 'Parent topic not found' })
  //     }
  //   } catch (error) {
  //     console.error('Error creating child topic:', error)
  //     res
  //       .status(500)
  //       .json({ error: 'An error occurred while creating the child topic.' })
  //   }
  // }
}

export default new HomeController()
