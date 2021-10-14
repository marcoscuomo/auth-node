import { injectable } from "tsyringe";

@injectable()
class DashboardUseCase {
  async execute() {
    return [
      {
        'Sales': '189',
        'Orders': '989',
        'Returns': '109',
        'Revocation': '89'
      }
    ];
  }

}

export { DashboardUseCase }