import express from 'express';
import router from './routes';
import session from 'express-session';
import cookieParser from 'cookie-parser';
import database from './config/database';
import options from './config/session';
import 'dotenv/config';
import { errorMiddleware, notFound } from './middleware';

const app = express();

app.use(session(options));

app.use(express.json());
app.use(cookieParser());

app.use('/api/v1', router);

app.all('*', notFound);
app.use(errorMiddleware);

app.listen(process.env.PORT, async () => {
  console.log(`Server running on port ${process.env.PORT}`);
  await database();
});