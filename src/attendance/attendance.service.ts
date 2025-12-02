import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm/repository/Repository';
import { Attendance } from './entities/attendance.entity';
import { PaginationInput, SortingInput } from '../_shared/dto/pagination.dto';
import { AttendanceInput } from './dto/create-attendance.input';

@Injectable()
export class AttendanceService {
  constructor(
    @InjectRepository(Attendance)
    private readonly attendanceRepository: Repository<Attendance>,
  ) {}

  async create(attendanceInput: AttendanceInput): Promise<Attendance> {
    try {
      const attendance = this.attendanceRepository.create(attendanceInput);
      return await this.attendanceRepository.save(attendance);
    } catch (error) {
      throw new InternalServerErrorException(
        'Error fetching attendance: ' +
          (error instanceof Error ? error.message : String(error)),
      );
    }
  }

  async findAll(pagination?: PaginationInput, sorting?: SortingInput) {
    const page = pagination?.page || 1;
    const limit = pagination?.limit || 10;
    const skip = (page - 1) * limit;

    const query = this.attendanceRepository.createQueryBuilder('attendance');

    if (sorting?.sortBy) {
      const sortOrder = sorting.sortOrder || 'ASC';
      query.orderBy(`attendance.${sorting.sortBy}`, sortOrder);
    } else {
      query.orderBy('attendance.createdAt', 'DESC');
    }

    query.skip(skip).take(limit);

    const [data, total] = await query.getManyAndCount();
    const totalPages = Math.ceil(total / limit);

    return {
      data,
      total,
      page,
      limit,
      totalPages,
    };
  }
}
