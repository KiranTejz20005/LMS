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
 *
 * We read the full response body (which auto-decompresses gzip/br)
 * and forward the raw bytes. This avoids the mismatch where we strip
 * content-encoding but pass through a still-compressed body.
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
  // Don't request compressed responses — we'll forward uncompressed
  headers.delete('accept-encoding');
  headers.set('x-forwarded-host', url.host);
  headers.set('x-forwarded-proto', url.protocol.replace(':', ''));

  const response = await fetch(targetUrl, {
    method: request.method,
    headers,
    body: request.method !== 'GET' && request.method !== 'HEAD' ? await request.text() : undefined,
    redirect: 'manual'
  });

  // Read the full body (auto-decompresses if content-encoding was applied)
  const body = await response.arrayBuffer();

  const responseHeaders = new Headers(response.headers);

  // Rewrite Set-Cookie headers to remove Domain (make them same-origin)
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

  // Remove hop-by-hop and encoding headers since we've decompressed
  responseHeaders.delete('transfer-encoding');
  responseHeaders.delete('content-encoding');
  // Set correct content-length for the decompressed body
  responseHeaders.set('content-length', String(body.byteLength));

  return new Response(body, {
    status: response.status,
    statusText: response.statusText,
    headers: responseHeaders
  });
};
