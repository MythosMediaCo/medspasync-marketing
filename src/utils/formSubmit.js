// /workspaces/medspasync-marketing/src/utils/formSubmit.js

export async function submitForm({ name, email, business, message, type = 'contact', source = 'marketing_site' }) {
  try {
    const response = await fetch('https://app.medspasyncpro.com/api/leads', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name,
        email,
        business,
        message,
        type,
        source
      })
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Server responded with an error.');
    }

    return { success: true };
  } catch (err) {
    console.error('Form submission failed:', err);
    return { success: false, error: err.message };
  }
}
