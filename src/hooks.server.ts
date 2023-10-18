import { SvelteKitAuth } from '@auth/sveltekit'
import GitHub from '@auth/core/providers/github'
import { GITHUB_ID, GITHUB_SECRET } from '$env/static/private'
import { redirect, type Handle } from '@sveltejs/kit'
import { sequence } from '@sveltejs/kit/hooks'
import { DrizzleAdapter } from '@auth/drizzle-adapter'
import { db } from '$lib/server'

export const authorization: Handle = async ({ event, resolve }) => {
  if (event.url.pathname.startsWith('/authenticated')) {
    const session = await event.locals.getSession()
    if (!session) {
      throw redirect(303, '/auth')
    }
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
    }
  }),
  authorization
)
