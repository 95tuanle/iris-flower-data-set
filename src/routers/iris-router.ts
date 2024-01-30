import { Router } from 'express'
import {
  createIrisData,
  deleteIrisData,
  getAllIrisData,
  getIrisDataById,
  updateIrisData,
} from '../controllers/iris-controller'

const router = Router()

/**
 * @swagger
 * /api/v1/iris:
 *  post:
 *    summary: Create a new Iris data entry
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *        schema:
 *          $ref: '#/components/schemas/Iris'
 *    responses:
 *      200:
 *        description: The created Iris data entry
 */
router.post('/', createIrisData)

/**
 * @swagger
 * /api/v1/iris:
 *  get:
 *    summary: Get all Iris data entries
 *    responses:
 *      200:
 *        description: A list of Iris data entries
 */
router.get('/', getAllIrisData)

/**
 * @swagger
 * /api/v1/iris/{_id}:
 *  get:
 *    summary: Get an Iris data entry by its ID
 *    parameters:
 *      - in: path
 *        name: _id
 *        required: true
 *        schema:
 *          type: string
 *    responses:
 *      200:
 *        description: An Iris data entry
 */
router.get('/:_id', getIrisDataById)

/**
 * @swagger
 * /api/v1/iris/{_id}:
 *  patch:
 *    summary: Update an Iris data entry by its ID
 *    parameters:
 *      - in: path
 *        name: _id
 *        required: true
 *        schema:
 *          type: string
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *        schema:
 *          $ref: '#/components/schemas/Iris'
 *    responses:
 *      200:
 *        description: The updated Iris data entry
 */
router.patch('/:_id', updateIrisData)

/**
 * @swagger
 * /api/v1/iris/{_id}:
 *  delete:
 *    summary: Delete an Iris data entry by its ID
 *    parameters:
 *      - in: path
 *        name: _id
 *        required: true
 *        schema:
 *          type: string
 *    responses:
 *      200:
 *        description: The deleted Iris data entry
 */
router.delete('/:_id', deleteIrisData)

export default router
