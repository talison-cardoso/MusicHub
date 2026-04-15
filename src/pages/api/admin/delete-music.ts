import { DeleteObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { Song } from '@/lib/models/Song';
import type { APIRoute } from 'astro';

const s3 = new S3Client({
  region: 'auto',
  endpoint: `https://${import.meta.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: import.meta.env.R2_ACCESS_KEY_ID,
    secretAccessKey: import.meta.env.R2_SECRET_ACCESS_KEY,
  },
});

export const POST: APIRoute = async ({ request, locals }) => {
  const admin = locals.user;

  if (!admin)
    return new Response(JSON.stringify({ message: 'Não autorizado' }), {
      status: 401,
    });

  const { id, musicKey } = await request.json();

  try {
    const deleteParams = {
      Bucket: import.meta.env.R2_BUCKET_NAME,
      Key: musicKey,
    };
    await s3.send(new DeleteObjectCommand(deleteParams));

    await Song.findByIdAndDelete(id);

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    return new Response(JSON.stringify({ error: errorMessage }), {
      status: 500,
    });
  }
};
