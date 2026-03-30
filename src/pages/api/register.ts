import type { APIRoute } from 'astro';
import { connectDB } from '@/lib/mongodb';
import { User } from '@/lib/models/User';
import bcrypt from 'bcryptjs';

export const POST: APIRoute = async ({ request }) => {
  try {
    await connectDB();
    const { username, password } = await request.json();

    if (!username || !password)
      return new Response(
        JSON.stringify({ message: 'Usuário e senha são obrigatórios' }),
        { status: 400 },
      );

    const existingUser = await User.findOne({ username });
    if (existingUser)
      return new Response(
        JSON.stringify({ message: 'Este nome de usuário já está em uso' }),
        { status: 409 },
      );

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      username,
      password: hashedPassword,
    });

    await newUser.save();

    return new Response(
      JSON.stringify({ success: true, message: 'Usuário criado com sucesso!' }),
      { status: 201 },
    );
  } catch (error) {
    console.error('Erro no registro:', error);
    return new Response(
      JSON.stringify({ message: 'Erro interno ao criar usuário' }),
      { status: 500 },
    );
  }
};
