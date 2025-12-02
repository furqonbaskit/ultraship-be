import { AppDataSource } from './_config/pgDataSource';
import { seedAdminUser } from './seeders/admin-user.seeder';

async function runSeeders() {
  try {
    await AppDataSource.initialize();
    console.log('DataSource initialized');

    await seedAdminUser(AppDataSource);

    console.log('Seeding completed');
  } catch (error) {
    console.error('Seeding failed:', error);
  } finally {
    await AppDataSource.destroy();
  }
}

void runSeeders();
