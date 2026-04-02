import type { APIRoute } from 'astro';
import { connectDB } from '@/lib/mongodb';
import { Song } from '@/lib/models/Song';

export const POST: APIRoute = async ({ request }) => {
  try {
    await connectDB();
    const data = await request.json();

    const newSong = await Song.create({
      title: data.title,
      fileKey: data.musicKey,
      releasedAt: data.releasedAt ? new Date(data.releasedAt) : new Date(),
    });

    return new Response(JSON.stringify(newSong), { status: 201 });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Erro ao salvar' }), {
      status: 500,
    });
  }
};
