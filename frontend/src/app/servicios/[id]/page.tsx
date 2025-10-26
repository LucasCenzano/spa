'use client'

import { useState } from 'react'
import { useParams } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import Link from 'next/link'
import { Navbar } from '@/components/layout/navbar'
import { Footer } from '@/components/layout/footer'

export default function ServiceDetailPage() {
  const params = useParams()
  const serviceId = params.id
  const [selectedAddOns, setSelectedAddOns] = useState<number[]>([])
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  // Mock service data - replace with actual data fetching
  const services = {
    '1': {
      id: 1,
      name: 'Masaje Relajante',
      category: 'masajes',
      description: 'Un masaje completo de 60 minutos diseñado para aliviar el estrés y la tensión muscular. Utilizamos técnicas suaves y aceites aromáticos para una experiencia relajante y rejuvenecedora.',
      price: 120,
      duration: '60 minutos',
      image: '/images/masaje-relajante.jpg',
      gallery: [
        '/images/masaje-relajante-1.jpg',
        '/images/masaje-relajante-2.jpg',
        '/images/masaje-relajante-3.jpg'
      ],
      addOns: [
        { id: 1, name: 'Aromaterapia', price: 15, description: 'Aceites esenciales personalizados' },
        { id: 2, name: 'Exfoliación', price: 25, description: 'Exfoliación corporal completa' },
        { id: 3, name: 'Sauna', price: 20, description: 'Sesión de sauna de 15 minutos' }
      ],
      benefits: [
        'Reduce el estrés y la ansiedad',
        'Mejora la circulación sanguínea',
        'Alivia la tensión muscular',
        'Promueve la relajación profunda',
        'Mejora la calidad del sueño'
      ],
      includes: [
        'Masaje completo de 60 minutos',
        'Aceites aromáticos premium',
        'Ambiente relajante con música',
        'Toallas y ropa de spa',
        'Té relajante post-masaje'
      ],
      popular: true
    },
    '2': {
      id: 2,
      name: 'Facial Hidratante',
      category: 'faciales',
      description: 'Tratamiento facial profundo que hidrata y rejuvenece la piel. Incluye limpieza, exfoliación, mascarilla y masaje facial para una piel radiante y saludable.',
      price: 80,
      duration: '45 minutos',
      image: '/images/facial-hidratante.jpg',
      gallery: [
        '/images/facial-hidratante-1.jpg',
        '/images/facial-hidratante-2.jpg'
      ],
      addOns: [
        { id: 1, name: 'Mascarilla de Oro', price: 30, description: 'Mascarilla facial con partículas de oro' },
        { id: 2, name: 'Radiofrecuencia', price: 40, description: 'Tratamiento de radiofrecuencia facial' }
      ],
      benefits: [
        'Hidrata profundamente la piel',
        'Reduce las líneas de expresión',
        'Mejora la textura de la piel',
        'Elimina impurezas y toxinas',
        'Proporciona un brillo natural'
      ],
      includes: [
        'Limpieza facial profunda',
        'Exfoliación suave',
        'Mascarilla hidratante',
        'Masaje facial relajante',
        'Hidratación final con crema'
      ],
      popular: false
    }
  }

  const service = services[serviceId as keyof typeof services]

  if (!service) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex items-center justify-center pt-24">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Servicio no encontrado</h1>
            <p className="text-gray-600 mb-6">El servicio que buscas no existe.</p>
            <Link href="/servicios">
              <Button>Ver todos los servicios</Button>
            </Link>
          </div>
        </div>
        <Footer />
      </>
    )
  }

  const toggleAddOn = (addOnId: number) => {
    setSelectedAddOns(prev => 
      prev.includes(addOnId) 
        ? prev.filter(id => id !== addOnId)
        : [...prev, addOnId]
    )
  }

  const calculateTotal = () => {
    const addOnTotal = service.addOns
      .filter(addon => selectedAddOns.includes(addon.id))
      .reduce((sum, addon) => sum + addon.price, 0)
    return service.price + addOnTotal
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-24 pb-16 bg-gradient-to-br from-purple-50 to-pink-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <nav className="mb-8">
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <Link href="/" className="hover:text-purple-600">Inicio</Link>
              <span>/</span>
              <Link href="/servicios" className="hover:text-purple-600">Servicios</Link>
              <span>/</span>
              <span className="text-gray-900">{service.name}</span>
            </div>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Service Images */}
            <div className="lg:col-span-2">
              <Card className="overflow-hidden">
                <div className="relative">
                  <div className="h-96 bg-gradient-to-br from-purple-200 to-pink-200 flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mx-auto mb-4">
                        <span className="text-4xl">
                          {service.category === 'masajes' ? '💆' : 
                           service.category === 'faciales' ? '✨' : '🧖‍♀️'}
                        </span>
                      </div>
                      <p className="text-gray-600">Galería de imágenes</p>
                    </div>
                  </div>
                  {service.popular && (
                    <div className="absolute top-4 right-4 bg-yellow-400 text-yellow-900 px-3 py-1 rounded-full text-sm font-semibold">
                      ⭐ Popular
                    </div>
                  )}
                </div>
                
                {/* Image Gallery Thumbnails */}
                <div className="p-4">
                  <div className="flex space-x-2">
                    {service.gallery.map((image, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentImageIndex(index)}
                        className={`w-16 h-16 rounded-lg border-2 ${
                          currentImageIndex === index 
                            ? 'border-purple-500' 
                            : 'border-gray-200'
                        }`}
                      >
                        <div className="w-full h-full bg-gray-200 rounded-md flex items-center justify-center">
                          <span className="text-xs text-gray-500">{index + 1}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </Card>
            </div>

            {/* Service Info & Booking */}
            <div className="lg:col-span-1">
              <Card className="p-6 sticky top-24">
                <div className="mb-6">
                  <h1 className="text-3xl font-bold gradient-text mb-2">{service.name}</h1>
                  <div className="flex items-center text-gray-600 mb-4">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {service.duration}
                  </div>
                  <div className="text-3xl font-bold text-purple-600 mb-4">
                    ${service.price}
                  </div>
                </div>

                {/* Add-ons */}
                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-3">Add-ons Disponibles</h3>
                  <div className="space-y-2">
                    {service.addOns.map((addon) => (
                      <label key={addon.id} className="flex items-center space-x-3 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={selectedAddOns.includes(addon.id)}
                          onChange={() => toggleAddOn(addon.id)}
                          className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                        />
                        <div className="flex-1">
                          <div className="font-medium">{addon.name}</div>
                          <div className="text-sm text-gray-600">{addon.description}</div>
                        </div>
                        <div className="font-semibold text-purple-600">+${addon.price}</div>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Total */}
                <div className="border-t pt-4 mb-6">
                  <div className="flex justify-between items-center text-lg font-semibold">
                    <span>Total:</span>
                    <span className="text-purple-600">${calculateTotal()}</span>
                  </div>
                </div>

                {/* Booking Buttons */}
                <div className="space-y-3">
                  <Link href={`/reservas?service=${service.id}&addons=${selectedAddOns.join(',')}`}>
                    <Button className="w-full" size="lg">
                      Reservar Ahora
                    </Button>
                  </Link>
                  <Link href="/servicios">
                    <Button variant="outline" className="w-full">
                      Ver todos los servicios
                    </Button>
                  </Link>
                </div>
              </Card>
            </div>
          </div>

          {/* Service Details */}
          <div className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Description */}
            <Card className="p-6">
              <h2 className="text-2xl font-bold gradient-text mb-4">Descripción</h2>
              <p className="text-gray-600 leading-relaxed">{service.description}</p>
            </Card>

            {/* Benefits */}
            <Card className="p-6">
              <h2 className="text-2xl font-bold gradient-text mb-4">Beneficios</h2>
              <ul className="space-y-2">
                {service.benefits.map((benefit, index) => (
                  <li key={index} className="flex items-center text-gray-600">
                    <svg className="w-5 h-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    {benefit}
                  </li>
                ))}
              </ul>
            </Card>

            {/* Includes */}
            <Card className="p-6">
              <h2 className="text-2xl font-bold gradient-text mb-4">Incluye</h2>
              <ul className="space-y-2">
                {service.includes.map((item, index) => (
                  <li key={index} className="flex items-center text-gray-600">
                    <svg className="w-5 h-5 text-purple-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
            </Card>

            {/* Related Services */}
            <Card className="p-6">
              <h2 className="text-2xl font-bold gradient-text mb-4">Servicios Relacionados</h2>
              <div className="space-y-3">
                <Link href="/servicios/2" className="block p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <div className="font-semibold">Facial Hidratante</div>
                  <div className="text-sm text-gray-600">45 minutos - $80</div>
                </Link>
                <Link href="/servicios/3" className="block p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <div className="font-semibold">Ritual Detox</div>
                  <div className="text-sm text-gray-600">90 minutos - $180</div>
                </Link>
              </div>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
