import { Field, ID, InputType, ObjectType } from '@nestjs/graphql';
import { RoleEnum } from '../../users/enums/role.enum';

@ObjectType()
export class Role {
  @Field(() => ID)
  id: string;

  @Field()
  name: string;
}

@InputType()
export class RoleInput {
  @Field()
  name: RoleEnum;
}
