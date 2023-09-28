import { integer, pgTable, serial, text } from 'drizzle-orm/pg-core';

export const budget = pgTable('budget', {
	id: serial('id').primaryKey(),
	name: text('name').notNull(),
	amount: integer('amount')
});
