import { env as publicEnv } from '$env/dynamic/public';
import { env as privateEnv } from '$env/dynamic/private';
import type { RequestHandler } from './$types';

function getServerApiUrl(): string {
  return privateEnv.PRIVATE_SERVER_URL || publicEnv.PUBLIC_SERVER_URL || 'http://localhost:3081';
}

/**
 * Proxy all /proxy/* requests to the backend API.
 * This is used by the Hono RPC client to keep all API calls
 * same-origin in Vercel+Render deployments.
 */
export const fallback: RequestHandler = async ({ request, params, url }) => {
  const path = params.path;
  const API_URL = getServerApiUrl();

  if (!API_URL) {
    console.error('[api-proxy] CRITICAL: No API_URL configured');
    return new Response(JSON.stringify({ error: 'Server configuration error' }), {
      status: 500,
      headers: { 'content-type': 'application/json' }
    });
  }

  const targetUrl = `${API_URL}/${path}${url.search}`;

  const headers = new Headers(request.headers);
  headers.delete('host');
  headers.set('x-forwarded-host', url.host);
  headers.set('x-forwarded-proto', url.protocol.replace(':', ''));

  const response = await fetch(targetUrl, {
    method: request.method,
    headers,
    body: request.method !== 'GET' && request.method !== 'HEAD' ? await request.text() : undefined,
    redirect: 'manual'
  });

  const responseHeaders = new Headers(response.headers);

  const setCookieHeaders = responseHeaders.getSetCookie();
  if (setCookieHeaders.length > 0) {
    responseHeaders.delete('set-cookie');
    for (const cookie of setCookieHeaders) {
      const cleaned = cookie
        .replace(/;\s*Domain\s*=\s*[^;]+/gi, '')
        .replace(/;\s*SameSite\s*=\s*[^;]+/gi, '')
        .replace(/;\s*Secure\s*$/gi, '');
      responseHeaders.append(
        'set-cookie',
        `${cleaned}; Path=/; SameSite=Lax; Secure`
      );
    }
  }

  responseHeaders.delete('transfer-encoding');
  responseHeaders.delete('content-encoding');

  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers: responseHeaders
  });
};