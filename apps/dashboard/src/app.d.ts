import type { TUser, TSession, TProfile, TOrganization, TOrganizationmember, TOrganizationPlan } from '@cio/db/types';

type AccountOrganization = TOrganization & {
  member: TOrganizationmember | null;
  plan:
    | (Pick<TOrganizationPlan, 'planName' | 'isActive' | 'provider' | 'subscriptionId'> & { customerId: string })
    | null;
};

// src/app.d.ts
declare global {
  namespace App {
    interface Locals {
      user: TUser | null;
      session: TSession | null;
      profile: TProfile | null;
      organizations: AccountOrganization[];
      fromSessions?: boolean;
      /**
       * Set by hooks.server.ts when auth cookies are present in the request
       * but the server-side Better Auth session check failed (e.g., env var
       * misconfiguration or transient API error). The client-side layout
       * should wait for the same-origin proxy session check before deciding
       * whether to redirect to login.
       */
      authCookiesPresent?: boolean;
    }
    // interface PageData {}
    // interface Error {}
    // interface Platform {}
  }
}

export {};
