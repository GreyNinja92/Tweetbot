import { Migration } from '@mikro-orm/migrations';

export class Migration20240805064909 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "post" add column "user_id" int not null;');
    this.addSql('alter table "post" add constraint "post_user_id_foreign" foreign key ("user_id") references "user" ("id") on update cascade;');
  }

  async down(): Promise<void> {
    this.addSql('alter table "post" drop constraint "post_user_id_foreign";');

    this.addSql('alter table "post" drop column "user_id";');
  }

}
