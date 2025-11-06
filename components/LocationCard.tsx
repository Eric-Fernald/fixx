import Link from 'next/link'
import { MapPin, Star, Clock, Phone, Globe } from 'lucide-react'
import { Database } from '@/lib/supabase'

type RepairLocation = Database['public']['Tables']['repair_locations']['Row']

interface LocationCardProps {
  location: RepairLocation
  distance?: number // Distance in km
}

export default function LocationCard({ location, distance }: LocationCardProps) {
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

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden">
      <div className="p-6">
        {/* Header */}
        <div className="flex justify-between items-start mb-3">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-1">
              <Link 
                href={`/location/${location.id}`}
                className="hover:text-green-600 transition-colors"
              >
                {location.name}
              </Link>
            </h3>
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getLocationTypeColor(location.location_type)}`}>
              {getLocationTypeLabel(location.location_type)}
            </span>
          </div>
          {distance && (
            <span className="text-sm text-gray-500 font-medium">
              {distance.toFixed(1)} km
            </span>
          )}
        </div>

        {/* Description */}
        {location.description && (
          <p className="text-gray-600 text-sm mb-3 line-clamp-2">
            {location.description}
          </p>
        )}

        {/* Address */}
        <div className="flex items-center text-gray-600 text-sm mb-3">
          <MapPin className="h-4 w-4 mr-2 flex-shrink-0" />
          <span>{location.address}</span>
        </div>

        {/* Services */}
        {location.services && location.services.length > 0 && (
          <div className="mb-3">
            <div className="flex flex-wrap gap-1">
              {location.services.slice(0, 3).map((service, index) => (
                <span 
                  key={index}
                  className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-gray-100 text-gray-800"
                >
                  {service}
                </span>
              ))}
              {location.services.length > 3 && (
                <span className="text-xs text-gray-500">
                  +{location.services.length - 3} more
                </span>
              )}
            </div>
          </div>
        )}

        {/* Contact Info */}
        <div className="flex items-center justify-between">
          <div className="flex space-x-4">
            {location.phone && (
              <a 
                href={`tel:${location.phone}`}
                className="flex items-center text-gray-600 hover:text-green-600 text-sm transition-colors"
              >
                <Phone className="h-4 w-4 mr-1" />
                <span className="sr-only">Phone</span>
              </a>
            )}
            {location.website && (
              <a 
                href={location.website}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center text-gray-600 hover:text-green-600 text-sm transition-colors"
              >
                <Globe className="h-4 w-4 mr-1" />
                <span className="sr-only">Website</span>
              </a>
            )}
          </div>

          {/* Rating placeholder */}
          <div className="flex items-center space-x-1">
            <Star className="h-4 w-4 text-yellow-400 fill-current" />
            <span className="text-sm text-gray-600">4.5</span>
            <span className="text-sm text-gray-400">(12)</span>
          </div>
        </div>
      </div>
    </div>
  )
}