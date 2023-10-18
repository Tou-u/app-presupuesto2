import { parseLocaleNumber } from '$lib/utils/scripts'
import { fail } from '@sveltejs/kit'
import type { Actions, PageServerLoad } from './$types'
import {
  deleteExpense,
  getBudgetById,
  newBudget,
  newCategory,
  newExpense
} from '$lib/server/service'

let userId: string = ''

export const load = (async ({ url, params, parent }) => {
  const category = url.searchParams.get('category')
  const budgetId = params.id as string

  const { session } = await parent()
  if (session) {
    userId = session?.user.id
  }

  return getBudgetById(category, +budgetId, userId)
}) satisfies PageServerLoad

export const actions = {
  // Creación de nuevo presupuesto
  newBudget: async ({ request }) => {
    const formData = await request.formData()

    const budget_name = formData.get('budget_name') as string
    const budget_amount = formData.get('budget_amount') as string

    if (budget_name.length < 2) {
      return fail(400, { message: 'El nombre debe tener un mínimo de 2 caracteres' })
    }

    let amount: number | null
    if (budget_amount) {
      amount = parseLocaleNumber(budget_amount)
      if (amount > 999999999) return fail(400, { message: 'Ingresa un monto válido' })
    } else {
      amount = null
    }

    return newBudget(budget_name, amount, userId)
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

    return newExpense(expense_name, amount, +budgetId, category)
  },
  // Eliminación de un gasto
  deleteExpense: async ({ request }) => {
    const expenseId = await request.json()
    return deleteExpense(expenseId)
  },
  // Creación de categoría
  newCategory: async ({ request }) => {
    const formData = await request.formData()
    const budgetId = formData.get('budgetId') as string
    const categories = formData.getAll('categories') as string[]

    return newCategory(categories, +budgetId)
  }
} satisfies Actions
