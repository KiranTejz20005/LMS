import { env } from '$env/dynamic/public';
import type { RequestHandler } from './$types';

const API_URL = env.PUBLIC_SERVER_URL || 'http://localhost:3081';

/**
 * Proxy all /api/auth/* requests to the backend API.
 * This keeps auth cookies on the same domain as the dashboard,
 * solving cross-origin cookie issues in production.
 */
export const fallback: RequestHandler = async ({ request, params, url }) => {
  const path = params.path;
  const targetUrl = `${API_URL}/api/auth/${path}${url.search}`;

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
  // Remove transfer-encoding as we're not streaming
  responseHeaders.delete('transfer-encoding');

  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers: responseHeaders
  });
};
