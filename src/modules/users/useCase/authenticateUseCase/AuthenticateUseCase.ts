import { IUserRepository } from "@modules/users/repositories/IUserRepository";
import { compare } from "bcryptjs";
import { inject, injectable } from "tsyringe";
import { sign } from 'jsonwebtoken';

import { AppError } from "@shared/errors/AppErrors";
import { messages } from "@utils/messages/messages-pt_BR";
import auth from '@config/auth';
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  user: {
    name: string;
    email: string
  },
  token: string;
  refreshToken: string;
  profile: string[];
}

@injectable()
class AuthenticateUseCase {

  constructor(
    @inject("UserRepository")
    private userRepository: IUserRepository,

    @inject("DayJsProvider")
    private dayProvider: IDateProvider
  ){}
  
  async execute({email, password}: IRequest) {
    const user = await this.userRepository.findByEmail(email);

    if(!user) {
      throw new AppError(messages.errors.emailOrPasswordDoesNotExist, 401);
    }

    const passwordMatch = await compare(password, (await user).password);

    if(!passwordMatch) {
      throw new AppError(messages.errors.emailOrPasswordIncorrect, 401)
    }

    const token = sign({}, auth.secreat_token, {
      subject: (await user).id,
      expiresIn: auth.expires_in_token
    });

    const refreshToken = sign({ email }, auth.secreate_refresh_token, {
      subject: (await user).id,
      expiresIn: auth.expires_in_refresh_token
    });

    const refreshTokenExpiresDate = this.dayProvider.addDays(auth.expires_refresh_token_days);

    await this.userRepository.updateToken(refreshToken, refreshTokenExpiresDate, (await user).id);

    const returnToken: IResponse = {
      user: {
        name: (await user).name,
        email: (await user).email
      },
      token,
      refreshToken,
      profile: ['administrator']
    }
    
    return returnToken;

  }

}

export { AuthenticateUseCase }