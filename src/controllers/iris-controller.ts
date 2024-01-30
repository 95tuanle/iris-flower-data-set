import {Request, Response} from "express";
import {z} from "zod";
import IrisModel from "../models/iris-model";

const irisSchema = z.object({
  sepalLength: z.number().min(0),
  sepalWidth: z.number().min(0),
  petalLength: z.number().min(0),
  petalWidth: z.number().min(0),
  species: z.enum(['setosa', 'versicolor', 'virginica'])
});

const idSchema = z.object({
  _id: z.string().regex(/^[0-9a-fA-F]{24}$/)
});

export const createIrisData = async (req: Request, res: Response) => {
  try {
    res.json(await new IrisModel(irisSchema.parse(req.body)).save());
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
}

export const getAllIrisData = async (req: Request, res: Response) => {
  try {
    res.json(await IrisModel.find());
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
}

export const getIrisDataById = async (req: Request, res: Response) => {
  try {
    res.json(await IrisModel.findById(idSchema.parse(req.params)._id));
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
}

export const updateIrisData = async (req: Request, res: Response) => {
  try {
    res.json(await IrisModel.findByIdAndUpdate(idSchema.parse(req.params)._id, irisSchema.parse(req.body), {new: true}));
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
}

export const deleteIrisData = async (req: Request, res: Response) => {
  try {
    res.json(await IrisModel.findByIdAndDelete(idSchema.parse(req.params)._id));
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
}