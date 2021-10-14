import { Router } from 'express';

import { CreateUserController } from '@modules/users/useCase/createUser/CreateUserController';
import { AuthenticateController } from '@modules/users/useCase/authenticateUseCase/AuthenticateController';
import { RefreshtokenController } from '@modules/users/useCase/refreshToken/RefreshTokenController';

const userRouter = Router();

const createUserController = new CreateUserController();
const authenticateController = new AuthenticateController();
const refreshTokenController = new RefreshtokenController();

userRouter.post('/create', createUserController.handle);
userRouter.post('/login', authenticateController.handle);
userRouter.post('/refresh', refreshTokenController.handle);


export { userRouter }