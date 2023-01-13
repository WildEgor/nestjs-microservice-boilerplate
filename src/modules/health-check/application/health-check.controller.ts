import {
  Controller,
  Get,
} from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { ApiTags } from '@nestjs/swagger';
import { HealthCheckResult } from '@nestjs/terminus';
import {
  ResultFactory,
  ServiceResponseDto,
  ServiceResponseDtoBase,
} from '@wildegor/common.nodepack.boilerplate/modules/src/core/microservices';
import { ApiGetHealthCheck } from '@src/infrastructure/swagger/health-check/get-health-check.api';
import { HealthCheckQuery } from './query-cases/health-check.query';

@Controller('health-check')
@ApiTags('Health Check Controller')
export class HealthCheckController {

  // eslint-disable-next-line no-empty-function
  constructor(private readonly _queryBus: QueryBus) {}

  @ApiGetHealthCheck()
  @Get()
  public async healthCheck(): Promise<ServiceResponseDto<HealthCheckResult>> {
    const result: ServiceResponseDtoBase<HealthCheckResult> = await this._queryBus.execute(new HealthCheckQuery({}));
    return ResultFactory.resolveServiceResponse(result);
  }

}
