import { MigrationInterface, QueryRunner } from 'typeorm';
import { getUserRepo } from '../repositories';
import { UserSeed } from '../seeds/user.seed';
import { User } from '../models';

export class User1564322121120 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    const userRepo = getUserRepo();
    UserSeed.forEach(
      ({ username, password }: { username: string; password: string }) => {
        const user = new User();
        user.username = username;
        user.password = password;
        userRepo.save(user);
      }
    );
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    UserSeed.forEach(
      async ({
        username,
        password,
      }: {
        username: string;
        password: string;
      }) => {
        const userRepo = getUserRepo();
        const user = await userRepo.findByUsernamePassword(username, password);
        if (user) {
          await userRepo.remove(user);
        }
      }
    );
  }
}
