'use client'

import { useState } from 'react'
import { useSession } from 'next-auth/react'
import { Navbar } from '@/components/layout/navbar'
import { Footer } from '@/components/layout/footer'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import Link from 'next/link'

type Reservation = {
  id: number
  service: string
  date: string
  time: string
  duration: string
  price: number
  therapist: string
  status: string
  addOns: string[]
  rating?: number
}

export default function ReservasPage() {
  const { data: session, status } = useSession()
  const [activeTab, setActiveTab] = useState('upcoming')

  // Mock data - En producción esto vendría de una API
  const reservations = {
    upcoming: [
      {
        id: 1,
        service: 'Masaje Relajante',
        date: '2024-12-15',
        time: '15:30',
        duration: '60 minutos',
        price: 120,
        therapist: 'María González',
        status: 'confirmed',
        addOns: ['Aromaterapia (+$15)']
      },
      {
        id: 2,
        service: 'Facial Hidratante',
        date: '2024-12-22',
        time: '10:00',
        duration: '45 minutos',
        price: 80,
        therapist: 'Ana Martínez',
        status: 'pending',
        addOns: []
      }
    ],
    past: [
      {
        id: 3,
        service: 'Ritual Detox',
        date: '2024-11-28',
        time: '14:00',
        duration: '90 minutos',
        price: 180,
        therapist: 'Carlos López',
        status: 'completed',
        addOns: ['Sauna (+$20)'],
        rating: 5
      },
      {
        id: 4,
        service: 'Masaje Deportivo',
        date: '2024-11-15',
        time: '16:30',
        duration: '75 minutos',
        price: 140,
        therapist: 'María González',
        status: 'completed',
        addOns: [],
        rating: 4
      }
    ]
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'bg-green-100 text-green-800'
      case 'pending': return 'bg-yellow-100 text-yellow-800'
      case 'completed': return 'bg-blue-100 text-blue-800'
      case 'cancelled': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'confirmed': return 'Confirmada'
      case 'pending': return 'Pendiente'
      case 'completed': return 'Completada'
      case 'cancelled': return 'Cancelada'
      default: return status
    }
  }

  if (status === 'loading') {
    return (
      <>
        <Navbar />
        <main className="min-h-screen pt-24 pb-16 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-purple-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Cargando reservas...</p>
          </div>
        </main>
        <Footer />
      </>
    )
  }

  if (status === 'unauthenticated') {
    return (
      <>
        <Navbar />
        <main className="min-h-screen pt-24 pb-16 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Acceso Requerido</h1>
            <p className="text-gray-600 mb-6">Necesitas iniciar sesión para ver tus reservas</p>
            <Link href="/auth/login">
              <Button>Iniciar Sesión</Button>
            </Link>
          </div>
        </main>
        <Footer />
      </>
    )
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-24 pb-16 bg-gradient-to-br from-purple-50 to-pink-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="w-24 h-24 bg-gradient-to-br from-purple-200 to-pink-200 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-3xl">📅</span>
            </div>
            <h1 className="text-5xl font-bold gradient-text mb-2">Mis Reservas</h1>
            <p className="text-xl text-gray-600">Gestiona tus citas y reservas</p>
          </div>

          {/* Quick Actions */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link href="/servicios">
              <Button size="lg" className="w-full sm:w-auto">
                📅 Nueva Reserva
              </Button>
            </Link>
            <Link href="/servicios">
              <Button size="lg" variant="outline" className="w-full sm:w-auto">
                🎁 Comprar Gift Card
              </Button>
            </Link>
          </div>

          {/* Tabs */}
          <div className="flex justify-center mb-8">
            <div className="bg-white rounded-lg p-1 shadow-sm">
              <button
                onClick={() => setActiveTab('upcoming')}
                className={`px-6 py-2 rounded-md transition-all ${
                  activeTab === 'upcoming'
                    ? 'bg-purple-600 text-white'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Próximas ({reservations.upcoming.length})
              </button>
              <button
                onClick={() => setActiveTab('past')}
                className={`px-6 py-2 rounded-md transition-all ${
                  activeTab === 'past'
                    ? 'bg-purple-600 text-white'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Historial ({reservations.past.length})
              </button>
            </div>
          </div>

          {/* Reservations List */}
          <div className="space-y-6">
            {reservations[activeTab as keyof typeof reservations].length === 0 ? (
              <Card className="p-12 text-center">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">📅</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {activeTab === 'upcoming' ? 'No tienes reservas próximas' : 'No hay reservas anteriores'}
                </h3>
                <p className="text-gray-600 mb-6">
                  {activeTab === 'upcoming' 
                    ? '¡Es hora de programar tu próxima visita de bienestar!'
                    : 'Tus reservas completadas aparecerán aquí'
                  }
                </p>
                <Link href="/servicios">
                  <Button>
                    {activeTab === 'upcoming' ? 'Hacer Nueva Reserva' : 'Ver Servicios'}
                  </Button>
                </Link>
              </Card>
            ) : (
              reservations[activeTab as keyof typeof reservations].map((reservation) => (
                <Card key={reservation.id} className="p-6 hover:shadow-lg transition-shadow">
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="text-xl font-bold text-gray-900 mb-1">
                            {reservation.service}
                          </h3>
                          <div className="flex items-center space-x-4 text-sm text-gray-600">
                            <span>📅 {new Date(reservation.date).toLocaleDateString('es-ES', {
                              weekday: 'long',
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric'
                            })}</span>
                            <span>🕐 {reservation.time}</span>
                            <span>⏱️ {reservation.duration}</span>
                          </div>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(reservation.status)}`}>
                          {getStatusText(reservation.status)}
                        </span>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div>
                          <p className="text-sm text-gray-600">Terapeuta</p>
                          <p className="font-semibold">{reservation.therapist}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Precio</p>
                          <p className="font-semibold text-purple-600">${reservation.price}</p>
                        </div>
                      </div>

                      {reservation.addOns.length > 0 && (
                        <div className="mb-4">
                          <p className="text-sm text-gray-600 mb-2">Add-ons:</p>
                          <div className="flex flex-wrap gap-2">
                            {reservation.addOns.map((addon, index) => (
                              <span key={index} className="px-2 py-1 bg-purple-100 text-purple-800 rounded-md text-sm">
                                {addon}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      {reservation.rating && (
                        <div className="flex items-center space-x-1">
                          <span className="text-sm text-gray-600">Tu calificación:</span>
                          <div className="flex">
                            {[...Array(5)].map((_, i) => (
                              <span key={i} className={`text-lg ${i < reservation.rating ? 'text-yellow-400' : 'text-gray-300'}`}>
                                ⭐
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3 mt-6 lg:mt-0 lg:ml-6">
                      {activeTab === 'upcoming' && reservation.status !== 'cancelled' && (
                        <>
                          <Button variant="outline" size="sm">
                            ✏️ Modificar
                          </Button>
                          <Button variant="outline" size="sm" className="text-red-600 border-red-300 hover:bg-red-50">
                            ❌ Cancelar
                          </Button>
                        </>
                      )}
                      {activeTab === 'past' && !reservation.rating && (
                        <Button size="sm">
                          ⭐ Calificar
                        </Button>
                      )}
                      <Button variant="outline" size="sm">
                        👁️ Ver Detalles
                      </Button>
                    </div>
                  </div>
                </Card>
              ))
            )}
          </div>

          {/* Stats Summary */}
          <div className="mt-12">
            <Card className="p-6">
              <h2 className="text-2xl font-bold gradient-text mb-6 text-center">Resumen de Actividad</h2>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-2xl">📅</span>
                  </div>
                  <div className="text-2xl font-bold text-purple-600">{reservations.upcoming.length}</div>
                  <div className="text-sm text-gray-600">Próximas</div>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-2xl">✅</span>
                  </div>
                  <div className="text-2xl font-bold text-green-600">{reservations.past.length}</div>
                  <div className="text-sm text-gray-600">Completadas</div>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-2xl">⭐</span>
                  </div>
                  <div className="text-2xl font-bold text-blue-600">4.5</div>
                  <div className="text-sm text-gray-600">Calificación Promedio</div>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-2xl">💰</span>
                  </div>
                  <div className="text-2xl font-bold text-yellow-600">$520</div>
                  <div className="text-sm text-gray-600">Total Gastado</div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
