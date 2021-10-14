import { Request, Response } from "express";
import { container } from "tsyringe";
import { AuthenticateUseCase } from "./AuthenticateUseCase";

class AuthenticateController {


  async handle(request: Request, response: Response) {

    const {email, password} = request.body;

    const authenticateUseCase = container.resolve(AuthenticateUseCase);

    const token = await authenticateUseCase.execute({email, password});

    return response.json(token);
  }

}

export { AuthenticateController }