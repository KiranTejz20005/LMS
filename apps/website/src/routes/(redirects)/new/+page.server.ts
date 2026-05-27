import { dev } from '$app/environment';
import { redirect } from '@sveltejs/kit';

export const prerender = false;

export const load = async () => {
  const url = dev ? 'http://localhost:5173' : 'https://app-gurukulx.vercel.app';

  redirect(307, `${url}/org/*/courses?create=true`);
};
