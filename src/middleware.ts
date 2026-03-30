import { defineMiddleware } from 'astro:middleware';
import { jwtVerify } from 'jose';

const secret = new TextEncoder().encode(import.meta.env.JWT_SECRET);

export const onRequest = defineMiddleware(async (context, next) => {
  const { url, cookies, redirect } = context;
  const token = cookies.get('admin-session')?.value;

  const isPrivateRoute =
    url.pathname.startsWith('/admin') || url.pathname.startsWith('/api/admin');

  const isAuthPage = url.pathname === '/login' || url.pathname === '/register';

  if (isAuthPage && token)
    try {
      await jwtVerify(token, secret);
      return redirect('/admin');
    } catch {
      cookies.delete('admin-session', { path: '/' });
    }

  if (!isPrivateRoute) return next();

  if (!token)
    return url.pathname.startsWith('/api/')
      ? new Response(JSON.stringify({ message: 'Acesso negado' }), {
          status: 401,
        })
      : redirect('/login');

  try {
    const { payload } = await jwtVerify(token, secret);

    context.locals.user = payload as unknown as JWTPayload;

    return next();
  } catch (e) {
    cookies.delete('admin-session', { path: '/' });
    return url.pathname.startsWith('/api/')
      ? new Response(JSON.stringify({ message: 'Sessão inválida' }), {
          status: 401,
        })
      : redirect('/login');
  }
});
