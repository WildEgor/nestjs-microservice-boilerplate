import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { ReportGeneratorModule } from '@modules/statistic/modules/report-generator/report-generator.module';
import { StatisticRpcController } from '@modules/statistic/statistic-rpc.controller';
import { StatisticResolver } from '@modules/statistic/statistic.resolver';

@Module({
  imports: [CqrsModule, ReportGeneratorModule],
  controllers: [StatisticRpcController],
  providers: [StatisticResolver],
})
export class StatisticModule {
}
