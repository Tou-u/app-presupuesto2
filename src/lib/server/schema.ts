import { relations } from 'drizzle-orm'
import { mysqlTable, text, serial, int } from 'drizzle-orm/mysql-core'

export const budgets = mysqlTable('budgets', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  amount: int('amount')
})

export const expenses = mysqlTable('expenses', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  amount: int('amount').notNull(),
  category: text('category'),
  budgetId: int('budget_id')
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
