export async function fetchUsers() {
  const res = await fetch('http://localhost:5000/api/users');

  if (!res.ok) throw new Error('Failed to fetch users');
  return res.json();
}

export async function createUser(payload) {
  const res = await fetch('http://localhost:5000/api/users', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message || 'Failed to create user');
  }
  return res.json();
}