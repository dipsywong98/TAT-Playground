import { MigrationInterface, QueryRunner } from 'typeorm';
import { getUserRepo } from '../repositories';
import { seed, unseed } from '../seeds';

export class User1564322121120 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await seed();
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await unseed();
  }
}
