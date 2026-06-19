import { sql } from 'kysely'

/** @param {import('kysely').Kysely} db */
export async function down(db) {
  await db.schema.dropTable('stash.mea_electric').execute()
  await db.schema.dropTable('stash.mea_meter').execute()
}

/** @param {import('kysely').Kysely} db */
export async function up(db) {
  await db.schema
    .createTable('stash.mea_meter')
    .ifNotExists()
    .addColumn('ca', 'varchar(20)', (col) => col.primaryKey())
    .addColumn('ui', 'varchar(20)', (col) => col.notNull())
    .addColumn('alias', 'varchar(120)')
    .addColumn('updated_at', 'timestamptz', (col) => col.notNull().defaultTo(sql`now()`))
    .execute()

  await db.schema
    .createTable('stash.mea_electric')
    .ifNotExists()
    .addColumn('ca', 'varchar(20)', (col) => col.notNull())
    .addColumn('month', 'varchar(6)', (col) => col.notNull())
    .addColumn('bill_no', 'varchar(20)')
    .addColumn('bill_period', 'varchar(5)')
    .addColumn('bill_date', 'date')
    .addColumn('unit_used', 'numeric', (col) => col.defaultTo(0))
    .addColumn('amount_used', 'numeric', (col) => col.defaultTo(0))
    .addColumn('kwh', 'numeric', (col) => col.defaultTo(0))
    .addColumn('kwh_on', 'numeric', (col) => col.defaultTo(0))
    .addColumn('kwh_off', 'numeric', (col) => col.defaultTo(0))
    .addColumn('unit_generate', 'numeric', (col) => col.defaultTo(0))
    .addColumn('amount_generate', 'numeric', (col) => col.defaultTo(0))
    .addColumn('unit_used_solar', 'numeric', (col) => col.defaultTo(0))
    .addColumn('amount_used_solar', 'numeric', (col) => col.defaultTo(0))
    .addColumn('paid', 'numeric', (col) => col.defaultTo(0))
    .addColumn('income', 'numeric', (col) => col.defaultTo(0))
    .addColumn('created_at', 'timestamptz', (col) => col.notNull().defaultTo(sql`now()`))
    .addPrimaryKeyConstraint('pk_mea_electric', ['ca', 'month'])
    .execute()
}
