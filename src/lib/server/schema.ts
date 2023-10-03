import { mysqlTable, text, serial, int } from 'drizzle-orm/mysql-core';

export const budget = mysqlTable('budget', {
	id: serial('id').primaryKey(),
	name: text('name').notNull(),
	amount: int('amount')
});
