import { Module } from '@nestjs/common';
import { ReportService } from '@modules/statistic/modules/report-generator/infrastructure/report.service';

@Module({
  imports: [],
  providers: [ReportService],
  exports: [ReportService],
})
export class ReportGeneratorModule {}
