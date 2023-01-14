import { applyDecorators, HttpStatus } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { UnavailableServiceResponseDoc } from '@src/infrastructure/dtos/unavailable-service-res.dto';

export const ApiGetHealthCheck = (): MethodDecorator => applyDecorators(
  ApiResponse({
    status: HttpStatus.OK,
    description: 'Health check passed',
  }),
  ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Service unavailable',
    type: () => UnavailableServiceResponseDoc,
  }),
);
