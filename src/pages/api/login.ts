import type { APIRoute } from 'astro';
import { connectDB } from '../../lib/mongodb';
import { User } from '../../lib/models/User';
import bcrypt from 'bcryptjs';
import { SignJWT } from 'jose';

const secret = new TextEncoder().encode(import.meta.env.JWT_SECRET);

export const POST: APIRoute = async ({ request, cookies }) => {
  try {
    await connectDB();
    const { username, password } = await request.json();

    const user = await User.findOne({ username });
    if (!user || !(await bcrypt.compare(password, user.password)))
      return new Response(
        JSON.stringify({ message: 'Credenciais inválidas' }),
        { status: 401 },
      );

    // Gerar o JWT
    const token = await new SignJWT({ id: user._id, username: user.username })
      .setProtectedHeader({ alg: 'HS256' })
      .setIssuedAt()
      .setExpirationTime('24h')
      .sign(secret);

    cookies.set('admin-session', token, {
      path: '/',
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      maxAge: 60 * 60 * 24, // 1 dia
    });

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ message: 'Erro interno' }), {
      status: 500,
    });
  }
};
