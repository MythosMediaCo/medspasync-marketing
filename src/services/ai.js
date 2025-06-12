import api from './api.js';

export async function callAIFlagging(records = []) {
  try {
    const res = await api.post('/ai/flag-anomaly', { records });
    return res.data;
  } catch (err) {
    console.error('AI flagging failed:', err);
    return records;
  }
}
