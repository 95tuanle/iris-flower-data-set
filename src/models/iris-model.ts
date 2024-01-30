import mongoose from 'mongoose'

const { Schema } = mongoose

const irisSchema = new Schema({
  sepalLength: {
    type: Number,
    required: true,
    min: 0,
  },
  sepalWidth: {
    type: Number,
    required: true,
    min: 0,
  },
  petalLength: {
    type: Number,
    required: true,
    min: 0,
  },
  petalWidth: {
    type: Number,
    required: true,
    min: 0,
  },
  species: {
    type: String,
    required: true,
    enum: ['setosa', 'versicolor', 'virginica'],
  },
})

export default mongoose.model('Iris', irisSchema)
