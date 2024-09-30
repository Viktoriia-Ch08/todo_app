import express, { Express, NextFunction, Request, Response } from 'express';
import 'dotenv/config';
import bodyParser from 'body-parser';
import cors from 'cors';

import AppRouter from './routes';
import { ResponseError } from './types/todos.type';

const { PORT = 3030 } = process.env;
export const app: Express = express();
const router = new AppRouter(app);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
router.init();

app.use((err: ResponseError, _: Request, res: Response, __: NextFunction) => {
	const { status = 500, message = 'Server error' } = err;
	res.status(status).json({ message });
});

app.listen(PORT, () => {
	console.log(`Now listening on port ${PORT}`);
});
