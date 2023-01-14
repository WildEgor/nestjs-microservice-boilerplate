import { ContextType, createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { IIpData } from '@src/infrastructure/interfaces/statistic/ip-data.interface';

export const ExtractIpData = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): IIpData => {
    let request: any = null;
    if (ctx.getType<ContextType | 'graphql'>() === 'graphql') {
      const context = GqlExecutionContext.create(ctx).getContext();
      request = context?.req;
    }
    else {
      request = ctx.switchToHttp().getRequest();
    }

    const ip = request?.ip === '127.0.0.1' ? '188.130.155.158' : request?.ip;
    const agent = request?.headers['user-agent'];

    const geo = {
      ip,
      country: 'USA',
      city: 'Los-Angeles',
      timezone: '',
      ll: [0, 0],
      defaultLocale: 'EN',
      locales: ['en'],
    };
    const usedLanguage = 'en';

    return {
      ip,
      fullAgentName: agent,
      countryName: geo.country,
      cityName: geo.city,
      timezoneName: geo.timezone,
      latitude: geo.ll[0],
      longitude: geo.ll[1],
      locales: geo.locales,
      defaultLocale: geo.defaultLocale,
      languageCode: usedLanguage,
      isMobile: false,
    };
  },
);
