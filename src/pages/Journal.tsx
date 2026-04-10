import { useParams, useNavigate } from 'react-router-dom'

const EPISODE_DATA: Record<string, { country: string; flag: string; tagline: string }> = {
  'south-africa': {
    country: 'South Africa',
    flag: '🇿🇦',
    tagline: 'Cape Town — The Penguin Crisis',
  },
}

export default function Episode() {
  const { countryId } = useParams()
  const navigate = useNavigate()
  const episode = countryId ? EPISODE_DATA[countryId] : null

  if (!episode) {
    return (
      <div className="min-h-screen bg-[#0a0a2e] flex items-center justify-center">
        <p className="text-white text-xl">Episode coming soon...</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#0a0a2e] flex flex-col items-center justify-center text-center p-8">
      <span className="text-8xl mb-6">{episode.flag}</span>
      <h1 className="text-white text-4xl font-bold mb-2">{episode.country}</h1>
      <p className="text-yellow-400 text-xl mb-10">{episode.tagline}</p>
      <p className="text-gray-400 mb-10">Episode content coming in the next session...</p>
      <button
        onClick={() => navigate('/map')}
        className="text-yellow-400 underline text-sm"
      >
        ← Back to Map
      </button>
    </div>
  )
}