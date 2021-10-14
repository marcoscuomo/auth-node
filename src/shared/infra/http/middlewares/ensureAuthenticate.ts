import auth from "@config/auth";
import { UserRepository } from "@modules/users/infra/typeorm/repositories/UserRepository";
import { AppError } from "@shared/errors/AppErrors";
import { messages } from "@utils/messages/messages-pt_BR";
import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

type PayLoadType = {
  sub: string;
}

async function ensureAuthenticate(request: Request, response: Response, next: NextFunction) {
  
  const authHeader = request.headers.authorization;

  if(!authHeader){
    throw new AppError(messages.errors.tokenIsMissing, 401);
  }

  const userRepository = new UserRepository();
  const [, token] = authHeader.split(' ');

  try {
    const { sub: userId } = verify(token, auth.secreat_token) as PayLoadType;
    return next();
    
    const user = await userRepository.findById(userId);

    if(!user) {
      throw new AppError(messages.errors.userDoesNotExists, 401);
    }

    request.user = { id: userId };

    return next();

  } catch(err) {
    throw new AppError(err, 401);
  }

}

export { ensureAuthenticate }