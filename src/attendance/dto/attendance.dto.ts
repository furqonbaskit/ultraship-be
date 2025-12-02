import { Field, Int, ObjectType } from '@nestjs/graphql';
import { AttendanceStatus } from '../enums/attendanceStatus.enum';

@ObjectType()
export class Attendance {
  @Field()
  id: string;

  @Field()
  recordedAt: Date;

  @Field()
  status: AttendanceStatus;

  @Field({ nullable: true })
  notes?: string;

  @Field()
  userId: string;
}

@ObjectType()
export class PaginatedAttendanceResponse {
  @Field(() => [Attendance])
  data: Attendance[];

  @Field(() => Int)
  total: number;

  @Field(() => Int)
  page: number;

  @Field(() => Int)
  limit: number;

  @Field(() => Int)
  totalPages: number;
}
