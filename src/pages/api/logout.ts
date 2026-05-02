import type { APIRoute } from 'astro';

export const POST: APIRoute = async ({ cookies }) => {
  cookies.delete('admin-session', { path: '/' });

  return new Response(
    JSON.stringify({ success: true, message: 'Logout realizado' }),
    { status: 200 },
  );
};
