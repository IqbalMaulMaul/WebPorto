/** Request smaller renderings of the same photo; leave stored URLs and other hosts intact. */
export const imageSrcSet = (source: string, widths = [480, 768, 1200]) => {
  try {
    const url = new URL(source);
    if (url.hostname !== 'images.unsplash.com' || url.protocol !== 'https:') return undefined;
    return widths.map(width => {
      const variant = new URL(url);
      variant.searchParams.set('w', String(width));
      return `${variant.href} ${width}w`;
    }).join(', ');
  } catch {
    return undefined;
  }
};
