import { getEntry } from 'astro:content';

export async function getSiteContent() {
  const entry = await getEntry('site', 'site');
  return entry!.data;
}

export async function getPagesContent() {
  const entry = await getEntry('pages', 'pages');
  return entry!.data;
}

export async function getHomeContent() {
  const entry = await getEntry('home', 'home');
  return entry!.data;
}

export async function getTeamContent() {
  const entry = await getEntry('team', 'team');
  return entry!.data;
}
