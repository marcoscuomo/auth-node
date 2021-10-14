import { container } from 'tsyringe';

import './providers';

import { IUserRepository } from '@modules/users/repositories/IUserRepository';
import { UserRepository } from '@modules/users/infra/typeorm/repositories/UserRepository';

container.registerSingleton<IUserRepository>(
  'UserRepository',
  UserRepository
);