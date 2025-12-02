/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Role } from '../roles/entities/role.entity';
import { RoleEnum } from './enums/role.enum';
import { PaginationInput, SortingInput } from '../_shared/dto/pagination.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
  ) {}

  async create(createUserInput: CreateUserInput) {
    try {
      const salt = await bcrypt.genSalt(12);
      const password = await bcrypt.hash(createUserInput.password, salt);
      if (!createUserInput.roleId) {
        const userRole = await this.roleRepository.findOne({
          where: { name: RoleEnum.EMPLOYEE },
        });
        if (!userRole) {
          throw new Error('Default user role not found');
        }
        createUserInput.roleId = userRole.id;
      }
      const user = await this.userRepository.save({
        ...createUserInput,
        password,
      });

      return user;
    } catch (error) {
      throw new InternalServerErrorException(
        'Error fetching users: ' +
          (error instanceof Error ? error.message : String(error)),
      );
    }
  }

  async findAll(pagination?: PaginationInput, sorting?: SortingInput) {
    const page = pagination?.page || 1;
    const limit = pagination?.limit || 10;
    const skip = (page - 1) * limit;

    const query = this.userRepository.createQueryBuilder('user');

    if (sorting?.sortBy) {
      const sortOrder = sorting.sortOrder || 'ASC';
      query.orderBy(`user.${sorting.sortBy}`, sortOrder);
    } else {
      query.orderBy('user.createdAt', 'DESC');
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

  async findOne(id: string): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { id },
      relations: ['role'],
    });
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return user;
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.userRepository.findOne({ where: { email } });
  }

  async update(updateUserInput: UpdateUserInput): Promise<User> {
    try {
      const { id, ...updateData } = updateUserInput;
      if (updateData.password) {
        const salt = await bcrypt.genSalt(12);
        updateData.password = await bcrypt.hash(updateData.password, salt);
      }
      await this.userRepository.update(id, updateData);
      return this.findOne(id);
    } catch (error) {
      throw new InternalServerErrorException(
        'Error updating user: ' +
          (error instanceof Error ? error.message : String(error)),
      );
    }
  }
}
