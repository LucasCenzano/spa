'use client'

import { useState } from 'react'
import { useSession } from 'next-auth/react'
import { Navbar } from '@/components/layout/navbar'
import { Footer } from '@/components/layout/footer'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import Link from 'next/link'

export default function WalletPage() {
  const { data: session, status } = useSession()
  const [activeTab, setActiveTab] = useState('giftcards')

  // Mock data - En producción esto vendría de una API
  const walletData = {
    balance: 150,
    giftCards: [
      {
        id: 1,
        code: 'GC-2024-001',
        amount: 100,
        remaining: 100,
        expiresAt: '2025-06-15',
        status: 'active',
        purchasedAt: '2024-06-15',
        sender: 'María González'
      },
      {
        id: 2,
        code: 'GC-2024-002',
        amount: 200,
        remaining: 50,
        expiresAt: '2025-03-20',
        status: 'active',
        purchasedAt: '2024-03-20',
        sender: 'Juan Pérez'
      }
    ],
    transactions: [
      {
        id: 1,
        type: 'purchase',
        amount: 100,
        description: 'Compra de Gift Card',
        date: '2024-06-15',
        status: 'completed'
      },
      {
        id: 2,
        type: 'usage',
        amount: -50,
        description: 'Uso en Masaje Relajante',
        date: '2024-11-28',
        status: 'completed'
      },
      {
        id: 3,
        type: 'refund',
        amount: 25,
        description: 'Reembolso por cancelación',
        date: '2024-11-15',
        status: 'completed'
      }
    ],
    referrals: [
      {
        id: 1,
        code: 'REF-LUCAS-001',
        used: 3,
        totalEarned: 45,
        status: 'active'
      }
    ]
  }

  const getTransactionIcon = (type: string) => {
    switch (type) {
      case 'purchase': return '💳'
      case 'usage': return '💆'
      case 'refund': return '↩️'
      case 'referral': return '👥'
      default: return '💰'
    }
  }

  const getTransactionColor = (type: string) => {
    switch (type) {
      case 'purchase': return 'text-green-600'
      case 'usage': return 'text-red-600'
      case 'refund': return 'text-blue-600'
      case 'referral': return 'text-purple-600'
      default: return 'text-gray-600'
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-ES', {
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
    return diffDays <= 30 && diffDays > 0
  }

  if (status === 'loading') {
    return (
      <>
        <Navbar />
        <main className="min-h-screen pt-24 pb-16 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-purple-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Cargando wallet...</p>
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
            <p className="text-gray-600 mb-6">Necesitas iniciar sesión para ver tu wallet</p>
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
              <span className="text-3xl">💳</span>
            </div>
            <h1 className="text-5xl font-bold gradient-text mb-2">Mi Wallet</h1>
            <p className="text-xl text-gray-600">Gestiona tus gift cards y créditos</p>
          </div>

          {/* Balance Overview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <Card className="p-6 text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">💰</span>
              </div>
              <div className="text-3xl font-bold text-green-600 mb-2">${walletData.balance}</div>
              <div className="text-sm text-gray-600">Saldo Disponible</div>
            </Card>
            <Card className="p-6 text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🎁</span>
              </div>
              <div className="text-3xl font-bold text-purple-600 mb-2">{walletData.giftCards.length}</div>
              <div className="text-sm text-gray-600">Gift Cards Activas</div>
            </Card>
            <Card className="p-6 text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">👥</span>
              </div>
              <div className="text-3xl font-bold text-blue-600 mb-2">{walletData.referrals[0].used}</div>
              <div className="text-sm text-gray-600">Referidos Exitosos</div>
            </Card>
          </div>

          {/* Quick Actions */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link href="/gift-cards">
              <Button size="lg" className="w-full sm:w-auto">
                🎁 Comprar Gift Card
              </Button>
            </Link>
            <Link href="/servicios">
              <Button size="lg" variant="outline" className="w-full sm:w-auto">
                💆 Usar en Reserva
              </Button>
            </Link>
          </div>

          {/* Tabs */}
          <div className="flex justify-center mb-8">
            <div className="bg-white rounded-lg p-1 shadow-sm">
              <button
                onClick={() => setActiveTab('giftcards')}
                className={`px-6 py-2 rounded-md transition-all ${
                  activeTab === 'giftcards'
                    ? 'bg-purple-600 text-white'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Gift Cards ({walletData.giftCards.length})
              </button>
              <button
                onClick={() => setActiveTab('transactions')}
                className={`px-6 py-2 rounded-md transition-all ${
                  activeTab === 'transactions'
                    ? 'bg-purple-600 text-white'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Transacciones ({walletData.transactions.length})
              </button>
              <button
                onClick={() => setActiveTab('referrals')}
                className={`px-6 py-2 rounded-md transition-all ${
                  activeTab === 'referrals'
                    ? 'bg-purple-600 text-white'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Referidos
              </button>
            </div>
          </div>

          {/* Content */}
          {activeTab === 'giftcards' && (
            <div className="space-y-6">
              {walletData.giftCards.length === 0 ? (
                <Card className="p-12 text-center">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">🎁</span>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">No tienes gift cards</h3>
                  <p className="text-gray-600 mb-6">Compra tu primera gift card y disfruta de nuestros servicios</p>
                  <Link href="/gift-cards">
                    <Button>Comprar Gift Card</Button>
                  </Link>
                </Card>
              ) : (
                walletData.giftCards.map((giftCard) => (
                  <Card key={giftCard.id} className="p-6 hover:shadow-lg transition-shadow">
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <h3 className="text-xl font-bold text-gray-900 mb-1">
                              Gift Card #{giftCard.code}
                            </h3>
                            <div className="flex items-center space-x-4 text-sm text-gray-600">
                              <span>💰 ${giftCard.remaining} de ${giftCard.amount}</span>
                              <span>📅 Vence: {formatDate(giftCard.expiresAt)}</span>
                              <span>👤 De: {giftCard.sender}</span>
                            </div>
                          </div>
                          <div className="flex flex-col items-end">
                            <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                              giftCard.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                            }`}>
                              {giftCard.status === 'active' ? 'Activa' : 'Inactiva'}
                            </span>
                            {isExpiringSoon(giftCard.expiresAt) && (
                              <span className="px-2 py-1 rounded-full text-xs font-semibold bg-orange-100 text-orange-800 mt-2">
                                ⏰ Pronto vence
                              </span>
                            )}
                          </div>
                        </div>

                        <div className="mb-4">
                          <div className="flex justify-between text-sm text-gray-600 mb-1">
                            <span>Progreso de uso</span>
                            <span>{Math.round(((giftCard.amount - giftCard.remaining) / giftCard.amount) * 100)}% usado</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-purple-600 h-2 rounded-full transition-all duration-300"
                              style={{ width: `${((giftCard.amount - giftCard.remaining) / giftCard.amount) * 100}%` }}
                            ></div>
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-col sm:flex-row gap-3 mt-6 lg:mt-0 lg:ml-6">
                        <Button variant="outline" size="sm">
                          📋 Ver Detalles
                        </Button>
                        {giftCard.status === 'active' && giftCard.remaining > 0 && (
                          <Link href="/servicios">
                            <Button size="sm">
                              💆 Usar Ahora
                            </Button>
                          </Link>
                        )}
                      </div>
                    </div>
                  </Card>
                ))
              )}
            </div>
          )}

          {activeTab === 'transactions' && (
            <div className="space-y-4">
              {walletData.transactions.map((transaction) => (
                <Card key={transaction.id} className="p-4 hover:shadow-lg transition-shadow">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                        <span className="text-xl">{getTransactionIcon(transaction.type)}</span>
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">{transaction.description}</h3>
                        <p className="text-sm text-gray-600">{formatDate(transaction.date)}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className={`font-bold ${getTransactionColor(transaction.type)}`}>
                        {transaction.amount > 0 ? '+' : ''}${transaction.amount}
                      </div>
                      <div className="text-sm text-gray-600 capitalize">{transaction.status}</div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}

          {activeTab === 'referrals' && (
            <div className="space-y-6">
              <Card className="p-6">
                <h2 className="text-2xl font-bold gradient-text mb-6">Tu Código de Referido</h2>
                <div className="bg-gradient-to-r from-purple-100 to-pink-100 rounded-lg p-6 text-center">
                  <div className="text-3xl font-bold text-purple-600 mb-2">
                    {walletData.referrals[0].code}
                  </div>
                  <p className="text-gray-600 mb-4">Comparte este código con tus amigos y ambos obtendrán beneficios</p>
                  <Button variant="outline">
                    📤 Compartir Código
                  </Button>
                </div>
              </Card>

              <Card className="p-6">
                <h2 className="text-2xl font-bold gradient-text mb-6">Estadísticas de Referidos</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <span className="text-2xl">👥</span>
                    </div>
                    <div className="text-2xl font-bold text-purple-600">{walletData.referrals[0].used}</div>
                    <div className="text-sm text-gray-600">Referidos Exitosos</div>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <span className="text-2xl">💰</span>
                    </div>
                    <div className="text-2xl font-bold text-green-600">${walletData.referrals[0].totalEarned}</div>
                    <div className="text-sm text-gray-600">Total Ganado</div>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <span className="text-2xl">🎯</span>
                    </div>
                    <div className="text-2xl font-bold text-blue-600">100%</div>
                    <div className="text-sm text-gray-600">Tasa de Conversión</div>
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <h2 className="text-2xl font-bold gradient-text mb-6">Cómo Funciona</h2>
                <div className="space-y-4">
                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold">1</div>
                    <div>
                      <h3 className="font-semibold">Comparte tu código</h3>
                      <p className="text-gray-600">Envía tu código de referido a familiares y amigos</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold">2</div>
                    <div>
                      <h3 className="font-semibold">Ellos se registran</h3>
                      <p className="text-gray-600">Tu referido usa tu código al crear su cuenta</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold">3</div>
                    <div>
                      <h3 className="font-semibold">Ambos ganan</h3>
                      <p className="text-gray-600">Tú y tu referido reciben descuentos en sus próximas visitas</p>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  )
}
