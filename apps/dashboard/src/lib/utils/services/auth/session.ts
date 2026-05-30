import type { Cookies } from '@sveltejs/kit';
import { getAuthServerClient } from './server';
import { gurukulx } from '$lib/utils/services/api';
import { getCioCookieString } from '$lib/utils/functions/cookies';
import { getRequestBaseUrl } from '$lib/utils/services/api';

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

    // This will always be true because if we don't have gurukulx cookies, we won't be able to this line of code.
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

export async function getThroughAuthClient(allCookies: string) {
  const baseURL = getRequestBaseUrl();
  console.log('[session] baseURL for auth client:', baseURL);

  if (!baseURL) {
    console.error(
      '[session] CRITICAL: baseURL is empty! Set PUBLIC_SERVER_URL (or PRIVATE_SERVER_URL for SSR) in Render environment variables to point at https://lms-haya.onrender.com'
    );
    return null;
  }

  try {
    // Use factory to ensure we always get a client with the live baseURL
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
