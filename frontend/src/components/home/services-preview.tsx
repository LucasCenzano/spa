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
    <section className="py-24 bg-[#FFFBF9]">
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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-12">
          {services.map((service) => (
            <Card key={service.id} className="group overflow-hidden transition-all duration-700 hover:-translate-y-2 hover:shadow-2xl hover:shadow-pink-100/40 border-rose-100/40">
              {/* Image Placeholder */}
              <div className="relative h-56 bg-gradient-to-br from-spa-rose-50 via-pink-50/50 to-spa-green-50/30 overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center transition-transform duration-700 group-hover:scale-110">
                  <Sparkles className="h-20 w-20 text-spa-gold-300 opacity-30 breathe" />
                </div>
                {service.featured && (
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm text-spa-rose-600 px-4 py-1.5 rounded-full text-xs font-semibold shadow-lg border border-rose-100">
                    Popular
                  </div>
                )}
              </div>

              <CardHeader className="pb-4">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-medium text-spa-green-500 uppercase tracking-widest">
                    {service.category}
                  </span>
                  <div className="flex items-center text-sm text-gray-500 font-light">
                    <Clock className="h-4 w-4 mr-1.5" />
                    {service.duration} min
                  </div>
                </div>
                <CardTitle className="text-xl mb-2">{service.name}</CardTitle>
                <CardDescription className="line-clamp-2 leading-relaxed">{service.description}</CardDescription>
              </CardHeader>

              <CardContent className="pb-4">
                <div className="text-3xl font-serif font-bold gradient-text">
                  {formatCurrency(service.price)}
                </div>
              </CardContent>

              <CardFooter className="pt-0">
                <Button
                  variant="outline"
                  className="w-full group-hover:bg-spa-rose-300 group-hover:text-gray-800 group-hover:border-transparent group-hover:shadow-md transition-all duration-500"
                  asChild
                >
                  <Link href={`/servicios/${service.id}`}>
                    Ver Detalles
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
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
