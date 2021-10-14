import { sign, verify } from "jsonwebtoken";
import { inject, injectable } from "tsyringe";

import auth from "@config/auth";
import { IUserRepository } from "@modules/users/repositories/IUserRepository";
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";
import { AppError } from "@shared/errors/AppErrors";
import { messages } from "@utils/messages/messages-pt_BR";

type PayloadType = {
  sub: string;
  email: string;
}

type IResponse = {
  user: {
    name: string;
    email: string
  },
  token: string;
  newRefreshToken: string;
  profile: string[];
}

@injectable()
class RefreshTokenUseCase {

  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,

    @inject('DayJsProvider')
    private dayProvider: IDateProvider
  ){}

  async execute(refreshToken: string) {

    const { email, sub } = verify(refreshToken, auth.secreate_refresh_token) as PayloadType;

    const userId = sub;
    const user = await this.userRepository.findById(userId);

    if(!user) {
      throw new AppError(messages.errors.refreshTokenDoesNotExists, 401);
    }

    const token = sign({}, auth.secreat_token, {
      subject: (await user).id,
      expiresIn: auth.expires_in_token
    });

    const newRefreshToken = sign({ email }, auth.secreate_refresh_token, {
      subject: (await user).id,
      expiresIn: auth.expires_in_refresh_token
    });

    const refreshTokenExpiresDate = this.dayProvider.addDays(auth.expires_refresh_token_days);

    await this.userRepository.updateToken(refreshToken, refreshTokenExpiresDate, (await user).id);

    const returnNewToken: IResponse = {
      user: {
        name: (await user).name,
        email: (await user).email
      },
      token,
      newRefreshToken,
      profile: ['administrator']
    }

    return returnNewToken;
  }
}

export { RefreshTokenUseCase }