import { publicUrl } from "@/env.mjs";

export const dynamic = "force-static";
export const revalidate = false;

export async function GET() {
  const robotsTxt = `
User-agent: *
Allow: /
Sitemap: ${publicUrl}/sitemap.xml
`.trim();

  return new Response(robotsTxt, {
    headers: {
      'Content-Type': 'text/plain',
    },
  });
} 