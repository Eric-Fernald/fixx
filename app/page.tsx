import Link from 'next/link'
import { MapPin, Search, Plus, Users } from 'lucide-react'

export default function Home() {
  return (
    <div className="bg-gradient-to-br from-green-50 to-blue-50">
      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Find Repair Cafes & 
            <span className="text-green-600"> Repair Services</span> Near You
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Discover local repair cafes, sustainable repair services, and community workshops. 
            Join the movement to reduce waste and build stronger communities.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/search"
              className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg font-semibold flex items-center justify-center space-x-2 transition-colors"
            >
              <Search className="h-5 w-5" />
              <span>Find Repairs</span>
            </Link>
            <Link 
              href="/add"
              className="bg-white hover:bg-gray-50 text-gray-900 px-8 py-3 rounded-lg font-semibold border border-gray-300 flex items-center justify-center space-x-2 transition-colors"
            >
              <Plus className="h-5 w-5" />
              <span>Add Location</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            How It Works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Search className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Search & Discover</h3>
              <p className="text-gray-600">
                Find repair cafes and services in your area using our interactive map and search features.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <MapPin className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Get Directions</h3>
              <p className="text-gray-600">
                View detailed information, hours, services offered, and get directions to repair locations.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-purple-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Join Community</h3>
              <p className="text-gray-600">
                Leave reviews, share photos, and help others discover great repair services.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">
            Join the Repair Movement
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="text-4xl font-bold text-green-600 mb-2">50+</div>
              <div className="text-gray-600">Repair Locations</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-green-600 mb-2">1000+</div>
              <div className="text-gray-600">Items Repaired</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-green-600 mb-2">100+</div>
              <div className="text-gray-600">Community Members</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-green-600 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Start Repairing?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Find a repair cafe near you or add your local repair service to help others.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/search"
              className="bg-white hover:bg-gray-100 text-green-600 px-8 py-3 rounded-lg font-semibold transition-colors"
            >
              Browse Locations
            </Link>
            <Link 
              href="/add"
              className="bg-transparent hover:bg-green-700 text-white px-8 py-3 rounded-lg font-semibold border-2 border-white transition-colors"
            >
              Add Your Business
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
