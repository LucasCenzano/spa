'use client'

import { useState } from 'react'
import { Navbar } from '@/components/layout/navbar'
import { Footer } from '@/components/layout/footer'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import Link from 'next/link'

// Mock data - En producción esto vendría de una API
const services = [
  {
    id: 1,
    name: 'Masaje Relajante',
    category: 'masajes',
    duration: '60 minutos',
    price: 120,
    description: 'Un masaje completo diseñado para aliviar el estrés y la tensión muscular. Utilizamos técnicas suaves y aceites aromáticos para una experiencia relajante.',
    image: '/images/masaje-relajante.jpg',
    gallery: [
      '/images/masaje-relajante-1.jpg',
      '/images/masaje-relajante-2.jpg',
      '/images/masaje-relajante-3.jpg'
    ],
    addOns: [
      { name: 'Aromaterapia', price: 15, description: 'Aceites esenciales personalizados' },
      { name: 'Exfoliación', price: 25, description: 'Exfoliación corporal completa' },
      { name: 'Sauna', price: 20, description: 'Sesión de sauna de 15 minutos' }
    ],
    popular: true
  },
  {
    id: 2,
    name: 'Facial Hidratante',
    category: 'faciales',
    duration: '45 minutos',
    price: 80,
    description: 'Tratamiento facial profundo que hidrata y rejuvenece la piel. Incluye limpieza, exfoliación, mascarilla y masaje facial.',
    image: '/images/facial-hidratante.jpg',
    gallery: [
      '/images/facial-hidratante-1.jpg',
      '/images/facial-hidratante-2.jpg'
    ],
    addOns: [
      { name: 'Mascarilla de Oro', price: 30, description: 'Mascarilla facial con partículas de oro' },
      { name: 'Radiofrecuencia', price: 40, description: 'Tratamiento de radiofrecuencia facial' }
    ],
    popular: false
  },
  {
    id: 3,
    name: 'Ritual Detox',
    category: 'rituales',
    duration: '90 minutos',
    price: 180,
    description: 'Ritual completo de desintoxicación que incluye masaje con piedras calientes, envoltura de algas y sesión de sauna.',
    image: '/images/ritual-detox.jpg',
    gallery: [
      '/images/ritual-detox-1.jpg',
      '/images/ritual-detox-2.jpg',
      '/images/ritual-detox-3.jpg'
    ],
    addOns: [
      { name: 'Piedras Calientes', price: 20, description: 'Masaje con piedras volcánicas calientes' },
      { name: 'Envoltura de Algas', price: 35, description: 'Envoltura corporal con algas marinas' }
    ],
    popular: true
  },
  {
    id: 4,
    name: 'Masaje Deportivo',
    category: 'masajes',
    duration: '75 minutos',
    price: 140,
    description: 'Masaje terapéutico especializado para deportistas. Ayuda a prevenir lesiones y mejorar el rendimiento.',
    image: '/images/masaje-deportivo.jpg',
    gallery: [
      '/images/masaje-deportivo-1.jpg',
      '/images/masaje-deportivo-2.jpg'
    ],
    addOns: [
      { name: 'Crioterapia', price: 25, description: 'Tratamiento con frío terapéutico' },
      { name: 'Kinesiotape', price: 15, description: 'Aplicación de vendaje neuromuscular' }
    ],
    popular: false
  },
  {
    id: 5,
    name: 'Facial Anti-Edad',
    category: 'faciales',
    duration: '60 minutos',
    price: 150,
    description: 'Tratamiento facial avanzado con ingredientes anti-envejecimiento. Incluye microdermoabrasión y radiofrecuencia.',
    image: '/images/facial-anti-edad.jpg',
    gallery: [
      '/images/facial-anti-edad-1.jpg',
      '/images/facial-anti-edad-2.jpg'
    ],
    addOns: [
      { name: 'Microdermoabrasión', price: 40, description: 'Exfoliación profunda con cristales' },
      { name: 'Radiofrecuencia', price: 50, description: 'Tratamiento de radiofrecuencia facial' }
    ],
    popular: true
  },
  {
    id: 6,
    name: 'Ritual de Parejas',
    category: 'rituales',
    duration: '120 minutos',
    price: 320,
    description: 'Experiencia romántica para dos personas. Incluye masaje de parejas, baño de burbujas y cena íntima.',
    image: '/images/ritual-parejas.jpg',
    gallery: [
      '/images/ritual-parejas-1.jpg',
      '/images/ritual-parejas-2.jpg'
    ],
    addOns: [
      { name: 'Champagne', price: 60, description: 'Botella de champagne premium' },
      { name: 'Cena Íntima', price: 80, description: 'Cena romántica para dos' }
    ],
    popular: false
  }
]

const categories = [
  { id: 'all', name: 'Todos los Servicios' },
  { id: 'masajes', name: 'Masajes' },
  { id: 'faciales', name: 'Faciales' },
  { id: 'rituales', name: 'Rituales' }
]

type Service = {
  id: number
  name: string
  category: string
  duration: string
  price: number
  description: string
  image: string
  gallery: string[]
  addOns: {
    name: string
    price: number
    description: string
  }[]
  popular: boolean
}

export default function ServiciosPage() {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedService, setSelectedService] = useState<Service | null>(null)

  const filteredServices = selectedCategory === 'all' 
    ? services 
    : services.filter(service => service.category === selectedCategory)

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-24 pb-16 bg-gradient-to-br from-purple-50 to-pink-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold gradient-text mb-6">
              Nuestros Servicios
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Descubre nuestra amplia gama de tratamientos diseñados para tu bienestar y relajación
            </p>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? 'default' : 'outline'}
                onClick={() => setSelectedCategory(category.id)}
                className="px-6 py-2"
              >
                {category.name}
              </Button>
            ))}
          </div>

          {/* Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {filteredServices.map((service) => (
              <Card key={service.id} className="overflow-hidden hover:shadow-xl transition-all duration-300 group">
                <div className="relative">
                  <div className="h-64 bg-gradient-to-br from-purple-200 to-pink-200 flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4">
                        <span className="text-2xl">
                          {service.category === 'masajes' ? '💆' : 
                           service.category === 'faciales' ? '✨' : '🧖‍♀️'}
                        </span>
                      </div>
                      <p className="text-gray-600">Imagen del servicio</p>
                    </div>
                  </div>
                  {service.popular && (
                    <div className="absolute top-4 right-4 bg-yellow-400 text-yellow-900 px-3 py-1 rounded-full text-sm font-semibold">
                      ⭐ Popular
                    </div>
                  )}
                </div>
                
                <div className="p-6">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-xl font-bold text-gray-900">{service.name}</h3>
                    <span className="text-2xl font-bold text-purple-600">${service.price}</span>
                  </div>
                  
                  <div className="flex items-center text-gray-600 mb-4">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {service.duration}
                  </div>
                  
                  <p className="text-gray-600 mb-6 line-clamp-3">{service.description}</p>
                  
                  <div className="space-y-3">
                    <Button 
                      className="w-full" 
                      onClick={() => setSelectedService(service)}
                    >
                      Ver Detalles
                    </Button>
                    <Link href={`/reservas?service=${service.id}`}>
                      <Button variant="outline" className="w-full">
                        Reservar Ahora
                      </Button>
                    </Link>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* CTA Section */}
          <div className="text-center bg-white rounded-2xl shadow-xl p-12">
            <h2 className="text-3xl font-bold gradient-text mb-4">
              ¿No encuentras lo que buscas?
            </h2>
            <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
              Contáctanos y crearemos un tratamiento personalizado para ti
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contacto">
                <Button size="lg" variant="outline">
                  Contactar
                </Button>
              </Link>
              <Link href="/gift-cards">
                <Button size="lg">
                  Comprar Gift Card
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </main>

      {/* Service Detail Modal */}
      {selectedService && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-6">
                <h2 className="text-3xl font-bold gradient-text">{selectedService.name}</h2>
                <Button 
                  variant="outline" 
                  onClick={() => setSelectedService(null)}
                  className="text-gray-500"
                >
                  ✕
                </Button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Service Info */}
                <div>
                  <div className="h-64 bg-gradient-to-br from-purple-200 to-pink-200 rounded-lg flex items-center justify-center mb-6">
                    <div className="text-center">
                      <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-4">
                        <span className="text-3xl">
                          {selectedService.category === 'masajes' ? '💆' : 
                           selectedService.category === 'faciales' ? '✨' : '🧖‍♀️'}
                        </span>
                      </div>
                      <p className="text-gray-600">Galería de imágenes</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span className="font-semibold">Duración:</span>
                      <span>{selectedService.duration}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-semibold">Precio:</span>
                      <span className="text-2xl font-bold text-purple-600">${selectedService.price}</span>
                    </div>
                  </div>
                </div>

                {/* Service Details */}
                <div>
                  <h3 className="text-xl font-semibold mb-4">Descripción</h3>
                  <p className="text-gray-600 mb-6">{selectedService.description}</p>

                  <h3 className="text-xl font-semibold mb-4">Add-ons Disponibles</h3>
                  <div className="space-y-3 mb-6">
                    {selectedService.addOns.map((addon, index) => (
                      <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                        <div>
                          <div className="font-semibold">{addon.name}</div>
                          <div className="text-sm text-gray-600">{addon.description}</div>
                        </div>
                        <span className="font-bold text-purple-600">+${addon.price}</span>
                      </div>
                    ))}
                  </div>

                  <div className="space-y-3">
                    <Link href={`/reservas?service=${selectedService.id}`}>
                      <Button className="w-full" size="lg">
                        Reservar Ahora
                      </Button>
                    </Link>
                    <Link href={`/servicios/${selectedService.id}`}>
                      <Button variant="outline" className="w-full">
                        Ver Página Completa
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </>
  )
}
