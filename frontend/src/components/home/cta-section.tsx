import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { Calendar, Gift } from 'lucide-react'

export function CTASection() {
  return (
    <section className="py-20 spa-gradient">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-4xl md:text-5xl font-bold mb-6">
          ¿Listo para tu <span className="gradient-text">Momento de Relax</span>?
        </h2>
        <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
          Reserva ahora y experimenta el mejor cuidado personal en un ambiente de lujo
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button size="lg" className="bg-gradient-to-r from-purple-600 to-pink-600" asChild>
            <Link href="/servicios">
              <Calendar className="mr-2 h-5 w-5" />
              Reservar Ahora
            </Link>
          </Button>
          <Button size="lg" variant="outline" asChild>
            <Link href="/gift-cards">
              <Gift className="mr-2 h-5 w-5" />
              Regalar Experiencia
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
