import { redirect, type Handle, type RequestEvent, type MaybePromise } from '@sveltejs/kit'
import { sequence } from '@sveltejs/kit/hooks'
import { handle as authenticationHandle } from './auth'

async function authorizationHandle({
  event,
  resolve
}: {
  event: RequestEvent
  resolve: (event: RequestEvent) => MaybePromise<Response>
}) {
  const protectedPath = ['/', '/budgets', `/budget/${event.params.id}`]

  if (protectedPath.includes(event.url.pathname)) {
    const session = await event.locals.auth()
    if (!session) throw redirect(303, '/auth')
  }

  if (event.url.pathname === '/auth') {
    const session = await event.locals.auth()
    if (session) throw redirect(303, '/')
  }

  return resolve(event)
}

export const handle: Handle = sequence(authenticationHandle, authorizationHandle)
