import { relations } from 'drizzle-orm'
import { pgTable, text, serial, integer, timestamp } from 'drizzle-orm/pg-core'

export const budgets = pgTable('budgets', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  amount: integer('amount'),
  created_at: timestamp('created_at').defaultNow().notNull()
})

export const expenses = pgTable('expenses', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  amount: integer('amount').notNull(),
  category: text('category'),
  budgetId: integer('budget_id')
    .notNull()
    .references(() => budgets.id, { onDelete: 'cascade' })
})

export const budgetRelations = relations(budgets, ({ many }) => ({
  expense: many(expenses)
}))

export const expenseRelations = relations(expenses, ({ one }) => ({
  budget: one(budgets, {
    fields: [expenses.budgetId],
    references: [budgets.id]
  })
}))
