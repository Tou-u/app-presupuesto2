import { db } from '$lib/server'
import type { RequestHandler } from './$types'

export const GET: RequestHandler = async () => {
  try {
    await db.query.budgets.findFirst()
    return new Response('Health OK')
  } catch (error) {
    return new Response('Health not working')
  }
}
