import { Global, Module } from '@nestjs/common';
import { EmailNotifier } from '@adapters/notifiers/email-notifier';
import { ConfigModule } from '@config/config.module';

@Global()
@Module({
  imports: [ConfigModule],
  providers: [
    {
      provide: EmailNotifier,
      useClass: EmailNotifier,
    },
  ],
  exports: [
    {
      provide: EmailNotifier,
      useClass: EmailNotifier,
    },
  ],
})
export class NotifiersModule {}
