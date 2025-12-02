import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from './entities/role.entity';
import { Repository } from 'typeorm';
import { RoleInput } from './dto/role.dto';

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
  ) {}

  async createRole(roleInput: RoleInput): Promise<Role> {
    try {
      const role = this.roleRepository.create(roleInput);
      return await this.roleRepository.save(role);
    } catch (error) {
      throw new InternalServerErrorException(
        'Error fetching users: ' +
          (error instanceof Error ? error.message : String(error)),
      );
    }
  }
}
