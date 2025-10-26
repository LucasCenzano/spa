'use client'

import { useState } from 'react'
import { useSession } from 'next-auth/react'
import { Navbar } from '@/components/layout/navbar'
import { Footer } from '@/components/layout/footer'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import Link from 'next/link'

export default function PerfilPage() {
  const { data: session, status } = useSession()
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    name: session?.user?.name || '',
    email: session?.user?.email || '',
    phone: '+54 11 1234-5678',
    birthDate: '1990-01-01',
    address: 'Av. Corrientes 1234, CABA',
    preferences: {
      notifications: true,
      marketing: false,
      reminders: true
    }
  })

  const [stats] = useState({
    totalVisits: 12,
    totalSpent: 1840,
    memberSince: '2023-03-15',
    favoriteService: 'Masaje Relajante',
    nextAppointment: '2024-12-15'
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target
    if (name.includes('.')) {
      const [parent, child] = name.split('.')
      setFormData(prev => {
        const parentValue = prev[parent as keyof typeof prev] as Record<string, any>
        return {
          ...prev,
          [parent]: {
            ...parentValue,
            [child]: type === 'checkbox' ? checked : value
          }
        }
      })
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value
      }))
    }
  }

  const handleSave = () => {
    // Aquí iría la lógica para guardar los datos
    console.log('Guardando perfil:', formData)
    setIsEditing(false)
  }

  if (status === 'loading') {
    return (
      <>
        <Navbar />
        <main className="min-h-screen pt-24 pb-16 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-purple-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Cargando perfil...</p>
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
            <p className="text-gray-600 mb-6">Necesitas iniciar sesión para ver tu perfil</p>
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
              <span className="text-3xl">👤</span>
            </div>
            <h1 className="text-5xl font-bold gradient-text mb-2">Mi Perfil</h1>
            <p className="text-xl text-gray-600">Gestiona tu información personal y preferencias</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Profile Information */}
            <div className="lg:col-span-2">
              <Card className="p-6 mb-8">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold gradient-text">Información Personal</h2>
                  <Button
                    variant={isEditing ? 'outline' : 'default'}
                    onClick={() => setIsEditing(!isEditing)}
                  >
                    {isEditing ? 'Cancelar' : 'Editar'}
                  </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Nombre Completo
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 disabled:bg-gray-100"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 disabled:bg-gray-100"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Teléfono
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 disabled:bg-gray-100"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Fecha de Nacimiento
                    </label>
                    <input
                      type="date"
                      name="birthDate"
                      value={formData.birthDate}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 disabled:bg-gray-100"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Dirección
                    </label>
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 disabled:bg-gray-100"
                    />
                  </div>
                </div>

                {isEditing && (
                  <div className="mt-6 flex justify-end space-x-4">
                    <Button variant="outline" onClick={() => setIsEditing(false)}>
                      Cancelar
                    </Button>
                    <Button onClick={handleSave}>
                      Guardar Cambios
                    </Button>
                  </div>
                )}
              </Card>

              {/* Preferences */}
              <Card className="p-6 mb-8">
                <h2 className="text-2xl font-bold gradient-text mb-6">Preferencias de Notificaciones</h2>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold">Recordatorios de Citas</h3>
                      <p className="text-sm text-gray-600">Recibe notificaciones antes de tus citas</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        name="preferences.reminders"
                        checked={formData.preferences.reminders}
                        onChange={handleInputChange}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                    </label>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold">Promociones y Ofertas</h3>
                      <p className="text-sm text-gray-600">Recibe información sobre promociones especiales</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        name="preferences.marketing"
                        checked={formData.preferences.marketing}
                        onChange={handleInputChange}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                    </label>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold">Notificaciones Generales</h3>
                      <p className="text-sm text-gray-600">Recibe actualizaciones importantes del spa</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        name="preferences.notifications"
                        checked={formData.preferences.notifications}
                        onChange={handleInputChange}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                    </label>
                  </div>
                </div>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              {/* Quick Stats */}
              <Card className="p-6 mb-8">
                <h2 className="text-xl font-bold gradient-text mb-6">Tu Estadísticas</h2>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Visitas Totales</span>
                    <span className="font-bold text-purple-600">{stats.totalVisits}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Total Gastado</span>
                    <span className="font-bold text-purple-600">${stats.totalSpent}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Miembro Desde</span>
                    <span className="font-bold text-purple-600">
                      {new Date(stats.memberSince).toLocaleDateString('es-ES', { month: 'short', year: 'numeric' })}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Servicio Favorito</span>
                    <span className="font-bold text-purple-600">{stats.favoriteService}</span>
                  </div>
                </div>
              </Card>

              {/* Quick Actions */}
              <Card className="p-6 mb-8">
                <h2 className="text-xl font-bold gradient-text mb-6">Acciones Rápidas</h2>
                <div className="space-y-3">
                  <Link href="/reservas">
                    <Button className="w-full" variant="outline">
                      📅 Nueva Reserva
                    </Button>
                  </Link>
                  <Link href="/reservas">
                    <Button className="w-full" variant="outline">
                      📋 Mis Reservas
                    </Button>
                  </Link>
                  <Link href="/wallet">
                    <Button className="w-full" variant="outline">
                      💳 Mi Wallet
                    </Button>
                  </Link>
                  <Link href="/configuracion">
                    <Button className="w-full" variant="outline">
                      ⚙️ Configuración
                    </Button>
                  </Link>
                </div>
              </Card>

              {/* Next Appointment */}
              <Card className="p-6">
                <h2 className="text-xl font-bold gradient-text mb-6">Próxima Cita</h2>
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-200 to-pink-200 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">📅</span>
                  </div>
                  <h3 className="font-semibold mb-2">Masaje Relajante</h3>
                  <p className="text-gray-600 mb-2">
                    {new Date(stats.nextAppointment).toLocaleDateString('es-ES', {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </p>
                  <p className="text-sm text-gray-500 mb-4">15:30 - 16:30</p>
                  <Link href="/reservas">
                    <Button size="sm" className="w-full">
                      Ver Detalles
                    </Button>
                  </Link>
                </div>
              </Card>
            </div>
          </div>

          {/* Security Section */}
          <div className="mt-12">
            <Card className="p-6">
              <h2 className="text-2xl font-bold gradient-text mb-6">Seguridad de la Cuenta</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <h3 className="font-semibold">Cambiar Contraseña</h3>
                    <p className="text-sm text-gray-600">Actualiza tu contraseña por seguridad</p>
                  </div>
                  <Button variant="outline" size="sm">
                    Cambiar
                  </Button>
                </div>
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <h3 className="font-semibold">Autenticación de Dos Factores</h3>
                    <p className="text-sm text-gray-600">Añade una capa extra de seguridad</p>
                  </div>
                  <Button variant="outline" size="sm">
                    Activar
                  </Button>
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
