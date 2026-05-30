import { createAuthClient } from 'better-auth/svelte';
import { getRequestBaseUrl } from '$lib/utils/services/api';

/**
 * Returns a fresh Better Auth client every time it's called so it always
 * picks up the correct PRIVATE_SERVER_URL / PUBLIC_SERVER_URL from the
 * runtime environment rather than capturing the value once at module-load.
 *
 * This fixes the auth loop on self-hosted Render deployments where the env
 * var may not be available at the exact moment the module is first imported.
 */
export function getAuthServerClient() {
  const baseURL = getRequestBaseUrl();
  return createAuthClient({
    baseURL,
    fetchOptions: {
      credentials: 'include' // Include cookies in requests
    }
  });
}

/**
 * @deprecated Use getAuthServerClient() instead.
 * Kept for backwards-compatibility with any remaining direct imports.
 */
export const authServerClient = getAuthServerClient();
