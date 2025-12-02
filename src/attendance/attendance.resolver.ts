import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { AttendanceService } from './attendance.service';
import { Attendance, PaginatedAttendanceResponse } from './dto/attendance.dto';
import { AttendanceInput } from './dto/create-attendance.input';
import { PaginationInput, SortingInput } from '../_shared/dto/pagination.dto';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RoleGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { RoleEnum } from '../users/enums/role.enum';

@Resolver(() => Attendance)
export class AttendanceResolver {
  constructor(private readonly attendanceService: AttendanceService) {}

  @UseGuards(JwtAuthGuard)
  @Mutation(() => Attendance)
  createAttendance(@Args('attendanceInput') attendanceInput: AttendanceInput) {
    return this.attendanceService.create(attendanceInput);
  }

  @UseGuards(JwtAuthGuard, RoleGuard)
  @Roles(RoleEnum.ADMIN)
  @Query(() => PaginatedAttendanceResponse, { name: 'attendance' })
  findAll(
    @Args('pagination', { nullable: true }) pagination?: PaginationInput,
    @Args('sorting', { nullable: true }) sorting?: SortingInput,
  ) {
    return this.attendanceService.findAll(pagination, sorting);
  }
}
