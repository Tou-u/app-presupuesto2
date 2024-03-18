import { AUTH_SECRET, GITHUB_ID, GITHUB_SECRET } from '$env/static/private'
import { db } from '$lib/server'
import { DrizzleAdapter } from '@auth/drizzle-adapter'
import { SvelteKitAuth } from '@auth/sveltekit'
import GitHub from '@auth/sveltekit/providers/github'

export const { handle, signIn, signOut } = SvelteKitAuth({
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
})
