import type { APIRoute } from 'astro';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

const r2 = new S3Client({
  region: 'auto',
  endpoint: `https://${import.meta.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: import.meta.env.R2_ACCESS_KEY_ID,
    secretAccessKey: import.meta.env.R2_SECRET_ACCESS_KEY,
  },
});

export const POST: APIRoute = async ({ request }) => {
  const { fileName, fileType } = await request.json();
  // const key = `songs/${Date.now()}-${fileName}`;
  const key = `songs/${fileName}`;

  const command = new PutObjectCommand({
    Bucket: import.meta.env.R2_BUCKET_NAME,
    Key: key,
    ContentType: fileType,
    // ContentDisposition: `attachment; filename="${fileName}"`,
  });

  const signedUrl = await getSignedUrl(r2, command, { expiresIn: 60 });
  return new Response(JSON.stringify({ signedUrl, key }));
};
