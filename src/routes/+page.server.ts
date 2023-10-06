import type { PageServerLoad } from './$types'
import { db } from '$lib/server'
import { budgets, expenses } from '$lib/server/schema'
import { fail } from '@sveltejs/kit'
import { eq, desc } from 'drizzle-orm'

export const load = (async () => {
  const data = await db.query.budgets.findFirst({
    with: {
      expense: true
    },
    orderBy: [desc(budgets.created_at)]
  })
  return { budget: data }
}) satisfies PageServerLoad

export const actions = {
  newBudget: async ({ request }) => {
    const formData = await request.formData()
    const budget_name = formData.get('budget_name') as string
    const budget_amount = formData.get('budget_amount')

    let amount: number | null

    if (budget_name.length < 2) {
      return fail(400, { message: 'El nombre debe tener un mínimo de 2 caracteres' })
    }

    if (budget_amount) {
      amount = +budget_amount
    } else {
      amount = null
    }

    await db.insert(budgets).values({
      name: budget_name,
      amount
    })

    return { success: true }
  },
  delete: async ({ request }) => {
    const id = await request.json()

    await db.delete(budgets).where(eq(budgets.id, id))

    return { success: true }
  },
  newExpense: async ({ request }) => {
    const formData = await request.formData()

    const expense_name = formData.get('expense_name') as string
    const expense_amount = formData.get('expense_amount') as string
    const budgetId = formData.get('budgetId') as string

    if (expense_name?.length < 2)
      return fail(400, { message: 'El nombre debe tener un mínimo de 2 caracteres' })

    if (expense_amount === '0')
      return fail(400, { message: 'Es necesario ingresar un monto al gasto' })

    await db.insert(expenses).values({
      name: expense_name,
      amount: +expense_amount,
      budgetId: +budgetId
    })

    return { success: true }
  }
}
