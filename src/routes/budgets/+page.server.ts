import { db } from '$lib/server'
import { desc } from 'drizzle-orm'
import type { PageServerLoad } from './$types'
import { budgets } from '$lib/server/schema'

export const load = (async () => {
  const data = await db.query.budgets.findMany({
    orderBy: [desc(budgets.created_at)],
    columns: {
      amount: true,
      created_at: true,
      name: true,
      id: true
    }
  })
  return {
    budgets: data
  }
}) satisfies PageServerLoad
