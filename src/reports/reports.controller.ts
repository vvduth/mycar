import { Controller, Post } from '@nestjs/common';
import { Body } from '@nestjs/common';
import { CreateReportDTO } from './dtos/create-report.dto';
import { ReportsService } from './reports.service';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/guards/auth.guard';
import { CurrentUser } from '../users/decorators/current-user.decorator';
import { User } from 'src/users/user.entity';
@Controller('reports')
export class ReportsController {

    constructor(private reportService: ReportsService) {

    }

    @Post()
    @UseGuards(AuthGuard)
    createReport(@Body() body: CreateReportDTO,@CurrentUser()  user: User) {
        return this.reportService.create(body, user)
    }
}
