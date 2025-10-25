'use client'

import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { Sparkles, Calendar, Gift } from 'lucide-react'

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden spa-gradient">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 2px 2px, gray 1px, transparent 0)',
          backgroundSize: '40px 40px'
        }} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 text-center">
        {/* Promotional Badge */}
        <div className="inline-flex items-center space-x-2 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm rounded-full px-4 py-2 mb-8 border">
          <Sparkles className="h-4 w-4 text-purple-600" />
          <span className="text-sm font-medium">Promoción de Apertura - 20% OFF</span>
        </div>

        {/* Main Heading */}
        <h1 className="text-5xl md:text-7xl font-bold mb-6">
          <span className="gradient-text">Experiencia de Lujo</span>
          <br />
          <span className="text-gray-900 dark:text-white">para tu Bienestar</span>
        </h1>

        {/* Description */}
        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-12">
          Descubre un oasis de tranquilidad donde cada detalle está diseñado para tu relajación. 
          Masajes terapéuticos, tratamientos faciales y rituales exclusivos.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button size="lg" className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700" asChild>
            <Link href="/servicios">
              <Calendar className="mr-2 h-5 w-5" />
              Reservar Ahora
            </Link>
          </Button>
          <Button size="lg" variant="outline" asChild>
            <Link href="/gift-cards">
              <Gift className="mr-2 h-5 w-5" />
              Comprar Gift Card
            </Link>
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-8 max-w-3xl mx-auto mt-20">
          <div className="text-center">
            <div className="text-4xl font-bold gradient-text mb-2">500+</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Clientes Felices</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold gradient-text mb-2">15+</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Servicios Premium</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold gradient-text mb-2">4.9</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Calificación Promedio</div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-gray-400 rounded-full mt-2"></div>
        </div>
      </div>
    </section>
  )
}
