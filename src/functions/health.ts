import { db } from '$lib/server'
import { budgets } from '$lib/server/schema'

export async function handler() {
  await db.select().from(budgets)
}
