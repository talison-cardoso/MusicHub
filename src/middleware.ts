import { defineMiddleware } from 'astro:middleware';
import { jwtVerify } from 'jose';

const secret = new TextEncoder().encode(import.meta.env.JWT_SECRET);

export const onRequest = defineMiddleware(async (context, next) => {
  const { url, cookies, redirect } = context;

  const token = cookies.get('admin-session')?.value;

  let user = null;

  if (token) {
    try {
      const { payload } = await jwtVerify(token, secret);
      user = payload;
    } catch {
      cookies.delete('admin-session', { path: '/' });
    }
  }

  // 2. Disponibiliza globalmente
  context.locals.user = user as unknown as JWTPayload;

  const isLogged = !!user;

  const isPrivateRoute =
    url.pathname.startsWith('/admin') || url.pathname.startsWith('/api/admin');

  const isAuthPage = url.pathname === '/login' || url.pathname === '/register';

  // 3. Se já está logado e tenta acessar login/register → redireciona
  if (isAuthPage && isLogged) {
    return redirect('/admin');
  }

  // 4. Proteção de rotas privadas
  if (isPrivateRoute && !isLogged) {
    return url.pathname.startsWith('/api/')
      ? new Response(JSON.stringify({ message: 'Acesso negado' }), {
          status: 401,
        })
      : redirect('/login');
  }

  // 5. Segue normalmente
  return next();
});
