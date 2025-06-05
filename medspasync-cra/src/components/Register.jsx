import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { api } from '../api'

export default function Register({ onLogin }) {
  const [form, setForm] = useState({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    practiceId: ''
  })
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const res = await api.post('/auth/register', form)
      console.log('TOKEN:', res.data.token)
      onLogin(res.data.token)
      navigate('/dashboard')
    } catch (err) {
      console.error('[REGISTER_FAIL]', err)
      setError('Registration failed: ' + (err?.response?.data?.message || 'Unknown error'))
    }
  }

  return (
    <div className="max-w-md mx-auto mt-20 bg-white p-6 rounded shadow">
      <h1 className="text-xl font-semibold mb-4">Register</h1>
      {error && <p className="text-red-500 text-sm">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input name="email" type="email" placeholder="Email" className="w-full border p-2 rounded" onChange={handleChange} required />
        <input name="password" type="password" placeholder="Password" className="w-full border p-2 rounded" onChange={handleChange} required />
        <input name="firstName" type="text" placeholder="First Name" className="w-full border p-2 rounded" onChange={handleChange} required />
        <input name="lastName" type="text" placeholder="Last Name" className="w-full border p-2 rounded" onChange={handleChange} required />
        <input name="practiceId" type="text" placeholder="Practice ID (optional)" className="w-full border p-2 rounded" onChange={handleChange} />
        <button type="submit" className="w-full bg-green-600 text-white p-2 rounded hover:bg-green-700">
          Register
        </button>
      </form>
    </div>
  )
}
