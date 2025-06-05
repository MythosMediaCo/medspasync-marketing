import { useNavigate } from 'react-router-dom'

export default function Dashboard({ onLogout }) {
  const navigate = useNavigate()

  const handleLogout = () => {
    onLogout()
    navigate('/login')
  }

  return (
    <div className="max-w-3xl mx-auto mt-10">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Dashboard</h1>
        <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
          Logout
        </button>
      </div>

      <div className="bg-white p-6 rounded shadow">
        <p className="text-lg">Welcome to MedSpaSync Pro 🎉</p>
        <p className="text-sm mt-2 text-gray-600">Use the upload tab to begin reconciling data.</p>
      </div>
    </div>
  )
}
