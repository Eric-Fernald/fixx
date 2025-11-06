'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { MapPin, Clock, Phone, Globe, Plus, X } from 'lucide-react'
import { supabase } from '@/lib/supabase'

interface AddLocationForm {
  name: string
  description: string
  address: string
  phone: string
  website: string
  location_type: 'repair_cafe' | 'commercial_shop' | 'mobile_service'
  services: string[]
}

export default function AddLocationPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [services, setServices] = useState<string[]>([])
  const [serviceInput, setServiceInput] = useState('')

  const { register, handleSubmit, formState: { errors }, setValue } = useForm<AddLocationForm>()

  const addService = () => {
    if (serviceInput.trim() && !services.includes(serviceInput.trim())) {
      const newServices = [...services, serviceInput.trim()]
      setServices(newServices)
      setValue('services', newServices)
      setServiceInput('')
    }
  }

  const removeService = (serviceToRemove: string) => {
    const newServices = services.filter(service => service !== serviceToRemove)
    setServices(newServices)
    setValue('services', newServices)
  }

  // Mock geocoding function - in real app, use MapBox geocoding API
  const geocodeAddress = async (address: string) => {
    // For demo purposes, return mock coordinates
    // In production, integrate with MapBox Geocoding API
    return {
      latitude: 40.7128 + (Math.random() - 0.5) * 0.1,
      longitude: -74.0060 + (Math.random() - 0.5) * 0.1
    }
  }

  const onSubmit = async (data: AddLocationForm) => {
    setLoading(true)
    
    try {
      // Geocode the address
      const coordinates = await geocodeAddress(data.address)
      
      // Insert the location
      const { error } = await supabase
        .from('repair_locations')
        .insert({
          name: data.name,
          description: data.description || null,
          address: data.address,
          phone: data.phone || null,
          website: data.website || null,
          location_type: data.location_type,
          services: services.length > 0 ? services : null,
          latitude: coordinates.latitude,
          longitude: coordinates.longitude,
        })

      if (error) {
        console.error('Error adding location:', error)
        alert('Error adding location. Please try again.')
        return
      }

      alert('Location added successfully!')
      router.push('/search')
    } catch (error) {
      console.error('Error:', error)
      alert('Error adding location. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Add Repair Location</h1>
            <p className="text-gray-600">
              Help others discover repair services by adding a new location to our map.
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Basic Information */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Location Name *
              </label>
              <input
                {...register('name', { required: 'Location name is required' })}
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="e.g. Downtown Repair Cafe"
              />
              {errors.name && (
                <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea
                {...register('description')}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="Brief description of the repair service..."
              />
            </div>

            <div>
              <label htmlFor="location_type" className="block text-sm font-medium text-gray-700 mb-1">
                Location Type *
              </label>
              <select
                {...register('location_type', { required: 'Location type is required' })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
              >
                <option value="">Select type...</option>
                <option value="repair_cafe">Repair Cafe</option>
                <option value="commercial_shop">Commercial Shop</option>
                <option value="mobile_service">Mobile Service</option>
              </select>
              {errors.location_type && (
                <p className="mt-1 text-sm text-red-600">{errors.location_type.message}</p>
              )}
            </div>

            {/* Location Information */}
            <div>
              <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                <MapPin className="inline h-4 w-4 mr-1" />
                Address *
              </label>
              <input
                {...register('address', { required: 'Address is required' })}
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="Full street address"
              />
              {errors.address && (
                <p className="mt-1 text-sm text-red-600">{errors.address.message}</p>
              )}
            </div>

            {/* Contact Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                  <Phone className="inline h-4 w-4 mr-1" />
                  Phone Number
                </label>
                <input
                  {...register('phone')}
                  type="tel"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="(555) 123-4567"
                />
              </div>

              <div>
                <label htmlFor="website" className="block text-sm font-medium text-gray-700 mb-1">
                  <Globe className="inline h-4 w-4 mr-1" />
                  Website
                </label>
                <input
                  {...register('website')}
                  type="url"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="https://example.com"
                />
              </div>
            </div>

            {/* Services */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Services Offered
              </label>
              <div className="flex space-x-2 mb-2">
                <input
                  type="text"
                  value={serviceInput}
                  onChange={(e) => setServiceInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addService())}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="e.g. Electronics, Clothing, Bikes"
                />
                <button
                  type="button"
                  onClick={addService}
                  className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md transition-colors"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>
              
              {services.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {services.map((service, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800"
                    >
                      {service}
                      <button
                        type="button"
                        onClick={() => removeService(service)}
                        className="ml-2 text-green-600 hover:text-green-800"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Submit Button */}
            <div className="flex justify-end space-x-4">
              <button
                type="button"
                onClick={() => router.back()}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white px-6 py-2 rounded-md transition-colors flex items-center space-x-2"
              >
                {loading && (
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                )}
                <span>{loading ? 'Adding...' : 'Add Location'}</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}