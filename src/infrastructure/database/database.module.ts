import { Global, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { StatisticOrmMapper } from '@src/infrastructure/database/mappers/statistic.mapper';
import { StatisticRepository } from '@src/infrastructure/database/repositories/statistic.repository';
import { StatisticSchema } from '@src/infrastructure/schemas/statistic.schema';
import { InjectTokens } from '@src/infrastructure/types/inject-tokens';
import { SchemaNames } from '@src/infrastructure/types/schema-names';

@Global()
@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: SchemaNames.STATISTIC,
        schema: StatisticSchema,
      },
    ]),
  ],
  providers: [
    {
      provide: InjectTokens.UserRepository,
      useClass: StatisticRepository,
    },
    StatisticOrmMapper,
  ],
  exports: [
    {
      provide: InjectTokens.UserRepository,
      useClass: StatisticRepository,
    },
  ],
})
export class DatabaseModule {}
