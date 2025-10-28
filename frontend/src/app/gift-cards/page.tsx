'use client'

import { useState } from 'react'
import { Navbar } from '@/components/layout/navbar'
import { Footer } from '@/components/layout/footer'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import Link from 'next/link'

// Mock data - En producción esto vendría de una API
const giftCardTemplates = [
  {
    id: 1,
    name: 'Elegante Clásica',
    description: 'Diseño minimalista y elegante perfecto para cualquier ocasión',
    image: '/images/gift-card-classic.jpg',
    colors: ['#8B5CF6', '#EC4899', '#F59E0B'],
    popular: true,
    featured: true
  },
  {
    id: 2,
    name: 'Romántica',
    description: 'Perfecta para parejas y ocasiones especiales',
    image: '/images/gift-card-romantic.jpg',
    colors: ['#EC4899', '#F472B6', '#FBBF24'],
    popular: false,
    featured: false
  },
  {
    id: 3,
    name: 'Moderno Spa',
    description: 'Diseño contemporáneo inspirado en el bienestar',
    image: '/images/gift-card-modern.jpg',
    colors: ['#10B981', '#06B6D4', '#8B5CF6'],
    popular: true,
    featured: false
  },
  {
    id: 4,
    name: 'Festiva',
    description: 'Ideal para celebraciones y fechas especiales',
    image: '/images/gift-card-festive.jpg',
    colors: ['#F59E0B', '#EF4444', '#EC4899'],
    popular: false,
    featured: false
  }
]

const giftCardAmounts = [
  { amount: 50, label: '$50', popular: false },
  { amount: 100, label: '$100', popular: true },
  { amount: 150, label: '$150', popular: false },
  { amount: 200, label: '$200', popular: true },
  { amount: 300, label: '$300', popular: false },
  { amount: 500, label: '$500', popular: true },
  { amount: 1000, label: '$1000', popular: false }
]

const deliveryMethods = [
  {
    id: 'email',
    name: 'Email Instantáneo',
    description: 'Recibe tu gift card por email en minutos',
    icon: '📧',
    price: 0,
    time: 'Inmediato'
  },
  {
    id: 'sms',
    name: 'SMS',
    description: 'Envío por mensaje de texto',
    icon: '📱',
    price: 2,
    time: 'Inmediato'
  },
  {
    id: 'physical',
    name: 'Tarjeta Física',
    description: 'Tarjeta impresa y enviada por correo',
    icon: '📮',
    price: 5,
    time: '3-5 días hábiles'
  }
]

export default function GiftCardsPage() {
  const [selectedTemplate, setSelectedTemplate] = useState(giftCardTemplates[0])
  const [selectedAmount, setSelectedAmount] = useState(100)
  const [customAmount, setCustomAmount] = useState('')
  const [selectedDelivery, setSelectedDelivery] = useState(deliveryMethods[0])
  const [recipientName, setRecipientName] = useState('')
  const [recipientEmail, setRecipientEmail] = useState('')
  const [senderName, setSenderName] = useState('')
  const [message, setMessage] = useState('')
  const [showPreview, setShowPreview] = useState(false)

  const calculateTotal = () => {
    const amount = customAmount ? parseInt(customAmount) : selectedAmount
    return amount + selectedDelivery.price
  }

  const handleAmountSelect = (amount: number) => {
    setSelectedAmount(amount)
    setCustomAmount('')
  }

  const handleCustomAmountChange = (value: string) => {
    setCustomAmount(value)
    if (value) {
      setSelectedAmount(0)
    }
  }

  const handlePurchase = () => {
    // Aquí iría la lógica de compra
    console.log('Comprando gift card:', {
      template: selectedTemplate,
      amount: customAmount ? parseInt(customAmount) : selectedAmount,
      delivery: selectedDelivery,
      recipient: { name: recipientName, email: recipientEmail },
      sender: senderName,
      message,
      total: calculateTotal()
    })
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-24 pb-20 bg-[#FFFBF9]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-16 fade-in">
            <h1 className="text-5xl md:text-6xl font-serif font-bold gradient-text mb-6">
              Gift Cards
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto font-light leading-relaxed">
              Regala bienestar y relajación. Nuestras gift cards son perfectas para cualquier ocasión especial
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Gift Card Builder */}
            <div className="lg:col-span-2">
              {/* Template Selection */}
              <Card className="p-8 mb-8 slide-up">
                <h2 className="text-2xl font-serif font-bold gradient-text mb-8">1. Elige el Diseño</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {giftCardTemplates.map((template) => (
                    <div
                      key={template.id}
                      onClick={() => setSelectedTemplate(template)}
                      className={`p-5 border-2 rounded-2xl cursor-pointer transition-all duration-300 ${
                        selectedTemplate.id === template.id
                          ? 'border-spa-rose-400 bg-spa-rose-50/50 shadow-lg shadow-pink-100/40'
                          : 'border-rose-100/60 hover:border-spa-rose-300 hover:shadow-md'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="font-serif font-semibold text-gray-800">{template.name}</h3>
                        {template.popular && (
                          <span className="bg-white/90 backdrop-blur-sm text-spa-gold-600 px-3 py-1 rounded-full text-xs font-semibold shadow-sm border border-spa-gold-200">
                            Popular
                          </span>
                        )}
                      </div>
                      <div className="h-36 bg-spa-rose-100 rounded-xl flex items-center justify-center mb-4 overflow-hidden">
                        <div className="text-center">
                          <div className="w-14 h-14 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-2 shadow-lg border border-rose-100">
                            <span className="text-2xl">🎁</span>
                          </div>
                          <p className="text-sm text-gray-500 font-light">Vista previa</p>
                        </div>
                      </div>
                      <p className="text-sm text-gray-600 font-light leading-relaxed mb-3">{template.description}</p>
                      <div className="flex space-x-2">
                        {template.colors.map((color, index) => (
                          <div
                            key={index}
                            className="w-7 h-7 rounded-full border-2 border-white shadow-md"
                            style={{ backgroundColor: color }}
                          />
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Amount Selection */}
              <Card className="p-8 mb-8">
                <h2 className="text-2xl font-serif font-bold gradient-text mb-8">2. Elige el Monto</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                  {giftCardAmounts.map((item) => (
                    <button
                      key={item.amount}
                      onClick={() => handleAmountSelect(item.amount)}
                      className={`p-5 border-2 rounded-xl text-center transition-all duration-300 ${
                        selectedAmount === item.amount && !customAmount
                          ? 'border-spa-rose-400 bg-spa-rose-50/50 shadow-lg shadow-pink-100/40'
                          : 'border-rose-100/60 hover:border-spa-rose-300 hover:shadow-md'
                      }`}
                    >
                      <div className="text-xl font-serif font-bold text-gray-800">{item.label}</div>
                      {item.popular && (
                        <div className="text-xs text-spa-rose-600 font-semibold mt-1">Popular</div>
                      )}
                    </button>
                  ))}
                </div>

                <div className="border-t border-rose-100/40 pt-6">
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Monto Personalizado
                  </label>
                  <div className="flex">
                    <span className="inline-flex items-center px-4 rounded-l-xl border-2 border-r-0 border-rose-100 bg-rose-50/30 text-gray-600 text-sm font-medium">
                      $
                    </span>
                    <input
                      type="number"
                      value={customAmount}
                      onChange={(e) => handleCustomAmountChange(e.target.value)}
                      placeholder="Ingresa el monto"
                      className="flex-1 min-w-0 block w-full px-4 py-3 rounded-r-xl border-2 border-rose-100 bg-white/80 focus:outline-none focus:ring-2 focus:ring-spa-rose-300 focus:border-spa-rose-300 transition-all duration-300"
                      min="25"
                      max="2000"
                    />
                  </div>
                  <p className="text-xs text-gray-500 mt-2 font-light">
                    Monto mínimo: $25 | Monto máximo: $2000
                  </p>
                </div>
              </Card>

              {/* Delivery Method */}
              <Card className="p-6 mb-8">
                <h2 className="text-2xl font-bold gradient-text mb-6">3. Método de Entrega</h2>
                <div className="space-y-4">
                  {deliveryMethods.map((method) => (
                    <div
                      key={method.id}
                      onClick={() => setSelectedDelivery(method)}
                      className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                        selectedDelivery.id === method.id
                          ? 'border-purple-500 bg-purple-50'
                          : 'border-gray-200 hover:border-purple-300'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <span className="text-2xl">{method.icon}</span>
                          <div>
                            <h3 className="font-semibold">{method.name}</h3>
                            <p className="text-sm text-gray-600">{method.description}</p>
                            <p className="text-xs text-gray-500">Tiempo: {method.time}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          {method.price === 0 ? (
                            <span className="text-green-600 font-semibold">Gratis</span>
                          ) : (
                            <span className="font-semibold">+${method.price}</span>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Recipient Information */}
              <Card className="p-6 mb-8">
                <h2 className="text-2xl font-bold gradient-text mb-6">4. Información del Destinatario</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Nombre del Destinatario *
                    </label>
                    <input
                      type="text"
                      value={recipientName}
                      onChange={(e) => setRecipientName(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                      placeholder="Nombre completo"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email del Destinatario *
                    </label>
                    <input
                      type="email"
                      value={recipientEmail}
                      onChange={(e) => setRecipientEmail(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                      placeholder="email@ejemplo.com"
                      required
                    />
                  </div>
                </div>
              </Card>

              {/* Personal Message */}
              <Card className="p-6 mb-8">
                <h2 className="text-2xl font-bold gradient-text mb-6">5. Mensaje Personal</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Tu Nombre
                    </label>
                    <input
                      type="text"
                      value={senderName}
                      onChange={(e) => setSenderName(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                      placeholder="Tu nombre"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Mensaje Personal
                    </label>
                    <textarea
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                      rows={4}
                      placeholder="Escribe un mensaje especial..."
                      maxLength={200}
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      {message.length}/200 caracteres
                    </p>
                  </div>
                </div>
              </Card>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <Card className="p-6 sticky top-24">
                <h2 className="text-2xl font-bold gradient-text mb-6">Resumen del Pedido</h2>
                
                {/* Gift Card Preview */}
                <div className="mb-6">
                  <h3 className="font-semibold mb-3">Vista Previa</h3>
                  <div className="bg-gradient-to-br from-purple-200 to-pink-200 rounded-lg p-4 text-center">
                    <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-3">
                      <span className="text-2xl">🎁</span>
                    </div>
                    <div className="text-lg font-bold text-gray-900">
                      ${customAmount || selectedAmount}
                    </div>
                    <div className="text-sm text-gray-600">Gift Card</div>
                    <div className="text-xs text-gray-500 mt-2">
                      {selectedTemplate.name}
                    </div>
                  </div>
                </div>

                {/* Order Details */}
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between">
                    <span>Gift Card ({selectedTemplate.name})</span>
                    <span>${customAmount || selectedAmount}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Entrega ({selectedDelivery.name})</span>
                    <span>
                      {selectedDelivery.price === 0 ? 'Gratis' : `$${selectedDelivery.price}`}
                    </span>
                  </div>
                  <div className="border-t pt-3">
                    <div className="flex justify-between font-bold text-lg">
                      <span>Total</span>
                      <span>${calculateTotal()}</span>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="space-y-3">
                  <Button
                    className="w-full"
                    size="lg"
                    onClick={() => setShowPreview(true)}
                    disabled={!recipientName || !recipientEmail || (!selectedAmount && !customAmount)}
                  >
                    Ver Vista Previa Completa
                  </Button>
                  <Button
                    className="w-full"
                    size="lg"
                    variant="outline"
                    onClick={handlePurchase}
                    disabled={!recipientName || !recipientEmail || (!selectedAmount && !customAmount)}
                  >
                    Comprar Gift Card
                  </Button>
                </div>

                {/* Terms */}
                <div className="mt-6 text-xs text-gray-500">
                  <p>
                    Al comprar esta gift card, aceptas nuestros{' '}
                    <Link href="/terminos" className="text-purple-600 hover:underline">
                      términos y condiciones
                    </Link>
                    . La gift card es válida por 12 meses desde la fecha de compra.
                  </p>
                </div>
              </Card>
            </div>
          </div>

          {/* Benefits Section */}
          <div className="mt-16">
            <h2 className="text-3xl font-bold gradient-text text-center mb-8">
              ¿Por qué elegir nuestras Gift Cards?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card className="p-6 text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🎯</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">Flexibilidad Total</h3>
                <p className="text-gray-600">
                  Úsala para cualquier servicio o combínala con promociones especiales
                </p>
              </Card>
              <Card className="p-6 text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">⏰</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">Válida por 12 Meses</h3>
                <p className="text-gray-600">
                  Tiempo suficiente para disfrutar de todos nuestros servicios
                </p>
              </Card>
              <Card className="p-6 text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🎁</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">Regalo Perfecto</h3>
                <p className="text-gray-600">
                  Ideal para cumpleaños, aniversarios o simplemente para demostrar cariño
                </p>
              </Card>
            </div>
          </div>
        </div>
      </main>

      {/* Full Preview Modal */}
      {showPreview && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-6">
                <h2 className="text-3xl font-bold gradient-text">Vista Previa de tu Gift Card</h2>
                <Button 
                  variant="outline" 
                  onClick={() => setShowPreview(false)}
                  className="text-gray-500"
                >
                  ✕
                </Button>
              </div>

              {/* Gift Card Design */}
              <div className="bg-gradient-to-br from-purple-200 to-pink-200 rounded-2xl p-8 text-center mb-6">
                <div className="bg-white rounded-xl p-6 shadow-lg">
                  <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-3xl">🎁</span>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Gift Card</h3>
                  <div className="text-4xl font-bold text-purple-600 mb-4">
                    ${customAmount || selectedAmount}
                  </div>
                  <div className="text-gray-600 mb-4">
                    <p className="font-semibold">Para: {recipientName}</p>
                    {senderName && <p className="text-sm">De: {senderName}</p>}
                  </div>
                  {message && (
                    <div className="bg-gray-50 rounded-lg p-4 mb-4">
                      <p className="text-gray-700 italic">"{message}"</p>
                    </div>
                  )}
                  <div className="text-xs text-gray-500">
                    Válida por 12 meses desde la fecha de compra
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <Button className="w-full" size="lg" onClick={handlePurchase}>
                  Confirmar Compra - ${calculateTotal()}
                </Button>
                <Button variant="outline" className="w-full" onClick={() => setShowPreview(false)}>
                  Editar Gift Card
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </>
  )
}
