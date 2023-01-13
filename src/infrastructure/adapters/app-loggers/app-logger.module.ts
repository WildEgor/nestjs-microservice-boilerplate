import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@config/config.module';
import { InjectTokens } from 'src/infrastructure/types/inject-tokens';
import { AppLogger } from './app-logger';

@Global()
@Module({
  imports: [ConfigModule],
  providers: [
    {
      provide: InjectTokens.Logger,
      useClass: AppLogger,
    },
  ],
  exports: [
    {
      provide: InjectTokens.Logger,
      useClass: AppLogger,
    },
  ],
})
export class AppLoggerModule {}
