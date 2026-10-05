import type { ImageMetadata } from 'astro';
import placeholderPortrait from '../assets/team/placeholder-portrait.svg';
import placeholderLogo from '../assets/brand/placeholder-logo.svg';
import placeholderAffiliation from '../assets/brand/placeholder-affiliation.svg';

const teamPhotos = import.meta.glob<{ default: ImageMetadata }>('/src/assets/team/*.{jpeg,jpg,png,webp,svg}');
const brandLogos = import.meta.glob<{ default: ImageMetadata }>('/src/assets/brand/*.{jpeg,jpg,png,webp,svg}');

export async function resolvePhoto(filename: string | undefined) {
  if (!filename) return placeholderPortrait;
  const path = `/src/assets/team/${filename}`;
  if (teamPhotos[path]) {
    const mod = await teamPhotos[path]();
    return mod.default;
  }
  return placeholderPortrait;
}

export async function resolveBrandLogo(filename: string | undefined, isAffiliation = false) {
  const fallback = isAffiliation ? placeholderAffiliation : placeholderLogo;
  if (!filename) return fallback;
  
  for (const [key, resolver] of Object.entries(brandLogos)) {
    const filePart = key.split('/').pop() || '';
    if (filePart.startsWith(filename + '.') || filePart === filename) {
      const mod = await resolver();
      return mod.default;
    }
  }
  return fallback;
}
