import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { RolesService } from './roles.service';
import { Role, RoleInput } from './dto/role.dto';

@Resolver()
export class RolesResolver {
  constructor(private readonly rolesService: RolesService) {}

  @Mutation(() => Role)
  async createRole(@Args('roleInput') roleInput: RoleInput): Promise<Role> {
    return this.rolesService.createRole(roleInput);
  }
}
