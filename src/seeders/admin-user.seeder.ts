/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { DataSource } from 'typeorm';
import { User } from '../users/entities/user.entity';
import { Role } from '../roles/entities/role.entity';
import { RoleEnum } from '../users/enums/role.enum';
import * as bcrypt from 'bcrypt';

export async function seedAdminUser(dataSource: DataSource) {
  const userRepository = dataSource.getRepository(User);
  const roleRepository = dataSource.getRepository(Role);

  // Check if admin role exists, create if not
  let adminRole = await roleRepository.findOne({
    where: { name: RoleEnum.ADMIN },
  });
  if (!adminRole) {
    adminRole = roleRepository.create({ name: RoleEnum.ADMIN });
    await roleRepository.save(adminRole);
    console.log('Admin role created');
  }

  // Check if admin user exists
  const existingAdmin = await userRepository.findOne({
    where: { email: 'admin@example.com' },
  });
  if (existingAdmin) {
    console.log('Admin user already exists');
    return;
  }

  // Create admin user
  const salt = await bcrypt.genSalt(12);
  const hashedPassword = await bcrypt.hash('admin123', salt); // Change default password

  const adminUser = userRepository.create({
    email: 'admin@example.com',
    firstName: 'Admin',
    lastName: 'User',
    age: 30,
    password: hashedPassword,
    role: adminRole,
  });

  await userRepository.save(adminUser);
  console.log('Admin user seeded successfully');
}
