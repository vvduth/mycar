import { Controller, Post, Patch, Param } from '@nestjs/common';
import { Body } from '@nestjs/common';
import { CreateReportDTO } from './dtos/create-report.dto';
import { ReportsService } from './reports.service';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/guards/auth.guard';
import { CurrentUser } from '../users/decorators/current-user.decorator';
import { User } from 'src/users/user.entity';
import { ReportDto } from './dtos/report.dto';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { ApproveReportDto } from './dtos/approve-report-dto';

@Controller('reports')
export class ReportsController {
  constructor(private reportService: ReportsService) {}

  @Post()
  @UseGuards(AuthGuard)
  @Serialize(ReportDto)
  createReport(@Body() body: CreateReportDTO, @CurrentUser() user: User) {
    return this.reportService.create(body, user);
  }

  @Patch('/:id')
  approveReport(@Param('id') id: string, @Body() body: ApproveReportDto) {
    return this.reportService.changeApproval(id, body.approved)
  }
}
