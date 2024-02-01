import dotenv from 'dotenv'
import { connect, connection } from 'mongoose'
import app from './app'

dotenv.config()

const initializeMongoDatabaseConnection = async (mongoDBURL: string) => {
  try {
    await connect(mongoDBURL)
    connection.on('error', (error) => console.log(error))
    const port = process.env.PORT || 3000
    app.listen(port, () =>
      console.log(`Server started at http://localhost:${port}`)
    )
  } catch (error) {
    console.error(error)
  }
}

if (
  !process.env.MONGODB_URI ||
  !process.env.MONGODB_DATABASE ||
  !process.env.MONGODB_PASSWORD
) {
  throw new Error('Missing environment variables for MongoDB connection')
} else {
  initializeMongoDatabaseConnection(
    process.env.MONGODB_URI.replace(
      '<password>',
      process.env.MONGODB_PASSWORD
    ).replace('<database>', process.env.MONGODB_DATABASE)
  ).then(() => console.log('Connected to MongoDB'))
}
