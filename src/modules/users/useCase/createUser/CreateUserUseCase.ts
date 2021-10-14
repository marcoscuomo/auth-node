import { inject, injectable } from "tsyringe";
import { hash } from 'bcryptjs';

import { AppError } from "@shared/errors/AppErrors";
import { messages } from "@utils/messages/messages-pt_BR";
import { ICreateUserDTO } from "@modules/users/dtos/ICreateUserDTO";
import { IUserRepository } from "@modules/users/repositories/IUserRepository";

@injectable()
class CreateUserUseCase {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository
  ){}

  async execute({name, email, password}: ICreateUserDTO): Promise<void> {
    const alreadyUser = await this.userRepository.findByEmail(email);

    if(alreadyUser) {
      throw new AppError(messages.errors.userAlreadyExists, 401);
    }

    const passwordHash = await hash(password, 8);

    await this.userRepository.create({name, email, password: passwordHash});
  }
}

export { CreateUserUseCase }