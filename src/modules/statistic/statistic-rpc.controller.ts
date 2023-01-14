import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';

@Controller()
export class StatisticRpcController {

  @GrpcMethod()
  public async collectStatistic(dto: { ip: string }): Promise<{ ip: string }> {
    const res = await Promise.resolve(dto);
    return res;
  }

}
