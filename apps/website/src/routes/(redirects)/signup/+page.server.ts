import { dev } from '$app/environment';
import { client } from '$lib/utils/posthog';
import { redirect } from '@sveltejs/kit';

export const prerender = false;

export const load = ({ request, url }) => {
  client.capture({
    distinctId: request.headers.get('x-forwarded-for') || new Date().getTime().toString(),
    event: 'signup'
  });

  const baseUrl = dev ? 'http://localhost:5173' : 'https://app-gurukulx.vercel.app';
  redirect(307, `${baseUrl}/signup${url.search ?? ''}`);
};
