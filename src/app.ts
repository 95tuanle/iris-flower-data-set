import express from 'express';
import helmet from "helmet";
import cors from "cors";
import logger from "morgan";

const app = express();
app.use(helmet());
app.use(cors());
app.use(logger('dev'));

app.get('/', (req, res) => res.send('Hello World!'));

app.use((req, res) => res.status(404).send("Not found"));

export default app;