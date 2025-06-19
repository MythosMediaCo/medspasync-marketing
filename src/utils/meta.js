// Default metadata for all pages
export const defaultMeta = {
  title: 'MedSpaSync Pro | AI Reconciliation for Medical Spas',
  description:
    'Save 8+ hours weekly and prevent $2,500+ in missed revenue with 95%+ match accuracy. Built by a 10-year medical spa veteran.',
  image: 'https://medspasyncpro.com/og-image.jpg',
  url: 'https://medspasyncpro.com',
};

/**
 * Dynamically inject meta tags into the page head
 * @param {Object} meta - Overrides for default meta
 */
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
    const selector = name ? `meta[name="${name}"]` : `meta[property="${property}"]`;
    let tag = document.head.querySelector(selector);

    if (!tag) {
      tag = document.createElement('meta');
      if (name) tag.setAttribute('name', name);
      if (property) tag.setAttribute('property', property);
      document.head.appendChild(tag);
    }

    tag.setAttribute('content', content);
  });
}
