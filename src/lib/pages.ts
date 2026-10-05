import { getPagesContent } from './content';

export async function getLivePages() {
  const pages = await getPagesContent();
  return pages.filter(p => p.status === 'live').sort((a, b) => a.order - b.order);
}

export async function getMainNav() {
  const pages = await getPagesContent();
  return pages.filter(p => p.nav === 'main').sort((a, b) => a.order - b.order);
}

export async function getMoreNav() {
  const pages = await getPagesContent();
  return pages.filter(p => p.nav === 'more').sort((a, b) => a.order - b.order);
}

export async function getPageByRoute(route: string) {
  const pages = await getPagesContent();
  return pages.find(p => p.route === route);
}
