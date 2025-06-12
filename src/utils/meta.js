export const defaultMeta = {
  title: 'MedSpaSync Pro',
  description: 'The marketing site for MedSpaSync Pro.'
};

export function buildMeta(meta = {}) {
  return { ...defaultMeta, ...meta };
}
