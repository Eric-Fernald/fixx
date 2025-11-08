import Link from 'next/link'
import { MapPin, Phone, Globe, Star } from 'lucide-react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import type { Database } from '@/lib/supabase'

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

  const getLocationTypeVariant = (type: string): "default" | "secondary" | "outline" => {
    switch (type) {
      case 'repair_cafe':
        return 'default'
      case 'commercial_shop':
        return 'secondary'
      case 'mobile_service':
        return 'outline'
      default:
        return 'default'
    }
  }

  return (
    <Card className="flex flex-col h-full hover:shadow-lg transition-shadow">
      <CardHeader>
        <div className="flex justify-between items-start gap-2">
          <CardTitle className="text-xl">
            <Link href={`/location/${location.id}`} className="hover:text-primary transition-colors">
              {location.name}
            </Link>
          </CardTitle>
          <div className="flex flex-col items-end gap-1">
            <Badge variant={getLocationTypeVariant(location.location_type)}>
              {getLocationTypeLabel(location.location_type)}
            </Badge>
            {distance && (
              <span className="text-sm text-muted-foreground font-medium">
                {distance.toFixed(1)} km
              </span>
            )}
          </div>
        </div>
        {location.description && (
          <CardDescription className="line-clamp-2">
            {location.description}
          </CardDescription>
        )}
      </CardHeader>

      <CardContent className="flex-1 space-y-3">
        <div className="flex items-start space-x-2 text-sm">
          <MapPin className="h-4 w-4 mt-0.5 text-muted-foreground flex-shrink-0" />
          <span className="text-muted-foreground">{location.address}</span>
        </div>

        {location.phone && (
          <div className="flex items-center space-x-2 text-sm">
            <Phone className="h-4 w-4 text-muted-foreground flex-shrink-0" />
            <a href={`tel:${location.phone}`} className="text-muted-foreground hover:text-primary">
              {location.phone}
            </a>
          </div>
        )}

        {location.website && (
          <div className="flex items-center space-x-2 text-sm">
            <Globe className="h-4 w-4 text-muted-foreground flex-shrink-0" />
            <a 
              href={location.website}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary truncate"
            >
              Visit Website
            </a>
          </div>
        )}

        {location.services && location.services.length > 0 && (
          <div className="flex flex-wrap gap-1 pt-2">
            {location.services.slice(0, 3).map((service, index) => (
              <Badge key={index} variant="outline" className="text-xs">
                {service}
              </Badge>
            ))}
            {location.services.length > 3 && (
              <Badge variant="outline" className="text-xs">
                +{location.services.length - 3} more
              </Badge>
            )}
          </div>
        )}

        <div className="flex items-center space-x-1 pt-2">
          <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
          <span className="text-sm font-medium">4.5</span>
          <span className="text-sm text-muted-foreground">(12 reviews)</span>
        </div>
      </CardContent>

      <CardFooter className="pt-4">
        <Button asChild className="w-full">
          <Link href={`/location/${location.id}`}>View Details</Link>
        </Button>
      </CardFooter>
    </Card>
  )
}