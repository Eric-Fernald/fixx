'use client'

import { useState, useEffect } from 'react'
import { Search, MapPin, Filter } from 'lucide-react'
import LocationCard from '@/components/LocationCard'
import { supabase } from '@/lib/supabase'
import type { Database } from '@/lib/supabase'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Card, CardContent } from '@/components/ui/card'

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
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h1 className="text-3xl font-bold mb-4">Find Repair Services</h1>
          
          {/* Search and Filters */}
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search Input */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search by name, location, or service..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Type Filter */}
            <div className="flex items-center space-x-2">
              <Filter className="h-4 w-4 text-muted-foreground" />
              <Select value={selectedType} onValueChange={setSelectedType}>
                <SelectTrigger className="w-[200px]">
                  <SelectValue placeholder="Filter by type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="repair_cafe">Repair Cafes</SelectItem>
                  <SelectItem value="commercial_shop">Commercial Shops</SelectItem>
                  <SelectItem value="mobile_service">Mobile Services</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
            <p className="mt-4 text-muted-foreground">Loading repair locations...</p>
          </div>
        ) : (
          <>
            {/* Results Count */}
            <div className="mb-6">
              <p className="text-muted-foreground">
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
              <Card>
                <CardContent className="text-center py-12">
                  <MapPin className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-medium mb-2">No locations found</h3>
                  <p className="text-muted-foreground mb-4">
                    Try adjusting your search terms or filters.
                  </p>
                  <button
                    onClick={() => {
                      setSearchTerm('')
                      setSelectedType('all')
                    }}
                    className="text-primary hover:underline font-medium"
                  >
                    Clear filters
                  </button>
                </CardContent>
              </Card>
            )}
          </>
        )}
      </div>
    </div>
  )
}