'use client'

import { useState } from 'react'
import { useSession } from 'next-auth/react'
import { Navbar } from '@/components/layout/navbar'
import { Footer } from '@/components/layout/footer'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import Link from 'next/link'

export default function ConfiguracionPage() {
  const { data: session, status } = useSession()
  const [activeSection, setActiveSection] = useState('account')
  const [settings, setSettings] = useState({
    notifications: {
      email: true,
      sms: false,
      push: true,
      reminders: true,
      promotions: false,
      updates: true
    },
    privacy: {
      profileVisible: true,
      showEmail: false,
      showPhone: false,
      allowMessages: true
    },
    preferences: {
      language: 'es',
      timezone: 'America/Argentina/Buenos_Aires',
      dateFormat: 'DD/MM/YYYY',
      currency: 'ARS',
      theme: 'light'
    },
    security: {
      twoFactor: false,
      loginAlerts: true,
      sessionTimeout: 30
    }
  })

  const handleSettingChange = (category: string, setting: string, value: boolean | string) => {
    setSettings(prev => ({
      ...prev,
      [category]: {
        ...prev[category as keyof typeof prev],
        [setting]: value
      }
    }))
  }

  const handleSaveSettings = () => {
    // Aquí iría la lógica para guardar las configuraciones
    console.log('Guardando configuraciones:', settings)
    alert('Configuraciones guardadas exitosamente')
  }

  if (status === 'loading') {
    return (
      <>
        <Navbar />
        <main className="min-h-screen pt-24 pb-16 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-purple-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Cargando configuración...</p>
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
            <p className="text-gray-600 mb-6">Necesitas iniciar sesión para acceder a la configuración</p>
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
              <span className="text-3xl">⚙️</span>
            </div>
            <h1 className="text-5xl font-bold gradient-text mb-2">Configuración</h1>
            <p className="text-xl text-gray-600">Personaliza tu experiencia en el spa</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar Navigation */}
            <div className="lg:col-span-1">
              <Card className="p-6 sticky top-24">
                <h2 className="text-lg font-bold gradient-text mb-4">Configuraciones</h2>
                <nav className="space-y-2">
                  <button
                    onClick={() => setActiveSection('account')}
                    className={`w-full text-left px-3 py-2 rounded-md transition-all ${
                      activeSection === 'account'
                        ? 'bg-purple-100 text-purple-700'
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    👤 Cuenta
                  </button>
                  <button
                    onClick={() => setActiveSection('notifications')}
                    className={`w-full text-left px-3 py-2 rounded-md transition-all ${
                      activeSection === 'notifications'
                        ? 'bg-purple-100 text-purple-700'
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    🔔 Notificaciones
                  </button>
                  <button
                    onClick={() => setActiveSection('privacy')}
                    className={`w-full text-left px-3 py-2 rounded-md transition-all ${
                      activeSection === 'privacy'
                        ? 'bg-purple-100 text-purple-700'
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    🔒 Privacidad
                  </button>
                  <button
                    onClick={() => setActiveSection('preferences')}
                    className={`w-full text-left px-3 py-2 rounded-md transition-all ${
                      activeSection === 'preferences'
                        ? 'bg-purple-100 text-purple-700'
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    🎨 Preferencias
                  </button>
                  <button
                    onClick={() => setActiveSection('security')}
                    className={`w-full text-left px-3 py-2 rounded-md transition-all ${
                      activeSection === 'security'
                        ? 'bg-purple-100 text-purple-700'
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    🛡️ Seguridad
                  </button>
                </nav>
              </Card>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3">
              {/* Account Settings */}
              {activeSection === 'account' && (
                <Card className="p-6">
                  <h2 className="text-2xl font-bold gradient-text mb-6">Configuración de Cuenta</h2>
                  
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold mb-4">Información Personal</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Nombre Completo
                          </label>
                          <input
                            type="text"
                            defaultValue={session?.user?.name || ''}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Email
                          </label>
                          <input
                            type="email"
                            defaultValue={session?.user?.email || ''}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                          />
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold mb-4">Gestión de Cuenta</h3>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                          <div>
                            <h4 className="font-semibold">Cambiar Contraseña</h4>
                            <p className="text-sm text-gray-600">Actualiza tu contraseña por seguridad</p>
                          </div>
                          <Button variant="outline" size="sm">
                            Cambiar
                          </Button>
                        </div>
                        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                          <div>
                            <h4 className="font-semibold">Descargar Datos</h4>
                            <p className="text-sm text-gray-600">Obtén una copia de todos tus datos</p>
                          </div>
                          <Button variant="outline" size="sm">
                            Descargar
                          </Button>
                        </div>
                        <div className="flex items-center justify-between p-4 bg-red-50 rounded-lg">
                          <div>
                            <h4 className="font-semibold text-red-800">Eliminar Cuenta</h4>
                            <p className="text-sm text-red-600">Esta acción no se puede deshacer</p>
                          </div>
                          <Button variant="outline" size="sm" className="text-red-600 border-red-300 hover:bg-red-50">
                            Eliminar
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              )}

              {/* Notifications Settings */}
              {activeSection === 'notifications' && (
                <Card className="p-6">
                  <h2 className="text-2xl font-bold gradient-text mb-6">Configuración de Notificaciones</h2>
                  
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold mb-4">Canales de Notificación</h3>
                      <div className="space-y-4">
                        {Object.entries(settings.notifications).map(([key, value]) => (
                          <div key={key} className="flex items-center justify-between">
                            <div>
                              <h4 className="font-semibold capitalize">
                                {key === 'email' ? 'Email' :
                                 key === 'sms' ? 'SMS' :
                                 key === 'push' ? 'Notificaciones Push' :
                                 key === 'reminders' ? 'Recordatorios' :
                                 key === 'promotions' ? 'Promociones' :
                                 key === 'updates' ? 'Actualizaciones' : key}
                              </h4>
                              <p className="text-sm text-gray-600">
                                {key === 'email' ? 'Recibe notificaciones por correo electrónico' :
                                 key === 'sms' ? 'Recibe notificaciones por mensaje de texto' :
                                 key === 'push' ? 'Recibe notificaciones en el navegador' :
                                 key === 'reminders' ? 'Recordatorios de citas y servicios' :
                                 key === 'promotions' ? 'Ofertas especiales y promociones' :
                                 key === 'updates' ? 'Actualizaciones importantes del spa' : ''}
                              </p>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                              <input
                                type="checkbox"
                                checked={value as boolean}
                                onChange={(e) => handleSettingChange('notifications', key, e.target.checked)}
                                className="sr-only peer"
                              />
                              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </Card>
              )}

              {/* Privacy Settings */}
              {activeSection === 'privacy' && (
                <Card className="p-6">
                  <h2 className="text-2xl font-bold gradient-text mb-6">Configuración de Privacidad</h2>
                  
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold mb-4">Visibilidad del Perfil</h3>
                      <div className="space-y-4">
                        {Object.entries(settings.privacy).map(([key, value]) => (
                          <div key={key} className="flex items-center justify-between">
                            <div>
                              <h4 className="font-semibold">
                                {key === 'profileVisible' ? 'Perfil Visible' :
                                 key === 'showEmail' ? 'Mostrar Email' :
                                 key === 'showPhone' ? 'Mostrar Teléfono' :
                                 key === 'allowMessages' ? 'Permitir Mensajes' : key}
                              </h4>
                              <p className="text-sm text-gray-600">
                                {key === 'profileVisible' ? 'Tu perfil puede ser visto por otros usuarios' :
                                 key === 'showEmail' ? 'Tu email será visible en tu perfil público' :
                                 key === 'showPhone' ? 'Tu teléfono será visible en tu perfil público' :
                                 key === 'allowMessages' ? 'Otros usuarios pueden enviarte mensajes' : ''}
                              </p>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                              <input
                                type="checkbox"
                                checked={value as boolean}
                                onChange={(e) => handleSettingChange('privacy', key, e.target.checked)}
                                className="sr-only peer"
                              />
                              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </Card>
              )}

              {/* Preferences Settings */}
              {activeSection === 'preferences' && (
                <Card className="p-6">
                  <h2 className="text-2xl font-bold gradient-text mb-6">Preferencias Generales</h2>
                  
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold mb-4">Idioma y Región</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Idioma
                          </label>
                          <select
                            value={settings.preferences.language}
                            onChange={(e) => handleSettingChange('preferences', 'language', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                          >
                            <option value="es">Español</option>
                            <option value="en">English</option>
                            <option value="pt">Português</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Zona Horaria
                          </label>
                          <select
                            value={settings.preferences.timezone}
                            onChange={(e) => handleSettingChange('preferences', 'timezone', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                          >
                            <option value="America/Argentina/Buenos_Aires">Buenos Aires</option>
                            <option value="America/Argentina/Cordoba">Córdoba</option>
                            <option value="America/Argentina/Mendoza">Mendoza</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Formato de Fecha
                          </label>
                          <select
                            value={settings.preferences.dateFormat}
                            onChange={(e) => handleSettingChange('preferences', 'dateFormat', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                          >
                            <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                            <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                            <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Moneda
                          </label>
                          <select
                            value={settings.preferences.currency}
                            onChange={(e) => handleSettingChange('preferences', 'currency', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                          >
                            <option value="ARS">Peso Argentino (ARS)</option>
                            <option value="USD">Dólar Americano (USD)</option>
                            <option value="EUR">Euro (EUR)</option>
                          </select>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold mb-4">Apariencia</h3>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Tema
                        </label>
                        <div className="flex space-x-4">
                          <label className="flex items-center">
                            <input
                              type="radio"
                              name="theme"
                              value="light"
                              checked={settings.preferences.theme === 'light'}
                              onChange={(e) => handleSettingChange('preferences', 'theme', e.target.value)}
                              className="mr-2"
                            />
                            Claro
                          </label>
                          <label className="flex items-center">
                            <input
                              type="radio"
                              name="theme"
                              value="dark"
                              checked={settings.preferences.theme === 'dark'}
                              onChange={(e) => handleSettingChange('preferences', 'theme', e.target.value)}
                              className="mr-2"
                            />
                            Oscuro
                          </label>
                          <label className="flex items-center">
                            <input
                              type="radio"
                              name="theme"
                              value="auto"
                              checked={settings.preferences.theme === 'auto'}
                              onChange={(e) => handleSettingChange('preferences', 'theme', e.target.value)}
                              className="mr-2"
                            />
                            Automático
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              )}

              {/* Security Settings */}
              {activeSection === 'security' && (
                <Card className="p-6">
                  <h2 className="text-2xl font-bold gradient-text mb-6">Configuración de Seguridad</h2>
                  
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold mb-4">Autenticación</h3>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                          <div>
                            <h4 className="font-semibold">Autenticación de Dos Factores</h4>
                            <p className="text-sm text-gray-600">Añade una capa extra de seguridad a tu cuenta</p>
                          </div>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input
                              type="checkbox"
                              checked={settings.security.twoFactor}
                              onChange={(e) => handleSettingChange('security', 'twoFactor', e.target.checked)}
                              className="sr-only peer"
                            />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                          </label>
                        </div>
                        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                          <div>
                            <h4 className="font-semibold">Alertas de Inicio de Sesión</h4>
                            <p className="text-sm text-gray-600">Recibe notificaciones cuando alguien inicie sesión en tu cuenta</p>
                          </div>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input
                              type="checkbox"
                              checked={settings.security.loginAlerts}
                              onChange={(e) => handleSettingChange('security', 'loginAlerts', e.target.checked)}
                              className="sr-only peer"
                            />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                          </label>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold mb-4">Sesiones Activas</h3>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <div>
                            <h4 className="font-semibold">Sesión Actual</h4>
                            <p className="text-sm text-gray-600">Chrome en Windows • Buenos Aires</p>
                          </div>
                          <Button variant="outline" size="sm">
                            Cerrar Sesión
                          </Button>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <div>
                            <h4 className="font-semibold">Safari en iPhone</h4>
                            <p className="text-sm text-gray-600">Última actividad: hace 2 horas</p>
                          </div>
                          <Button variant="outline" size="sm">
                            Cerrar Sesión
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              )}

              {/* Save Button */}
              <div className="mt-8 flex justify-end">
                <Button onClick={handleSaveSettings} size="lg">
                  💾 Guardar Configuraciones
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
