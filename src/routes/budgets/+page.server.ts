import type { PageServerLoad } from './$types'
import { fail, type Actions } from '@sveltejs/kit'
import { parseLocaleNumber } from '$lib/utils/scripts'
import { getBudgets, newBudget } from '$lib/server/service'

export const load: PageServerLoad = () => {
  return getBudgets()
}

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
    return newBudget(budget_name, amount)
  }
} satisfies Actions
