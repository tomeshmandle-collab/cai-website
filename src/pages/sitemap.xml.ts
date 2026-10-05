import type { APIRoute } from 'astro';
import { getLivePages } from '../lib/pages';

export const GET: APIRoute = async ({ site }) => {
  const livePages = await getLivePages();
  const baseUrl = site ? site.toString().replace(/\/$/, '') : 'https://cai-kmc.vercel.app';

  const urlsXml = livePages
    .map((page) => {
      const pagePath = page.route === '/' ? '' : page.route;
      const loc = `${baseUrl}${pagePath}`;
      return `  <url>\n    <loc>${loc}</loc>\n  </url>`;
    })
    .join('\n');

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlsXml}
</urlset>`;

  return new Response(sitemap, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
    },
  });
};
