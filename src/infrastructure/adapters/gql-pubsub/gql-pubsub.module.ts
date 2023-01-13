import { Global, Module } from '@nestjs/common';
import { PubSub } from 'graphql-subscriptions';
import { InjectTokens } from '@src/infrastructure/types/inject-tokens';

@Global()
@Module({
  providers: [
    {
      provide: InjectTokens.GqlPubSub,
      useClass: PubSub,
    },
  ],
  exports: [
    {
      provide: InjectTokens.GqlPubSub,
      useClass: PubSub,
    },
  ],
})
export class GqlPubSubModule {}
