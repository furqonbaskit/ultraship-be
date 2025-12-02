/* eslint-disable @typescript-eslint/no-unsafe-call */
import { Field, InputType } from '@nestjs/graphql';
import { IsEnum } from 'class-validator';
import { AttendanceStatus } from '../enums/attendanceStatus.enum';

@InputType()
export class AttendanceInput {
  @Field()
  userId: string;

  @Field()
  recordedAt: Date;

  @Field()
  @IsEnum(AttendanceStatus)
  status: AttendanceStatus;

  @Field({ nullable: true })
  notes?: string;
}
