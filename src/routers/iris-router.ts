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
 * components:
 *   schemas:
 *     Iris:
 *       type: object
 *       required:
 *         - sepalLength
 *         - sepalWidth
 *         - petalLength
 *         - petalWidth
 *         - species
 *       properties:
 *         sepalLength:
 *           type: number
 *           description: The length of the sepal
 *         sepalWidth:
 *           type: number
 *           description: The width of the sepal
 *         petalLength:
 *           type: number
 *           description: The length of the petal
 *         petalWidth:
 *           type: number
 *           description: The width of the petal
 *         species:
 *           type: string
 *           description: The species of the Iris
 *           enum: [setosa, versicolor, virginica]
 */

/**
 * @swagger
 * /api/v1/iris:
 *   post:
 *     summary: Create new Iris data
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Iris'
 *     responses:
 *       200:
 *         description: The created Iris data
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Iris'
 *   get:
 *     summary: Retrieve all Iris data
 *     responses:
 *       200:
 *         description: A list of Iris data
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Iris'
 */
router.post('/', createIrisData)
router.get('/', getAllIrisData)

/**
 * @swagger
 * /api/v1/iris/{id}:
 *   get:
 *     summary: Retrieve Iris data by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the Iris data
 *     responses:
 *       200:
 *         description: The Iris data with the specified ID
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Iris'
 *   patch:
 *     summary: Update Iris data by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the Iris data
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Iris'
 *     responses:
 *       200:
 *         description: The updated Iris data
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Iris'
 *   delete:
 *     summary: Delete Iris data by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the Iris data
 *     responses:
 *       200:
 *         description: The deleted Iris data
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Iris'
 */
router.get('/:_id', getIrisDataById)
router.patch('/:_id', updateIrisData)
router.delete('/:_id', deleteIrisData)

export default router
