import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'leiautes'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      // table.uuid('id').primary().defaultTo(this.db.knexRawQuery('gen_random_uuid()'))
      table.string('e_social_id').primary()
      table.string('prefix').notNullable()
      table.json('nodes').notNullable().defaultTo([])
      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
