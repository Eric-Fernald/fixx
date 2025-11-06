'use client'

import { useState, useEffect } from 'react'
import { Search, MapPin, Filter } from 'lucide-react'
import LocationCard from '@/components/LocationCard'
import { supabase } from '@/lib/supabase'
import type { Database } from '@/lib/supabase'

type RepairLocation = Database['public']['Tables']['repair_locations']['Row']

export default function SearchPage() {
  const [locations, setLocations] = useState<RepairLocation[]>([])
  const [filteredLocations, setFilteredLocations] = useState<RepairLocation[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedType, setSelectedType] = useState<string>('all')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchLocations()
  }, [])

  useEffect(() => {
    filterLocations()
  }, [searchTerm, selectedType, locations])

  const fetchLocations = async () => {
    try {
      const { data, error } = await supabase
        .from('repair_locations')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) {
        console.error('Error fetching locations:', error)
        return
      }

      setLocations(data || [])
    } catch (error) {
      console.error('Error:', error)
    } finally {
      setLoading(false)
    }
  }

  const filterLocations = () => {
    let filtered = locations

    // Filter by search term
    if (searchTerm) {
      const term = searchTerm.toLowerCase()
      filtered = filtered.filter(location => 
        location.name.toLowerCase().includes(term) ||
        location.address.toLowerCase().includes(term) ||
        location.description?.toLowerCase().includes(term) ||
        location.services?.some(service => service.toLowerCase().includes(term))
      )
    }

    // Filter by type
    if (selectedType !== 'all') {
      filtered = filtered.filter(location => location.location_type === selectedType)
    }

    setFilteredLocations(filtered)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Find Repair Services</h1>
          
          {/* Search and Filters */}
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search Input */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search by name, location, or service..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>

            {/* Type Filter */}
            <div className="flex items-center space-x-2">
              <Filter className="h-5 w-5 text-gray-400" />
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              >
                <option value="all">All Types</option>
                <option value="repair_cafe">Repair Cafes</option>
                <option value="commercial_shop">Commercial Shops</option>
                <option value="mobile_service">Mobile Services</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading repair locations...</p>
          </div>
        ) : (
          <>
            {/* Results Count */}
            <div className="mb-6">
              <p className="text-gray-600">
                {filteredLocations.length} repair {filteredLocations.length === 1 ? 'location' : 'locations'} found
              </p>
            </div>

            {/* Results Grid */}
            {filteredLocations.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredLocations.map((location) => (
                  <LocationCard key={location.id} location={location} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <MapPin className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No locations found</h3>
                <p className="text-gray-600 mb-4">
                  Try adjusting your search terms or filters.
                </p>
                <button
                  onClick={() => {
                    setSearchTerm('')
                    setSelectedType('all')
                  }}
                  className="text-green-600 hover:text-green-700 font-medium"
                >
                  Clear filters
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}