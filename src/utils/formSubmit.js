/**
 * Generic form submission helper.
 * @param {Object} options
 * @param {string} options.endpoint - The API endpoint to POST to.
 * @param {Object} options.data - Payload to send.
 * @returns {Promise<Object>} - Parsed JSON response.
 */
export async function submitForm({ endpoint, data }) {
  if (!endpoint || typeof endpoint !== 'string') {
    throw new Error('Missing or invalid endpoint.');
  }

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data || {}),
    });

    const isJson = response.headers
      .get('content-type')
      ?.includes('application/json');

    const responseBody = isJson ? await response.json() : await response.text();

    if (!response.ok) {
      const errorMessage =
        typeof responseBody === 'string'
          ? responseBody
          : responseBody?.message || 'Form submission failed.';
      throw new Error(errorMessage);
    }

    return responseBody;
  } catch (err) {
    console.error('[submitForm] Error:', err);
    throw err;
  }
}
