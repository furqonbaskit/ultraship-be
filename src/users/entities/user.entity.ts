import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { AbstractAuditableEntity } from '../../_shared/entities/abstract.auditable.entity';
import { Role } from '../../roles/entities/role.entity';

@Entity('users')
export class User extends AbstractAuditableEntity {
  @Column({ type: 'varchar', length: 255, unique: true })
  email: string;

  @Column({ type: 'varchar', length: 255 })
  password: string;

  @Column({ type: 'varchar', length: 50 })
  firstName: string;

  @Column({ type: 'varchar', length: 50 })
  lastName: string;

  @Column({ type: 'int' })
  age: number;

  @Column({ type: 'uuid', name: 'role_id' })
  roleId: string;

  @Column({ type: 'varchar', nullable: true })
  class: string;

  @Column({ type: 'text', nullable: true })
  subject: string;

  @ManyToOne(() => Role)
  @JoinColumn({ name: 'role_id', referencedColumnName: 'id' })
  role: Role;
}
