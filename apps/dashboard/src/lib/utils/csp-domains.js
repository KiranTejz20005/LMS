// SaaS default CSP domains, baked in at build time.
// Self-hosted (adapter-node) starts with empty lists; runtime domains
// are added via env vars in hooks.server.ts so pre-built Docker images stay configurable.

/**
 * Common external domains the app loads regardless of deployment mode.
 * These are always included so self-hosted Vercel deployments (which
 * still load Google Fonts, PostHog, etc.) don't get CSP-blocked.
 */
const commonDomains = {
  scriptSrc: ['https://cdnjs.cloudflare.com'],
  styleSrc: ['https://fonts.googleapis.com'],
  fontSrc: ['https://fonts.gstatic.com'],
  connectSrc: [],
  frameSrc: [],
  mediaSrc: [],
};

const saasDefaults = {
  scriptSrc: [
    ...commonDomains.scriptSrc,
    'https://assets.cdn.clsrio.com',
    'https://*.posthog.com',
    'https://*.senja.io',
    'https://umami.hz.oncws.com',
    'https://www.youtube.com',
    'https://youtube.com',
    'https://google.com',
    'https://apis.google.com',
    'https://accounts.google.com',
  ],
  styleSrc: [
    ...commonDomains.styleSrc,
    'https://cdn.plyr.io',
    'https://unpkg.com/katex@0.12.0/dist/katex.min.css',
    'https://assets.cdn.clsrio.com/eqneditor_1.css',
  ],
  connectSrc: [
    'https://*.gurukulx.com',
    'https://gurukulx.com',
    'https://app.gurukulx.com',
    'https://api.gurukulx.com',
    'https://pgrest.gurukulx.com',
    'https://play.gurukulx.com',
    'wss://*.gurukulx.com',
    'https://assets.cdn.clsrio.com',
    'https://cdn.plyr.io',
    'https://*.posthog.com',
    'https://umami.hz.oncws.com',
    'https://*.r2.cloudflarestorage.com',
    'https://*.senja.io',
    'https://*.ytimg.com',
    'https://noembed.com',
    'https://www.googleapis.com',
    'https://kv.better-auth.com',
  ],
  frameSrc: [
    'https://www.youtube.com',
    'https://youtube.com',
    'https://www.youtube-nocookie.com',
    'https://www.google.com',
    'https://google.com',
    'https://drive.google.com',
    'https://docs.google.com',
  ],
  fontSrc: [
    ...commonDomains.fontSrc,
    'https://cdn.plyr.io',
  ],
  mediaSrc: ['https:'],
};

const selfHostedDefaults = {
  scriptSrc: [...commonDomains.scriptSrc],
  styleSrc: [...commonDomains.styleSrc],
  connectSrc: [],
  frameSrc: [],
  fontSrc: [...commonDomains.fontSrc],
  mediaSrc: [],
};

export function getCspDomains(isSelfHosted, serverUrl) {
  if (isSelfHosted) {
    return {
      ...selfHostedDefaults,
      apiOrigin: serverUrl ?? null,
      connectSrc: serverUrl ? [serverUrl] : [],
    };
  }
  return { ...saasDefaults, apiOrigin: serverUrl ?? null };
}
