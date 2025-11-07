import { useState } from 'react'
import UserList from './components/UserList'
import UserForm from './components/UserForm'

export default function App() {
  const [refreshKey, setRefreshKey] = useState(0)

  return (
    <div style={{maxWidth: 800, margin: '40px auto', padding: '0 16px'}}>
      <h1 style={{marginTop:0}}>C05 Users</h1>
      <UserForm onCreated={() => setRefreshKey(k => k + 1)} />
      <hr style={{margin: '24px 0'}} />
      <h3 style={{marginTop:0}}>All Users</h3>
      <UserList refreshKey={refreshKey} />
    </div>
  )
}