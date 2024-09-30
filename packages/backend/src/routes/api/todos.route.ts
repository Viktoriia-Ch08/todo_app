import { Router } from 'express';
import todoController from '../../controllers/todo.controller';
import { isExist } from '@/middlewares/isExist';
import { exceptionHandler } from '@/helpers/exceptionHandler';
import { TodoType } from '@/types/todos.type';
import { prisma } from '@/services/prisma.service';
import { validateBody } from '@/middlewares/validateBody';
import { postSchema } from '@/joi-schemas/todos/joi-post-schema';
import { putSchema } from '@/joi-schemas/todos/joi-put-schema';
import { isBodyEmpty } from '@/middlewares/isBodyEmpty';
import { jwtAuth } from '@/middlewares/auth/jwtAuth';
import { isExistAndBelongTo } from '@/middlewares/isExistAndBelonsTo';

const todosRouter: Router = Router();

todosRouter.get(
	'/all',
	jwtAuth,
	exceptionHandler(todoController.getAllTodo.bind(todoController)),
);
todosRouter.get(
	'/:id',
	jwtAuth,
	isExist<TodoType>(prisma.todoItem),
	exceptionHandler(todoController.getTodoById.bind(todoController)),
);
todosRouter.post(
	'/',
	isBodyEmpty,
	validateBody(postSchema),
	jwtAuth,
	exceptionHandler(todoController.addTodoItem.bind(todoController)),
);
todosRouter.put(
	'/:id',
	isBodyEmpty,
	validateBody(putSchema),
	jwtAuth,
	isExistAndBelongTo<TodoType>(prisma.todoItem, 'userId'),
	exceptionHandler(todoController.updateTodoItem.bind(todoController)),
);
todosRouter.delete(
	'/:id',
	jwtAuth,
	isExistAndBelongTo<TodoType>(prisma.todoItem, 'userId'),
	exceptionHandler(todoController.deleteTodoItem.bind(todoController)),
);

export default todosRouter;
