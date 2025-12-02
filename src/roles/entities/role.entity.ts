import { Column, Entity, OneToMany } from 'typeorm';
import { AbstractAuditableEntity } from '../../_shared/entities/abstract.auditable.entity';
import { User } from '../../users/entities/user.entity';
import { RoleEnum } from '../../users/enums/role.enum';

@Entity('roles')
export class Role extends AbstractAuditableEntity {
  @Column({ type: 'varchar', length: 50, unique: true })
  name: RoleEnum;

  @OneToMany(() => User, (user) => user.role)
  users: User[];
}
