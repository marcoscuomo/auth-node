import { Request, Response } from "express";
import { container } from "tsyringe";
import { RefreshTokenUseCase } from "./RefreshTokenUseCase";

class RefreshtokenController {

  async handle(request: Request, response: Response): Promise<Response> {

    const refreshToken = request.body.token || request.header['x-access-token'] || request.query.token;

    const refreshTokenUseUseCase = container.resolve(RefreshTokenUseCase);

    const newRefreshToken = await refreshTokenUseUseCase.execute(refreshToken);


    return response.json(newRefreshToken);
  }

}

export { RefreshtokenController }