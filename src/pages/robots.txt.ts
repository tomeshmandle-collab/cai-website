import type { APIRoute } from 'astro';

export const GET: APIRoute = ({ site }) => {
  const baseUrl = site ? site.toString().replace(/\/$/, '') : 'https://cai-kmc.vercel.app';
  const sitemapUrl = `${baseUrl}/sitemap.xml`;

  const robots = `User-agent: *
Allow: /

Sitemap: ${sitemapUrl}
`;

  return new Response(robots, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
    },
  });
};
