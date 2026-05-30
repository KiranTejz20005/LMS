import type { Cookies } from '@sveltejs/kit';
import { getAuthServerClient } from './server';
import { gurukulx } from '$lib/utils/services/api';
import { getCioCookieString } from '$lib/utils/functions/cookies';
import { getRequestBaseUrl } from '$lib/utils/services/api';
import { env as publicEnv } from '$env/dynamic/public';
import { env as privateEnv } from '$env/dynamic/private';

export const getSessionData = async (cookies: Cookies): Promise<App.Locals | null> => {
  try {
    const cioCookies = getCioCookieString(cookies);

    if (!cioCookies) {
      console.log('[session] No classroomio cookies found — user not logged in');
      return null;
    }

    const locals = await getThroughAuthClient(cioCookies);
    console.log('[session] has locals:', !!locals);
    if (!locals) return null;

    locals.fromSessions = true;

    return locals;
  } catch (error) {
    console.error('[session] Session verification failed:', error);
    return null;
  }
};

export async function getThroughTrpc(allCookies: string) {
  const session = await gurukulx.session.$get(undefined, {
    headers: {
      cookie: allCookies
    }
  });

  const data = (await session.json()) as App.Locals;

  return data;
}

/**
 * Resolve the API URL for server-side Better Auth session checking.
 * Tries PRIVATE_SERVER_URL first (for internal/private networking),
 * then PUBLIC_SERVER_URL. Session lookup failures are non-fatal — the
 * client-side hook will check via the same-origin proxy.
 */
function resolveServerSessionUrl(): string {
  return privateEnv.PRIVATE_SERVER_URL || publicEnv.PUBLIC_SERVER_URL || '';
}

export async function getThroughAuthClient(allCookies: string) {
  const baseURL = resolveServerSessionUrl();
  console.log('[session] baseURL for auth client:', baseURL);

  if (!baseURL) {
    console.error(
      '[session] CRITICAL: baseURL is empty! Set PUBLIC_SERVER_URL (or PRIVATE_SERVER_URL for SSR) in environment variables.'
    );
    return null;
  }

  try {
    const client = getAuthServerClient();
    const session = await client.getSession({
      fetchOptions: {
        headers: {
          cookie: allCookies
        }
      }
    });

    console.log('[session] session.data:', session.data ? 'found user' : 'null');
    return session.data as App.Locals | null;
  } catch (error) {
    console.error('[session] getSession request failed:', {
      baseURL,
      error: error instanceof Error ? error.message : error
    });
    return null;
  }
}
