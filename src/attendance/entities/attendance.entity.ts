import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { AbstractAuditableEntity } from '../../_shared/entities/abstract.auditable.entity';
import { AttendanceStatus } from '../enums/attendanceStatus.enum';
import { User } from '../../users/entities/user.entity';

@Entity('attendance')
export class Attendance extends AbstractAuditableEntity {
  @Column({ name: 'recorded_at', type: 'timestamptz' })
  recordedAt: Date;

  @Column({ name: 'status', type: 'varchar' })
  status: AttendanceStatus;

  @Column({ name: 'notes', type: 'text', nullable: true })
  notes?: string;

  @Column({ name: 'user_id', type: 'uuid' })
  userId: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
  user: User;
}
