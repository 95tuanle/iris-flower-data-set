import express from 'express'
import helmet from 'helmet'
import cors from 'cors'
import logger from 'morgan'
import irisRouter from './routers/iris-router'

const app = express()
app.use(helmet())
app.use(cors())
app.use(logger('dev'))
app.use(express.json())

app.get('/', (req, res) =>
  res.send(
    'Iris API is running! 🌺 🌼 🌸 🌻 🌹 🌷 🌱 🌲 🌳 🌴 🌵 🌾 🌿 🍀 🍁 🍂 🍃 🍄 🌰',
  ),
)

app.use('/api/v1/iris', irisRouter)

app.use((req, res) => res.status(404).send('Not found'))

export default app
