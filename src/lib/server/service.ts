import { desc, eq } from 'drizzle-orm'
import { db } from '.'
import { budgets, expenses } from './schema'
import { fail, error } from '@sveltejs/kit'

export const getLastBudget = async (category: string | null) => {
  try {
    if (category) {
      const data = await db.query.budgets.findFirst({
        with: {
          expense: {
            where: (expense, { eq }) => eq(expense.category, category)
          }
        },
        orderBy: [desc(budgets.created_at)]
      })
      return { budget: data }
    } else {
      const data = await db.query.budgets.findFirst({
        with: {
          expense: true
        },
        orderBy: [desc(budgets.created_at)]
      })
      return { budget: data }
    }
  } catch (e) {
    throw error(
      400,
      'Estamos teniendo problemas para establecer la conexión con el servidor, intenta más tarde.'
    )
  }
}

export const getBudgets = async () => {
  try {
    const data = await db.query.budgets.findMany({
      orderBy: [desc(budgets.created_at)],
      columns: {
        amount: true,
        created_at: true,
        name: true,
        id: true
      }
    })
    return { budgets: data }
  } catch (e) {
    throw error(
      400,
      'Estamos teniendo problemas para establecer la conexión con el servidor, intenta más tarde.'
    )
  }
}

export const getBudgetById = async (category: string | null, budgetId: number) => {
  try {
    if (category) {
      const data = await db.query.budgets.findFirst({
        with: {
          expense: {
            where: (expense, { eq }) => eq(expense.category, category)
          }
        },
        where: (budget, { eq }) => eq(budget.id, +budgetId)
      })
      if (!data) throw error(404)
      return { budget: data }
    } else {
      const data = await db.query.budgets.findFirst({
        with: {
          expense: true
        },
        where: (budget, { eq }) => eq(budget.id, +budgetId)
      })
      if (!data) throw error(404, { message: 'Not Found' })
      return { budget: data }
    }
  } catch (e) {
    if (e.code === 'ECONNREFUSED') {
      throw error(400, { message: 'No se pudo completar la solicitud, intenta más tarde.' })
    }
    throw error(e.status, e.body.message)
  }
}

export const newBudget = async (name: string, amount: number | null) => {
  try {
    await db.insert(budgets).values({
      name,
      amount
    })
    return { budgetCreated: true }
  } catch (e) {
    return fail(400, { message: 'No se pudo completar la solicitud, intenta más tarde.' })
  }
}

export const newExpense = async (
  name: string,
  amount: number,
  budgetId: number,
  category: string
) => {
  try {
    await db.insert(expenses).values({
      name,
      amount,
      budgetId,
      category: category === '' ? null : category
    })

    return { success: true }
  } catch (error) {
    return fail(400, { message: 'No se pudo completar la solicitud, intenta más tarde.' })
  }
}

export const deleteExpense = async (expenseId: number) => {
  try {
    await db.delete(expenses).where(eq(expenses.id, expenseId))
    return { success: true }
  } catch (error) {
    return fail(400, { message: 'No se pudo completar la solicitud, intenta más tarde.' })
  }
}

export const newCategory = async (categories: string[], budgetId: number) => {
  try {
    await db.update(budgets).set({ categories: categories }).where(eq(budgets.id, budgetId))
    return { success: true }
  } catch (error) {
    return fail(400, { message: 'No se pudo completar la solicitud, intenta más tarde.' })
  }
}
