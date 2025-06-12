// /workspaces/medspasync-marketing/src/utils/meta.js

export const defaultMeta = {
  title: 'MedSpaSync Pro | Reconciliation Done Right',
  description: 'Automate your Alle and Aspire reward tracking and reclaim lost revenue. Built by medical spa professionals.',
  image: 'https://medspasyncpro.com/og-image.jpg',
  url: 'https://medspasyncpro.com',
};

export function injectMeta(meta = {}) {
  const fullMeta = { ...defaultMeta, ...meta };

  document.title = fullMeta.title;

  const tags = [
    { name: 'description', content: fullMeta.description },
    { property: 'og:title', content: fullMeta.title },
    { property: 'og:description', content: fullMeta.description },
    { property: 'og:image', content: fullMeta.image },
    { property: 'og:url', content: fullMeta.url },
    { property: 'og:type', content: 'website' },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: fullMeta.title },
    { name: 'twitter:description', content: fullMeta.description },
    { name: 'twitter:image', content: fullMeta.image },
  ];

  tags.forEach(({ name, property, content }) => {
    const tag = document.querySelector(
      `meta[${name ? 'name' : 'property'}="${name || property}"]`
    ) || document.createElement('meta');

    if (name) tag.setAttribute('name', name);
    if (property) tag.setAttribute('property', property);
    tag.setAttribute('content', content);
    document.head.appendChild(tag);
  });
}
