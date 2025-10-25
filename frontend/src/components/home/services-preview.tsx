'use client'

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { Sparkles, Clock, ArrowRight } from 'lucide-react'
import { formatCurrency } from '@/lib/utils'

const services = [
  {
    id: 1,
    name: 'Masaje Relajante',
    category: 'Masajes',
    duration: 60,
    price: 15000,
    description: 'Masaje de cuerpo completo con aceites esenciales para liberar tensiones y promover la relajación profunda.',
    image: '/images/services/massage.jpg',
    featured: true,
  },
  {
    id: 2,
    name: 'Facial Rejuvenecedor',
    category: 'Faciales',
    duration: 75,
    price: 18000,
    description: 'Tratamiento facial intensivo con productos premium que revitaliza y nutre tu piel en profundidad.',
    image: '/images/services/facial.jpg',
    featured: true,
  },
  {
    id: 3,
    name: 'Ritual de Piedras Calientes',
    category: 'Rituales',
    duration: 90,
    price: 22000,
    description: 'Experiencia única combinando masaje con piedras volcánicas calientes para equilibrio y bienestar.',
    image: '/images/services/stones.jpg',
    featured: true,
  },
]

export function ServicesPreview() {
  return (
    <section className="py-20 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">
            Nuestros <span className="gradient-text">Servicios</span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Tratamientos profesionales diseñados para tu bienestar integral
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {services.map((service) => (
            <Card key={service.id} className="hover-lift overflow-hidden group">
              {/* Image Placeholder */}
              <div className="relative h-48 bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900 dark:to-pink-900 overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <Sparkles className="h-16 w-16 text-purple-600 opacity-50" />
                </div>
                {service.featured && (
                  <div className="absolute top-4 right-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-3 py-1 rounded-full text-xs font-semibold">
                    Popular
                  </div>
                )}
              </div>

              <CardHeader>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-semibold text-purple-600 uppercase tracking-wide">
                    {service.category}
                  </span>
                  <div className="flex items-center text-sm text-gray-500">
                    <Clock className="h-4 w-4 mr-1" />
                    {service.duration} min
                  </div>
                </div>
                <CardTitle className="text-xl">{service.name}</CardTitle>
                <CardDescription className="line-clamp-2">{service.description}</CardDescription>
              </CardHeader>

              <CardContent>
                <div className="text-2xl font-bold gradient-text">
                  {formatCurrency(service.price)}
                </div>
              </CardContent>

              <CardFooter>
                <Button className="w-full group-hover:bg-gradient-to-r group-hover:from-purple-600 group-hover:to-pink-600" asChild>
                  <Link href={`/servicios/${service.id}`}>
                    Reservar
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center">
          <Button size="lg" variant="outline" asChild>
            <Link href="/servicios">
              Ver Todos los Servicios
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
