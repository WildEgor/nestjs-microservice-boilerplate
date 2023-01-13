import { ResultFactory } from '@wildegor/common.nodepack.boilerplate/modules/src/core/microservices';

export class ResponseFactory extends ResultFactory {

  public static toManyRequests(meta?: Record<string, unknown>) {
    return {
      ...(meta ? { ...meta } : {}),
      message: 'Too Many Requests',
      statusCode: 429,
    };
  }

}
