import { Request, Response } from 'express'
import { z } from 'zod'
import IrisModel from '../models/iris-model'

const irisSchema = z.object({
  sepalLength: z.number().min(0),
  sepalWidth: z.number().min(0),
  petalLength: z.number().min(0),
  petalWidth: z.number().min(0),
  species: z.enum(['setosa', 'versicolor', 'virginica']),
})

const idSchema = z.object({
  _id: z.string().regex(/^[0-9a-fA-F]{24}$/),
})

const querySchema = z
  .object({
    limit: z.number().min(1),
    skip: z.number().min(0),
    sort: z.enum([
      'sepalLength',
      'sepalWidth',
      'petalLength',
      'petalWidth',
      'species',
    ]),
    order: z.enum(['asc', 'desc']),
  })
  .partial()

export const createIrisData = async (req: Request, res: Response) => {
  try {
    return res.json(await new IrisModel(irisSchema.parse(req.body)).save())
  } catch (error) {
    console.error(error)
    return res.status(500).json(error)
  }
}

export const getAllIrisData = async (req: Request, res: Response) => {
  try {
    const query = {
      ...req.query,
      limit: req.query.limit ? Number(req.query.limit) : undefined,
      skip: req.query.skip ? Number(req.query.skip) : undefined,
    }
    const validatedQuery = querySchema.parse(query)
    if (validatedQuery.limit && validatedQuery.skip) {
      return res.json(
        await IrisModel.find()
          .limit(validatedQuery.limit)
          .skip(validatedQuery.skip),
      )
    } else if (validatedQuery.limit) {
      return res.json(await IrisModel.find().limit(validatedQuery.limit))
    } else if (validatedQuery.skip) {
      return res.json(await IrisModel.find().skip(validatedQuery.skip))
    } else if (validatedQuery.sort && validatedQuery.order) {
      return res.json(
        await IrisModel.find().sort({
          [validatedQuery.sort]: validatedQuery.order,
        }),
      )
    } else if (validatedQuery.sort) {
      return res.json(
        await IrisModel.find().sort({ [validatedQuery.sort]: 'asc' }),
      )
    } else {
      return res.json(await IrisModel.find())
    }
  } catch (error) {
    console.error(error)
    return res.status(500).json(error)
  }
}

export const getIrisDataById = async (req: Request, res: Response) => {
  try {
    return res.json(await IrisModel.findById(idSchema.parse(req.params)._id))
  } catch (error) {
    console.error(error)
    return res.status(500).json(error)
  }
}

export const updateIrisData = async (req: Request, res: Response) => {
  try {
    return res.json(
      await IrisModel.findByIdAndUpdate(
        idSchema.parse(req.params)._id,
        irisSchema.parse(req.body),
        { new: true },
      ),
    )
  } catch (error) {
    console.error(error)
    return res.status(500).json(error)
  }
}

export const deleteIrisData = async (req: Request, res: Response) => {
  try {
    return res.json(
      await IrisModel.findByIdAndDelete(idSchema.parse(req.params)._id),
    )
  } catch (error) {
    console.error(error)
    return res.status(500).json(error)
  }
}
