import { SvelteKitAuth } from '@auth/sveltekit'
import GitHub from '@auth/core/providers/github'
import { GITHUB_ID, GITHUB_SECRET, AUTH_SECRET } from '$env/static/private'
import { redirect, type Handle } from '@sveltejs/kit'
import { sequence } from '@sveltejs/kit/hooks'
import { DrizzleAdapter } from '@auth/drizzle-adapter'
import { db } from '$lib/server'

export const authorization: Handle = async ({ event, resolve }) => {
  const protectedPath = ['/', '/budgets', `/budget/${event.params.id}`]

  if (protectedPath.includes(event.url.pathname)) {
    const session = await event.locals.getSession()
    if (!session) throw redirect(303, '/auth')
  }

  if (event.url.pathname === '/auth') {
    const session = await event.locals.getSession()
    if (session) throw redirect(303, '/')
  }

  return resolve(event)
}

export const handle: Handle = sequence(
  SvelteKitAuth({
    adapter: DrizzleAdapter(db),
    providers: [GitHub({ clientId: GITHUB_ID, clientSecret: GITHUB_SECRET })],
    callbacks: {
      async session({ session, user }) {
        session.user.id = user.id
        return Promise.resolve(session)
      }
    },
    trustHost: true,
    secret: AUTH_SECRET
  }),
  authorization
)
