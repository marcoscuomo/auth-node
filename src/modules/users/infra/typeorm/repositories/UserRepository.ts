import { ICreateUserDTO } from "@modules/users/dtos/ICreateUserDTO";
import { IUserRepository } from "@modules/users/repositories/IUserRepository";
import { getRepository, Repository } from "typeorm"
import { User } from "../entities/User"

class UserRepository implements IUserRepository {

  private repository: Repository<User>;

  constructor() {
    this.repository = getRepository(User);
  }
  
  async create({ name, email, password }: ICreateUserDTO): Promise<void> {
    const user = this.repository.create({name, email, password});

    await this.repository.save(user);
  }
  
  async findByEmail(email: string): Promise<User> {
    return this.repository.findOne({email});
  }

  async findById(id: string): Promise<User> {
    return this.repository.findOne({id});
  }

  async updateToken(refreshToken: string, expireDate: Date, userId: string): Promise<void> {
    const user = await this.findById(userId);

    user.refreshToken = refreshToken;
    user.expireDateToken = expireDate;

    await this.repository.save(user);
  }
  
}

export { UserRepository }