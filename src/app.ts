import express from 'express'
import helmet from 'helmet'
import cors from 'cors'
import logger from 'morgan'
import swaggerUi from 'swagger-ui-express'
import swaggerJsdoc from 'swagger-jsdoc'
import irisRouter from './routers/iris-router'

const specs = swaggerJsdoc({
  definition: {
    openapi: '3.1.0',
    info: {
      title: 'Iris API',
      version: '1.0.0',
      description: 'An API for Iris data',
    },
    servers: [
      {
        url: 'http://localhost:3000',
      },
    ],
  },
  apis: ['./src/routers/*.ts'],
})

const app = express()
app.use(helmet())
app.use(cors())
app.use(logger('dev'))
app.use(express.json())
app.get('/', (req, res) => res.send('Iris API <a href="/docs">Docs</a'))
app.use('/docs', swaggerUi.serve, swaggerUi.setup(specs))
app.use('/api/v1/iris', irisRouter)

app.use((req, res) => res.status(404).send('Not found'))

export default app
