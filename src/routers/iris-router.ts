import { Router } from 'express'
import {
  createIrisData,
  deleteIrisData,
  getAllIrisData,
  getIrisDataById,
  updateIrisData,
} from '../controllers/iris-controller'

const router = Router()

router.post('/', createIrisData)
router.get('/', getAllIrisData)
router.get('/:_id', getIrisDataById)
router.patch('/:_id', updateIrisData)
router.delete('/:_id', deleteIrisData)

export default router
