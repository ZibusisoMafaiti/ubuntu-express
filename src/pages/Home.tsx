import { useNavigate } from 'react-router-dom'

export default function Home() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-[#0a0a2e] flex flex-col items-center justify-center text-center p-8">
      <h1 className="text-white text-5xl font-bold mb-4">🌍 The Ubuntu Express</h1>
      <p className="text-yellow-400 text-xl mb-2">An African Adventure</p>
      <p className="text-gray-300 text-base mb-10 max-w-md">
        Join Siya and the crew as they travel across Africa — discovering culture,
        language, and the wonders of the natural world.
      </p>
      <button
        onClick={() => navigate('/map')}
        className="bg-yellow-400 text-[#0a0a2e] font-bold text-lg px-8 py-4 rounded-full hover:bg-yellow-300 transition-colors"
      >
        Start the Adventure →
      </button>
    </div>
  )
}