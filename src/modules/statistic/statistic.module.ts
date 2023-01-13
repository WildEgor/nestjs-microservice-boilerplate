import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { ReportGeneratorModule } from '@modules/statistic/modules/report-generator/report-generator.module';

@Module({
  imports: [CqrsModule, ReportGeneratorModule],
  providers: [
  ],
})
export class StatisticModule {}
