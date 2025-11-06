'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import { MapPin, Phone, Globe, Clock, Star, Calendar } from 'lucide-react'
import { supabase } from '@/lib/supabase'
import type { Database } from '@/lib/supabase'

type RepairLocation = Database['public']['Tables']['repair_locations']['Row']

export default function LocationDetailPage() {
  const params = useParams()
  const [location, setLocation] = useState<RepairLocation | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (params.id) {
      fetchLocation(params.id as string)
    }
  }, [params.id])

  const fetchLocation = async (id: string) => {
    try {
      const { data, error } = await supabase
        .from('repair_locations')
        .select('*')
        .eq('id', id)
        .single()

      if (error) {
        console.error('Error fetching location:', error)
        return
      }

      setLocation(data)
    } catch (error) {
      console.error('Error:', error)
    } finally {
      setLoading(false)
    }
  }

  const getLocationTypeLabel = (type: string) => {
    switch (type) {
      case 'repair_cafe':
        return 'Repair Cafe'
      case 'commercial_shop':
        return 'Commercial Shop'
      case 'mobile_service':
        return 'Mobile Service'
      default:
        return 'Repair Service'
    }
  }

  const getLocationTypeColor = (type: string) => {
    switch (type) {
      case 'repair_cafe':
        return 'bg-green-100 text-green-800'
      case 'commercial_shop':
        return 'bg-blue-100 text-blue-800'
      case 'mobile_service':
        return 'bg-purple-100 text-purple-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading location details...</p>
        </div>
      </div>
    )
  }

  if (!location) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <MapPin className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Location not found</h1>
          <p className="text-gray-600">The repair location you're looking for doesn't exist.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-white border-b">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row md:items-start md:justify-between">
            <div className="flex-1">
              <div className="flex items-center space-x-3 mb-4">
                <h1 className="text-3xl font-bold text-gray-900">{location.name}</h1>
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getLocationTypeColor(location.location_type)}`}>
                  {getLocationTypeLabel(location.location_type)}
                </span>
              </div>
              
              {location.description && (
                <p className="text-lg text-gray-600 mb-4">{location.description}</p>
              )}

              <div className="flex items-center space-x-1 mb-4">
                <Star className="h-5 w-5 text-yellow-400 fill-current" />
                <span className="text-lg font-medium text-gray-900">4.5</span>
                <span className="text-gray-500">(12 reviews)</span>
              </div>
            </div>

            <div className="mt-4 md:mt-0 md:ml-8">
              <button className="w-full md:w-auto bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors">
                Get Directions
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Services */}
            {location.services && location.services.length > 0 && (
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Services Offered</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {location.services.map((service, index) => (
                    <div
                      key={index}
                      className="bg-gray-50 rounded-lg p-3 text-center text-sm font-medium text-gray-700"
                    >
                      {service}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Map Placeholder */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Location</h2>
              <div className="bg-gray-200 rounded-lg h-64 flex items-center justify-center">
                <div className="text-center text-gray-500">
                  <MapPin className="h-12 w-12 mx-auto mb-2" />
                  <p>Interactive map will appear here</p>
                  <p className="text-sm">(MapBox integration needed)</p>
                </div>
              </div>
            </div>

            {/* Reviews Placeholder */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Reviews</h2>
              <div className="space-y-4">
                {/* Sample Review */}
                <div className="border-b border-gray-200 pb-4">
                  <div className="flex items-center space-x-1 mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                    ))}
                    <span className="text-sm text-gray-500 ml-2">2 weeks ago</span>
                  </div>
                  <p className="text-gray-700">
                    Great service! They fixed my laptop quickly and at a reasonable price. 
                    The staff was very knowledgeable and friendly.
                  </p>
                  <p className="text-sm text-gray-500 mt-1">- Sarah M.</p>
                </div>
                
                <div className="text-center py-8 text-gray-500">
                  <p>More reviews will appear here</p>
                  <button className="mt-2 text-green-600 hover:text-green-700 font-medium">
                    Write a review
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Contact Information */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Contact Information</h3>
              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <MapPin className="h-5 w-5 text-gray-400 mt-0.5 flex-shrink-0" />
                  <p className="text-gray-700">{location.address}</p>
                </div>
                
                {location.phone && (
                  <div className="flex items-center space-x-3">
                    <Phone className="h-5 w-5 text-gray-400 flex-shrink-0" />
                    <a 
                      href={`tel:${location.phone}`}
                      className="text-green-600 hover:text-green-700"
                    >
                      {location.phone}
                    </a>
                  </div>
                )}
                
                {location.website && (
                  <div className="flex items-center space-x-3">
                    <Globe className="h-5 w-5 text-gray-400 flex-shrink-0" />
                    <a 
                      href={location.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-green-600 hover:text-green-700 break-all"
                    >
                      Visit Website
                    </a>
                  </div>
                )}
              </div>
            </div>

            {/* Hours Placeholder */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Hours</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Monday</span>
                  <span className="text-gray-900">9:00 AM - 5:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Tuesday</span>
                  <span className="text-gray-900">9:00 AM - 5:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Wednesday</span>
                  <span className="text-gray-900">9:00 AM - 5:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Thursday</span>
                  <span className="text-gray-900">9:00 AM - 5:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Friday</span>
                  <span className="text-gray-900">9:00 AM - 5:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Saturday</span>
                  <span className="text-gray-900">10:00 AM - 3:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Sunday</span>
                  <span className="text-gray-900">Closed</span>
                </div>
              </div>
              <p className="text-xs text-gray-500 mt-3">
                Hours may vary - call to confirm
              </p>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <button className="w-full bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-md transition-colors">
                  Get Directions
                </button>
                <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md transition-colors">
                  Write Review
                </button>
                <button className="w-full bg-gray-600 hover:bg-gray-700 text-white py-2 px-4 rounded-md transition-colors">
                  Share Location
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}