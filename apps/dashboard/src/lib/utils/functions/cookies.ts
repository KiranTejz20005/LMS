import type { Cookies } from '@sveltejs/kit';

/**
 * Matches auth cookies set by better-auth (cookiePrefix: 'classroomio')
 * as well as legacy 'gurukulx' cookies.
 */
function isAuthCookie(name: string): boolean {
  return name.includes('classroomio') || name.includes('gurukulx');
}

/**
 * Returns the auth cookie string for API/auth requests.
 * Filters cookies whose names include "classroomio" or "gurukulx" and joins them as `name=value; ...`.
 */
export function getCioCookieString(cookies: Cookies): string {
  return cookies
    .getAll()
    .filter((c) => isAuthCookie(c.name))
    .map((c) => `${c.name}=${c.value}`)
    .join('; ');
}

export function getHasCioCookies(cookies: Cookies): boolean {
  const cioCookies = cookies.getAll().filter((c) => isAuthCookie(c.name));

  if (cioCookies.length === 0) return false;

  // check if the cookies doesn't include ONLY gurukulx_locale
  const onlyLocaleCookie = cioCookies.every((c) => c.name === 'gurukulx_locale');

  return !onlyLocaleCookie;
}
