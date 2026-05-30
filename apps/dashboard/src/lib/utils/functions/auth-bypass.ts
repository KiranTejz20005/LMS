/**
 * Auth Bypass Utility
 *
 * Stores user details from login/onboarding in localStorage and provides
 * them to the app stores so the dashboard works without real authentication.
 */

const STORAGE_KEY = 'gurukulx_bypass_user';

export interface BypassUser {
  email: string;
  fullname: string;
  orgName: string;
  siteName: string;
  goal?: string;
  source?: string;
  locale?: string;
}

/** Save user details from onboarding */
export function saveBypassUser(data: BypassUser): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

/** Get saved bypass user, or null if none */
export function getBypassUser(): BypassUser | null {
  if (typeof window === 'undefined') return null;
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as BypassUser;
  } catch {
    return null;
  }
}

/** Save just the email (from login page before onboarding) */
export function saveBypassEmail(email: string): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem('gurukulx_onboarding_email', email);
}

/** Get the saved email */
export function getBypassEmail(): string {
  if (typeof window === 'undefined') return '';
  return localStorage.getItem('gurukulx_onboarding_email') || '';
}

/** Check if we have a bypass user (either full onboarding or just email) */
export function hasBypassSession(): boolean {
  if (typeof window === 'undefined') return false;
  return !!(localStorage.getItem(STORAGE_KEY) || localStorage.getItem('gurukulx_onboarding_email'));
}

/** Generate a fake profile object from bypass data */
export function getBypassProfile() {
  const user = getBypassUser();
  const email = getBypassEmail();

  return {
    id: 'bypass-user-001',
    fullname: user?.fullname || email?.split('@')[0] || 'Guest User',
    avatarUrl: '',
    username: user?.email?.split('@')[0] || email?.split('@')[0] || 'guest',
    email: user?.email || email || 'guest@gurukulx.com',
    role: null,
    goal: user?.goal || null,
    source: user?.source || null,
    telegramChatId: null,
    locale: user?.locale || 'en',
    isEmailVerified: false,
    verifiedAt: null,
    canAddCourse: true,
    isRestricted: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    metadata: null
  };
}

/** Generate a fake org object from bypass data */
export function getBypassOrg() {
  const user = getBypassUser();

  return {
    avatarUrl: '',
    createdAt: new Date().toISOString(),
    customCode: '',
    customDomain: '',
    customization: {
      apps: { poll: true, comments: true },
      course: { grading: true, newsfeed: true },
      dashboard: { exercise: true, community: true, bannerText: '', bannerImage: '' },
      auth: { backgroundImage: '' }
    },
    disableEmailPassword: false,
    disableGoogleAuth: false,
    disableSignup: false,
    disableSignupMessage: '',
    favicon: '',
    id: 'bypass-org-001',
    isCustomDomainVerified: false,
    isRestricted: false,
    landingpage: {},
    name: user?.orgName || 'My Organization',
    parentOrganizationId: null,
    plans: [],
    readOnlyUntil: null,
    roleId: 1,
    settings: {},
    siteName: user?.siteName || 'my-org',
    theme: 'violet'
  };
}
