'use client'

import { useParams } from 'next/navigation'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function ServiceDetailPage() {
  const params = useParams()
  const serviceId = params.id

  // Mock service data - replace with actual data fetching
  const services = {
    '1': {
      id: 1,
      name: 'Masaje Relajante',
      description: 'Un masaje completo de 60 minutos diseñado para aliviar el estrés y la tensión muscular.',
      price: 120,
      duration: '60 minutos',
      image: '/images/masaje-relajante.jpg'
    },
    '2': {
      id: 2,
      name: 'Facial Hidratante',
      description: 'Tratamiento facial profundo que hidrata y rejuvenece la piel.',
      price: 80,
      duration: '45 minutos',
      image: '/images/facial-hidratante.jpg'
    }
  }

  const service = services[serviceId as keyof typeof services]

  if (!service) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Servicio no encontrado</h1>
          <p className="text-gray-600 mb-6">El servicio que buscas no existe.</p>
          <Link href="/servicios">
            <Button>Ver todos los servicios</Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="md:flex">
            <div className="md:w-1/2">
              <div className="h-64 md:h-full bg-gradient-to-br from-purple-200 to-pink-200 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">💆</span>
                  </div>
                  <p className="text-gray-600">Imagen del servicio</p>
                </div>
              </div>
            </div>
            <div className="md:w-1/2 p-8">
              <div className="mb-6">
                <h1 className="text-3xl font-bold gradient-text mb-4">{service.name}</h1>
                <p className="text-gray-600 text-lg leading-relaxed">{service.description}</p>
              </div>

              <div className="space-y-4 mb-8">
                <div className="flex justify-between items-center py-3 border-b border-gray-200">
                  <span className="font-medium text-gray-700">Duración</span>
                  <span className="text-gray-900">{service.duration}</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-gray-200">
                  <span className="font-medium text-gray-700">Precio</span>
                  <span className="text-2xl font-bold text-purple-600">${service.price}</span>
                </div>
              </div>

              <div className="space-y-4">
                <Button className="w-full" size="lg">
                  Reservar Ahora
                </Button>
                <Link href="/servicios">
                  <Button variant="outline" className="w-full">
                    Ver todos los servicios
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
