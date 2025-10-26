'use client'

import { useState } from 'react'
import { Navbar } from '@/components/layout/navbar'
import { Footer } from '@/components/layout/footer'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import Link from 'next/link'

// Mock data - En producción esto vendría de una API
const promotions = [
  {
    id: 1,
    title: 'Descuento de Bienvenida',
    description: '¡Primera visita con 20% de descuento! Perfecto para conocer nuestros servicios.',
    discount: 20,
    type: 'percentage',
    originalPrice: null,
    discountedPrice: null,
    category: 'bienvenida',
    validUntil: '2024-12-31',
    image: '/images/promo-bienvenida.jpg',
    services: ['Masaje Relajante', 'Facial Hidratante'],
    terms: 'Válido solo para nuevos clientes. No acumulable con otras promociones.',
    popular: true,
    featured: true
  },
  {
    id: 2,
    title: 'Pack Relajación Completa',
    description: 'Masaje + Facial + Sauna por un precio especial. ¡La combinación perfecta!',
    discount: null,
    type: 'package',
    originalPrice: 280,
    discountedPrice: 220,
    category: 'packages',
    validUntil: '2024-11-30',
    image: '/images/promo-pack-relajacion.jpg',
    services: ['Masaje Relajante', 'Facial Hidratante', 'Sauna'],
    terms: 'Servicios deben realizarse el mismo día. Sujeto a disponibilidad.',
    popular: true,
    featured: false
  },
  {
    id: 3,
    title: 'Martes de Masajes',
    description: 'Todos los martes, 30% de descuento en todos nuestros masajes.',
    discount: 30,
    type: 'percentage',
    originalPrice: null,
    discountedPrice: null,
    category: 'semanal',
    validUntil: '2024-12-31',
    image: '/images/promo-martes.jpg',
    services: ['Masaje Relajante', 'Masaje Deportivo', 'Masaje con Piedras'],
    terms: 'Válido solo los días martes. No acumulable con otras promociones.',
    popular: false,
    featured: false
  },
  {
    id: 4,
    title: 'Gift Card Premium',
    description: 'Compra una Gift Card de $500 y recibe $100 adicionales gratis.',
    discount: 20,
    type: 'giftcard',
    originalPrice: 500,
    discountedPrice: 600,
    category: 'giftcards',
    validUntil: '2024-12-15',
    image: '/images/promo-giftcard.jpg',
    services: ['Todos los servicios'],
    terms: 'Gift Card válida por 12 meses. No reembolsable.',
    popular: false,
    featured: true
  },
  {
    id: 5,
    title: 'Referidos Premium',
    description: 'Trae un amigo y ambos obtienen 25% de descuento en su próxima visita.',
    discount: 25,
    type: 'referral',
    originalPrice: null,
    discountedPrice: null,
    category: 'referidos',
    validUntil: '2024-12-31',
    image: '/images/promo-referidos.jpg',
    services: ['Todos los servicios'],
    terms: 'Ambos clientes deben ser nuevos. Descuento aplicable en la primera visita.',
    popular: false,
    featured: false
  },
  {
    id: 6,
    title: 'Black Friday Spa',
    description: '¡Black Friday especial! Hasta 40% de descuento en servicios seleccionados.',
    discount: 40,
    type: 'percentage',
    originalPrice: null,
    discountedPrice: null,
    category: 'especial',
    validUntil: '2024-11-29',
    image: '/images/promo-black-friday.jpg',
    services: ['Ritual Detox', 'Facial Anti-Edad', 'Masaje Deportivo'],
    terms: 'Válido solo el 29 de noviembre. Sujeto a disponibilidad.',
    popular: true,
    featured: true
  },
  {
    id: 7,
    title: 'Pack Parejas Romántico',
    description: 'Ritual de Parejas con cena incluida. ¡Una experiencia inolvidable!',
    discount: null,
    type: 'package',
    originalPrice: 400,
    discountedPrice: 320,
    category: 'packages',
    validUntil: '2024-12-31',
    image: '/images/promo-parejas.jpg',
    services: ['Ritual de Parejas', 'Cena Íntima', 'Champagne'],
    terms: 'Reserva con 48 horas de anticipación. Incluye cena para dos.',
    popular: false,
    featured: false
  },
  {
    id: 8,
    title: 'Estudiantes y Jubilados',
    description: 'Descuento especial del 15% para estudiantes y jubilados.',
    discount: 15,
    type: 'percentage',
    originalPrice: null,
    discountedPrice: null,
    category: 'social',
    validUntil: '2024-12-31',
    image: '/images/promo-estudiantes.jpg',
    services: ['Todos los servicios'],
    terms: 'Presentar documento que acredite condición. No acumulable.',
    popular: false,
    featured: false
  }
]

const categories = [
  { id: 'all', name: 'Todas las Promociones' },
  { id: 'bienvenida', name: 'Bienvenida' },
  { id: 'packages', name: 'Paquetes' },
  { id: 'semanal', name: 'Promociones Semanales' },
  { id: 'giftcards', name: 'Gift Cards' },
  { id: 'referidos', name: 'Referidos' },
  { id: 'especial', name: 'Ofertas Especiales' },
  { id: 'social', name: 'Descuentos Sociales' }
]

type Promotion = {
  id: number
  title: string
  description: string
  discount: number | null
  type: string
  originalPrice: number | null
  discountedPrice: number | null
  category: string
  validUntil: string
  image: string
  services: string[]
  terms: string
  popular: boolean
  featured: boolean
}

export default function PromocionesPage() {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedPromotion, setSelectedPromotion] = useState<Promotion | null>(null)

  const filteredPromotions = selectedCategory === 'all' 
    ? promotions 
    : promotions.filter(promo => promo.category === selectedCategory)

  const featuredPromotions = promotions.filter(promo => promo.featured)
  const popularPromotions = promotions.filter(promo => promo.popular)

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const isExpiringSoon = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffTime = date.getTime() - now.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays <= 7 && diffDays > 0
  }

  const isExpired = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    return date < now
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-24 pb-16 bg-gradient-to-br from-purple-50 to-pink-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold gradient-text mb-6">
              Promociones Especiales
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Descubre nuestras ofertas exclusivas y ahorra en tus tratamientos favoritos
            </p>
          </div>

          {/* Featured Promotions */}
          {featuredPromotions.length > 0 && (
            <div className="mb-12">
              <h2 className="text-3xl font-bold gradient-text mb-8 text-center">
                ⭐ Promociones Destacadas
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                {featuredPromotions.map((promo) => (
                  <Card key={promo.id} className="overflow-hidden hover:shadow-xl transition-all duration-300 group border-2 border-yellow-200">
                    <div className="relative">
                      <div className="h-48 bg-gradient-to-br from-yellow-200 to-orange-200 flex items-center justify-center">
                        <div className="text-center">
                          <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4">
                            <span className="text-2xl">🎁</span>
                          </div>
                          <p className="text-gray-600">Imagen promocional</p>
                        </div>
                      </div>
                      <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                        ⭐ Destacada
                      </div>
                      {isExpiringSoon(promo.validUntil) && (
                        <div className="absolute top-4 right-4 bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                          ⏰ Pronto vence
                        </div>
                      )}
                    </div>
                    
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-gray-900 mb-2">{promo.title}</h3>
                      <p className="text-gray-600 mb-4 line-clamp-2">{promo.description}</p>
                      
                      <div className="flex items-center justify-between mb-4">
                        {promo.type === 'percentage' && (
                          <div className="text-2xl font-bold text-green-600">
                            -{promo.discount}%
                          </div>
                        )}
                        {promo.type === 'package' && (
                          <div className="text-right">
                            <div className="text-lg text-gray-500 line-through">${promo.originalPrice}</div>
                            <div className="text-2xl font-bold text-green-600">${promo.discountedPrice}</div>
                          </div>
                        )}
                        {promo.type === 'giftcard' && (
                          <div className="text-right">
                            <div className="text-lg text-gray-500 line-through">${promo.originalPrice}</div>
                            <div className="text-2xl font-bold text-green-600">${promo.discountedPrice}</div>
                          </div>
                        )}
                        <div className="text-sm text-gray-500">
                          Válido hasta<br />
                          {formatDate(promo.validUntil)}
                        </div>
                      </div>
                      
                      <Button 
                        className="w-full" 
                        onClick={() => setSelectedPromotion(promo)}
                      >
                        Ver Detalles
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          )}

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

          {/* Promotions Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {filteredPromotions.map((promo) => (
              <Card key={promo.id} className="overflow-hidden hover:shadow-xl transition-all duration-300 group">
                <div className="relative">
                  <div className="h-48 bg-gradient-to-br from-purple-200 to-pink-200 flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4">
                        <span className="text-2xl">
                          {promo.category === 'bienvenida' ? '👋' :
                           promo.category === 'packages' ? '📦' :
                           promo.category === 'semanal' ? '📅' :
                           promo.category === 'giftcards' ? '🎁' :
                           promo.category === 'referidos' ? '👥' :
                           promo.category === 'especial' ? '⭐' :
                           promo.category === 'social' ? '🤝' : '🎉'}
                        </span>
                      </div>
                      <p className="text-gray-600">Imagen promocional</p>
                    </div>
                  </div>
                  {promo.popular && (
                    <div className="absolute top-4 right-4 bg-yellow-400 text-yellow-900 px-3 py-1 rounded-full text-sm font-semibold">
                      🔥 Popular
                    </div>
                  )}
                  {isExpiringSoon(promo.validUntil) && (
                    <div className="absolute top-4 left-4 bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                      ⏰ Pronto vence
                    </div>
                  )}
                  {isExpired(promo.validUntil) && (
                    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                      <div className="bg-red-500 text-white px-4 py-2 rounded-lg font-semibold">
                        Expirada
                      </div>
                    </div>
                  )}
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{promo.title}</h3>
                  <p className="text-gray-600 mb-4 line-clamp-2">{promo.description}</p>
                  
                  <div className="flex items-center justify-between mb-4">
                    {promo.type === 'percentage' && (
                      <div className="text-2xl font-bold text-green-600">
                        -{promo.discount}%
                      </div>
                    )}
                    {promo.type === 'package' && (
                      <div className="text-right">
                        <div className="text-lg text-gray-500 line-through">${promo.originalPrice}</div>
                        <div className="text-2xl font-bold text-green-600">${promo.discountedPrice}</div>
                      </div>
                    )}
                    {promo.type === 'giftcard' && (
                      <div className="text-right">
                        <div className="text-lg text-gray-500 line-through">${promo.originalPrice}</div>
                        <div className="text-2xl font-bold text-green-600">${promo.discountedPrice}</div>
                      </div>
                    )}
                    <div className="text-sm text-gray-500">
                      Válido hasta<br />
                      {formatDate(promo.validUntil)}
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <Button 
                      className="w-full" 
                      onClick={() => setSelectedPromotion(promo)}
                      disabled={isExpired(promo.validUntil)}
                    >
                      {isExpired(promo.validUntil) ? 'Expirada' : 'Ver Detalles'}
                    </Button>
                    {!isExpired(promo.validUntil) && (
                      <Link href={`/reservas?promo=${promo.id}`}>
                        <Button variant="outline" className="w-full">
                          Aplicar Promoción
                        </Button>
                      </Link>
                    )}
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Newsletter Signup */}
          <div className="text-center bg-white rounded-2xl shadow-xl p-12">
            <h2 className="text-3xl font-bold gradient-text mb-4">
              ¿No quieres perderte ninguna oferta?
            </h2>
            <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
              Suscríbete a nuestro newsletter y recibe las mejores promociones directamente en tu email
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
              <input
                type="email"
                placeholder="Tu email"
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <Button size="lg">
                Suscribirse
              </Button>
            </div>
          </div>
        </div>
      </main>

      {/* Promotion Detail Modal */}
      {selectedPromotion && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-6">
                <h2 className="text-3xl font-bold gradient-text">{selectedPromotion.title}</h2>
                <Button 
                  variant="outline" 
                  onClick={() => setSelectedPromotion(null)}
                  className="text-gray-500"
                >
                  ✕
                </Button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Promotion Info */}
                <div>
                  <div className="h-64 bg-gradient-to-br from-purple-200 to-pink-200 rounded-lg flex items-center justify-center mb-6">
                    <div className="text-center">
                      <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-4">
                        <span className="text-3xl">🎁</span>
                      </div>
                      <p className="text-gray-600">Imagen promocional</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span className="font-semibold">Válido hasta:</span>
                      <span>{formatDate(selectedPromotion.validUntil)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-semibold">Categoría:</span>
                      <span className="capitalize">{selectedPromotion.category}</span>
                    </div>
                    {selectedPromotion.type === 'percentage' && (
                      <div className="flex justify-between">
                        <span className="font-semibold">Descuento:</span>
                        <span className="text-2xl font-bold text-green-600">-{selectedPromotion.discount}%</span>
                      </div>
                    )}
                    {selectedPromotion.type === 'package' && (
                      <div className="flex justify-between">
                        <span className="font-semibold">Precio:</span>
                        <div className="text-right">
                          <div className="text-lg text-gray-500 line-through">${selectedPromotion.originalPrice}</div>
                          <div className="text-2xl font-bold text-green-600">${selectedPromotion.discountedPrice}</div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Promotion Details */}
                <div>
                  <h3 className="text-xl font-semibold mb-4">Descripción</h3>
                  <p className="text-gray-600 mb-6">{selectedPromotion.description}</p>

                  <h3 className="text-xl font-semibold mb-4">Servicios Incluidos</h3>
                  <ul className="space-y-2 mb-6">
                    {selectedPromotion.services.map((service, index) => (
                      <li key={index} className="flex items-center text-gray-600">
                        <svg className="w-5 h-5 text-purple-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        {service}
                      </li>
                    ))}
                  </ul>

                  <h3 className="text-xl font-semibold mb-4">Términos y Condiciones</h3>
                  <p className="text-gray-600 mb-6">{selectedPromotion.terms}</p>

                  <div className="space-y-3">
                    <Link href={`/reservas?promo=${selectedPromotion.id}`}>
                      <Button className="w-full" size="lg">
                        Aplicar Promoción
                      </Button>
                    </Link>
                    <Link href="/servicios">
                      <Button variant="outline" className="w-full">
                        Ver Servicios
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
