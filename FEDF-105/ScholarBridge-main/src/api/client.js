const API_BASE = process.env.REACT_APP_API_URL || 'http://localhost:4000/api';

function getToken() {
  return localStorage.getItem('token');
}

async function request(path, { method = 'GET', body, isForm = false } = {}) {
  const headers = {};
  if (!isForm) headers['Content-Type'] = 'application/json';
  const token = getToken();
  if (token) headers['Authorization'] = `Bearer ${token}`;

  const res = await fetch(`${API_BASE}${path}`, {
    method,
    headers,
    body: isForm ? body : body ? JSON.stringify(body) : undefined,
  });
  const contentType = res.headers.get('content-type') || '';
  const data = contentType.includes('application/json') ? await res.json() : await res.text();
  if (!res.ok) {
    const msg = data && data.error ? data.error : (typeof data === 'string' ? data : 'Request failed');
    throw new Error(msg);
  }
  return data;
}

export const api = {
  // Auth
  register: (payload) => request('/auth/register', { method: 'POST', body: payload }),
  login: (payload) => request('/auth/login', { method: 'POST', body: payload }),

  // Events
  getEvents: () => request('/events'),
  createEvent: (payload) => request('/events', { method: 'POST', body: payload }),

  // Certificates
  getCertificates: () => request('/certificates'),
  uploadCertificate: ({ file, title }) => {
    const form = new FormData();
    form.append('file', file);
    if (title) form.append('title', title);
    return request('/certificates', { method: 'POST', body: form, isForm: true });
  },
  deleteCertificate: (id) => request(`/certificates/${id}`, { method: 'DELETE' }),
};

export function setToken(token) { localStorage.setItem('token', token); }
export function clearToken() { localStorage.removeItem('token'); }

// Base URL for static files served by backend (strip trailing /api)
export const fileBaseUrl = API_BASE.replace(/\/api\/?$/, '');
