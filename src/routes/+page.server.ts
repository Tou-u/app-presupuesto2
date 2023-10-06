// import type { PageServerLoad } from './$types'
// import { db } from '$lib/server'
// import { budgets, expenses } from '$lib/server/schema'
// import { fail } from '@sveltejs/kit'
// import { eq } from 'drizzle-orm'

// export const load = (async () => {
//   const data = await db.query.budgets.findFirst({
//     with: {
//       expense: true
//     }
//   })
//   return { budgets: data }
// }) satisfies PageServerLoad

// export const actions = {
//   new: async ({ request }) => {
//     const data = await request.formData()
//     const name = data.get('name') as string

//     if (name.length < 5) {
//       return fail(400, { message: 'Name too short' })
//     }

//     await db.insert(budgets).values({
//       name
//     })

//     return { success: true }
//   },
//   delete: async ({ request }) => {
//     const id = await request.json()

//     await db.delete(budgets).where(eq(budgets.id, id))
//     await db.delete(expenses).where(eq(expenses.budgetId, id))

//     return { success: true }
//   }
// }
