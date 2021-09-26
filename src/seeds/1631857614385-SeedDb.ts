import { MigrationInterface, QueryRunner } from 'typeorm';

export class SeedDb1631857614385 implements MigrationInterface {
  name = 'SeedDb1631857614385';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `INSERT INTO tags (name) VALUES ('dragons'), ('coffee'), ('nestjs')`,
    );
    await queryRunner.query(
      `INSERT INTO users (username, email, password) VALUES ('foo', 'foo@gmail.com', '$2b$10$7qBV3TpuOmbxFI19pT8N1O8uNo2qIIzkmIr9teN9RQsIMC4q2lU3W')`,
    );
    await queryRunner.query(
      `INSERT INTO articles (slug, title, description, body, "tagList", "authorId") VALUES ('first-article', 'First Article', 'description', 'first body', 'coffee,dragons', 1)`,
    );
    await queryRunner.query(
      `INSERT INTO articles (slug, title, description, body, "tagList", "authorId") VALUES ('second-article', 'Second Article', 'description2', 'second body', 'coffee,dragons', 1)`,
    );
  }
  public async down(): Promise<void> {}
}
