'use client'

import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { Sparkles, Calendar, Gift } from 'lucide-react'

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-rose-100/40 via-pink-50/30 to-amber-50/40">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=1920&q=80')] bg-cover bg-center opacity-20" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#FFFBF9]/60 to-[#FFFBF9]" />
      </div>

      {/* Subtle Pattern Overlay */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 2px 2px, rgb(251, 113, 133) 1px, transparent 0)',
          backgroundSize: '48px 48px'
        }} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 text-center">
        {/* Promotional Badge */}
        <div className="inline-flex items-center space-x-2 glass-effect rounded-full px-5 py-2 mb-8 fade-in">
          <Sparkles className="h-4 w-4 text-spa-gold-400 breathe" />
          <span className="text-sm font-medium text-spa-rose-600">Promoción de Apertura - 20% OFF</span>
        </div>

        {/* Main Heading */}
        <h1 className="text-5xl md:text-7xl font-bold mb-6 slide-up">
          <span className="gradient-text">Armonía y Serenidad</span>
          <br />
          <span className="text-gray-800 dark:text-rose-50">para tu Bienestar</span>
        </h1>

        {/* Description */}
        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-12 fade-in">
          Descubre un oasis de tranquilidad donde cada detalle está diseñado para tu relajación.
          Tratamientos holísticos, masajes terapéuticos y rituales que nutren cuerpo y alma.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 slide-up">
          <Button size="lg" className="bg-spa-rose-300 hover:bg-spa-rose-400 text-gray-800 font-semibold shadow-lg hover:shadow-xl transition-all duration-300" asChild>
            <Link href="/servicios">
              <Calendar className="mr-2 h-5 w-5" />
              Reservar Ahora
            </Link>
          </Button>
          <Button size="lg" variant="outline" className="border-spa-rose-300 text-spa-rose-600 hover:bg-spa-rose-50" asChild>
            <Link href="/gift-cards">
              <Gift className="mr-2 h-5 w-5" />
              Comprar Gift Card
            </Link>
          </Button>
        </div>

      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-spa-rose-300/60 rounded-full flex justify-center shadow-sm">
          <div className="w-1 h-3 bg-spa-rose-300/80 rounded-full mt-2"></div>
        </div>
      </div>
    </section>
  )
}

{/* Stats Section - Moved Outside Hero */}
export function StatsSection() {
  return (
    <section className="py-16 bg-gradient-to-b from-[#FFFBF9] to-rose-50/20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="text-center fade-in">
            <div className="text-5xl md:text-6xl font-serif font-bold gradient-text mb-3">500+</div>
            <div className="text-sm text-gray-600 font-light uppercase tracking-wider">Clientes Felices</div>
          </div>
          <div className="text-center fade-in">
            <div className="text-5xl md:text-6xl font-serif font-bold gradient-text mb-3">15+</div>
            <div className="text-sm text-gray-600 font-light uppercase tracking-wider">Servicios Premium</div>
          </div>
          <div className="text-center fade-in">
            <div className="text-5xl md:text-6xl font-serif font-bold gradient-text mb-3">4.9</div>
            <div className="text-sm text-gray-600 font-light uppercase tracking-wider">Calificación Promedio</div>
          </div>
        </div>
      </div>
    </section>
  )
}
