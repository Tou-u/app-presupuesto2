import { db } from '$lib/server'
import { budgets, expenses } from '$lib/server/schema'
import { parseLocaleNumber } from '$lib/utils/scripts'
import { error, fail } from '@sveltejs/kit'
import { eq } from 'drizzle-orm'
import type { Actions, PageServerLoad } from './$types'

export const load = (async ({ url, params }) => {
  const category = url.searchParams.get('category')
  const budgetId = params.id as string

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
    if (!data) throw error(404)
    return { budget: data }
  }
}) satisfies PageServerLoad

export const actions = {
  // Creación de nuevo presupuesto
  newBudget: async ({ request }) => {
    const formData = await request.formData()

    const budget_name = formData.get('budget_name') as string
    const budget_amount = formData.get('budget_amount') as string

    let amount: number | null

    if (budget_name.length < 2) {
      return fail(400, { message: 'El nombre debe tener un mínimo de 2 caracteres' })
    }

    if (budget_amount) {
      amount = parseLocaleNumber(budget_amount)
      if (amount > 999999999) return fail(400, { message: 'Ingresa un monto válido' })
    } else {
      amount = null
    }

    await db.insert(budgets).values({
      name: budget_name,
      amount
    })

    return { budgetCreated: true }
  },
  delete: async ({ request }) => {
    const id = await request.json()

    await db.delete(budgets).where(eq(budgets.id, id))

    return { success: true }
  },
  // Creación de nuevo gasto
  newExpense: async ({ request }) => {
    const formData = await request.formData()

    const expense_name = formData.get('expense_name') as string
    const expense_amount = formData.get('expense_amount') as string
    const budgetId = formData.get('budgetId') as string
    const category = formData.get('category') as string

    const amount = parseLocaleNumber(expense_amount)

    if (expense_name?.length < 2)
      return fail(400, { message: 'El nombre debe tener un mínimo de 2 caracteres' })

    if (amount < 1 || isNaN(amount))
      return fail(400, { message: 'Es necesario ingresar un monto al gasto' })
    if (amount > 999999999) return fail(400, { message: 'Ingresa un monto válido' })

    await db.insert(expenses).values({
      name: expense_name,
      amount: amount,
      budgetId: +budgetId,
      category: category === '' ? null : category
    })

    return { success: true }
  },
  // Eliminación de un gasto
  deleteExpense: async ({ request }) => {
    const expenseId = await request.json()
    await db.delete(expenses).where(eq(expenses.id, expenseId))

    return { success: true }
  },
  newCategory: async ({ request }) => {
    const formData = await request.formData()
    const budgetId = formData.get('budgetId') as string
    const categories = formData.getAll('categories') as string[]

    await db.update(budgets).set({ categories: categories }).where(eq(budgets.id, +budgetId))

    return { success: true }
  }
} satisfies Actions
