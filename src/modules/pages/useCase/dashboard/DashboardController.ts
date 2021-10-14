import { Request, Response } from "express";
import { container } from "tsyringe";
import { DashboardUseCase } from "./DashboardUseCase";

class DashboardController {

  async handle(request: Request, response: Response): Promise<Response> {

    const dashboardUseCase = container.resolve(DashboardUseCase);
    const dashboard = await dashboardUseCase.execute();

    return response.json(dashboard);
  }

}

export { DashboardController }