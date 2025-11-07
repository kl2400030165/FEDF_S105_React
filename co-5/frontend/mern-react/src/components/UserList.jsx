import { useEffect, useState } from 'react'
import { fetchUsers } from '../api'

export default function UserList({ refreshKey }) {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let isMounted = true
    setLoading(true)
    fetchUsers()
      .then(data => { if (isMounted) setUsers(data) })
      .catch(err => { if (isMounted) setError(err.message) })
      .finally(() => { if (isMounted) setLoading(false) })
    return () => { isMounted = false }
  }, [refreshKey])

  if (loading) return <p>Loading users…</p>
  if (error) return <p style={{color:'crimson'}}>Error: {error}</p>

  if (!users.length) return <p>No users yet. Add one!</p>

  return (
    <ul style={{lineHeight: '1.9'}}>
      {users.map(u => (
        <li key={u._id}>
          <strong>{u.name}</strong> — <code>{u.email}</code>
        </li>
      ))}
    </ul>
  )
}