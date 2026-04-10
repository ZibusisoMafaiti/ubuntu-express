import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { geoMercator, geoPath } from 'd3-geo'
import { feature } from 'topojson-client'
import type { Topology } from 'topojson-specification'

// ISO numeric codes for African countries
// These match the world-atlas dataset exactly
const AFRICA_COUNTRIES: Record<number, { name: string; slug: string; enabled: boolean }> = {
  12:  { name: 'Algeria',                  slug: 'algeria',       enabled: false },
  24:  { name: 'Angola',                   slug: 'angola',        enabled: false },
  204: { name: 'Benin',                    slug: 'benin',         enabled: false },
  72:  { name: 'Botswana',                 slug: 'botswana',      enabled: false },
  854: { name: 'Burkina Faso',             slug: 'burkina-faso',  enabled: false },
  108: { name: 'Burundi',                  slug: 'burundi',       enabled: false },
  120: { name: 'Cameroon',                 slug: 'cameroon',      enabled: false },
  140: { name: 'Central African Republic', slug: 'car',           enabled: false },
  148: { name: 'Chad',                     slug: 'chad',          enabled: false },
  178: { name: 'Congo',                    slug: 'congo',         enabled: false },
  180: { name: 'DR Congo',                 slug: 'drc',           enabled: false },
  384: { name: "Côte d'Ivoire",            slug: 'ivory-coast',   enabled: false },
  262: { name: 'Djibouti',                 slug: 'djibouti',      enabled: false },
  818: { name: 'Egypt',                    slug: 'egypt',         enabled: false },
  232: { name: 'Eritrea',                  slug: 'eritrea',       enabled: false },
  231: { name: 'Ethiopia',                 slug: 'ethiopia',      enabled: false },
  266: { name: 'Gabon',                    slug: 'gabon',         enabled: false },
  288: { name: 'Ghana',                    slug: 'ghana',         enabled: false },
  324: { name: 'Guinea',                   slug: 'guinea',        enabled: false },
  404: { name: 'Kenya',                    slug: 'kenya',         enabled: false },
  426: { name: 'Lesotho',                  slug: 'lesotho',       enabled: false },
  430: { name: 'Liberia',                  slug: 'liberia',       enabled: false },
  434: { name: 'Libya',                    slug: 'libya',         enabled: false },
  450: { name: 'Madagascar',               slug: 'madagascar',    enabled: false },
  454: { name: 'Malawi',                   slug: 'malawi',        enabled: false },
  466: { name: 'Mali',                     slug: 'mali',          enabled: false },
  478: { name: 'Mauritania',               slug: 'mauritania',    enabled: false },
  504: { name: 'Morocco',                  slug: 'morocco',       enabled: false },
  508: { name: 'Mozambique',               slug: 'mozambique',    enabled: false },
  516: { name: 'Namibia',                  slug: 'namibia',       enabled: false },
  562: { name: 'Niger',                    slug: 'niger',         enabled: false },
  566: { name: 'Nigeria',                  slug: 'nigeria',       enabled: false },
  646: { name: 'Rwanda',                   slug: 'rwanda',        enabled: false },
  686: { name: 'Senegal',                  slug: 'senegal',       enabled: false },
  694: { name: 'Sierra Leone',             slug: 'sierra-leone',  enabled: false },
  706: { name: 'Somalia',                  slug: 'somalia',       enabled: false },
  710: { name: 'South Africa',             slug: 'south-africa',  enabled: true  },
  728: { name: 'South Sudan',              slug: 'south-sudan',   enabled: false },
  729: { name: 'Sudan',                    slug: 'sudan',         enabled: false },
  748: { name: 'Eswatini',                 slug: 'eswatini',      enabled: false },
  834: { name: 'Tanzania',                 slug: 'tanzania',      enabled: false },
  768: { name: 'Togo',                     slug: 'togo',          enabled: false },
  788: { name: 'Tunisia',                  slug: 'tunisia',       enabled: false },
  800: { name: 'Uganda',                   slug: 'uganda',        enabled: false },
  716: { name: 'Zimbabwe',                 slug: 'zimbabwe',      enabled: false },
}

const WIDTH = 600
const HEIGHT = 660

const projection = geoMercator()
  .center([20, 0])
  .scale(390)
  .translate([WIDTH / 2, HEIGHT / 2])

const pathGenerator = geoPath(projection)

interface CountryPath {
  id: number
  name: string
  slug: string
  enabled: boolean
  d: string
}

export default function Map() {
  const navigate = useNavigate()
  const [countryPaths, setCountryPaths] = useState<CountryPath[]>([])
  const [hovered, setHovered] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json')
      .then((r) => r.json())
      .then((topology: Topology) => {
        const geojson = feature(topology, topology.objects.countries as any) as any
        const paths: CountryPath[] = []

        for (const geo of geojson.features) {
          const id = Number(geo.id)
          const info = AFRICA_COUNTRIES[id]
          if (!info) continue
          const d = pathGenerator(geo)
          if (!d) continue
          paths.push({ id, name: info.name, slug: info.slug, enabled: info.enabled, d })
        }

        setCountryPaths(paths)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  return (
    <div className="min-h-screen bg-[#0a0a2e] flex flex-col items-center justify-center p-4">

      <h1 className="text-white text-3xl font-bold mb-1">
        Choose Your Destination
      </h1>
      <p className="text-yellow-400 text-sm mb-6">
        South Africa is ready — more countries coming soon
      </p>

      {/* Country name tooltip */}
      <div className="h-7 mb-2 flex items-center justify-center">
        {hovered && (
          <span className="bg-yellow-400 text-[#0a0a2e] px-4 py-1 rounded-full text-sm font-semibold">
            {hovered}
          </span>
        )}
      </div>

      {loading ? (
        <p className="text-gray-400 animate-pulse">Loading map...</p>
      ) : (
        <div className="w-full max-w-2xl">
          <svg
            viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
            style={{ width: '100%', height: 'auto' }}
          >
            {countryPaths.map(({ id, name, slug, enabled, d }) => (
              <path
                key={id}
                d={d}
                stroke="#0a0a2e"
                strokeWidth={0.8}
                fill={
                  enabled
                    ? hovered === name
                      ? '#FBBF24'
                      : '#F59E0B'
                    : hovered === name
                    ? '#2a4a6f'
                    : '#1e3a5f'
                }
                style={{ cursor: enabled ? 'pointer' : 'default', transition: 'fill 0.15s ease' }}
                onMouseEnter={() => setHovered(name)}
                onMouseLeave={() => setHovered(null)}
                onClick={() => enabled && navigate(`/episode/${slug}`)}
              />
            ))}
          </svg>
        </div>
      )}

      <button
        onClick={() => navigate('/')}
        className="mt-4 text-yellow-400 underline text-sm"
      >
        ← Back to Home
      </button>
    </div>
  )
}