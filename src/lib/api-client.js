const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '';

export async function createEnquiry(payload) {
  const response = await fetch(`${API_BASE_URL}/api/enquiries`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    const error = new Error(data.message || 'Unable to save enquiry.');
    error.issues = data.issues;
    throw error;
  }
  return data;
}

export async function getEnquiries(teamToken) {
  const response = await fetch(`${API_BASE_URL}/api/enquiries`, {
    headers: { 'x-team-token': teamToken },
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(data.message || 'Unable to load enquiries.');
  return data;
}
