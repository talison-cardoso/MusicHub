import type { APIRoute } from 'astro';
import { Song } from '@/lib/models/Song';
import { connectDB } from '@/lib/mongodb';

export const POST: APIRoute = async ({ request, locals }) => {
  try {
    await connectDB();

    const { id, title } = await request.json();

    if (!id || !title) {
      return new Response(
        JSON.stringify({ message: 'ID e Título são obrigatórios' }),
        { status: 400 },
      );
    }

    const updatedSong = await Song.findByIdAndUpdate(
      id,
      { title: title.trim() },
      { new: true },
    );

    if (!updatedSong) {
      return new Response(
        JSON.stringify({ message: 'Música não encontrada' }),
        { status: 404 },
      );
    }

    return new Response(JSON.stringify({ success: true, song: updatedSong }), {
      status: 200,
    });
  } catch (error: any) {
    console.error('Erro ao editar música:', error);
    return new Response(
      JSON.stringify({
        message: 'Erro interno no servidor',
        error: error.message,
      }),
      { status: 500 },
    );
  }
};
