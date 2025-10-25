'use client'

import { Card, CardContent } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Star } from 'lucide-react'

const testimonials = [
  {
    id: 1,
    name: 'María González',
    avatar: '',
    rating: 5,
    comment: 'Una experiencia increíble. El masaje relajante fue exactamente lo que necesitaba después de una semana estresante.',
    service: 'Masaje Relajante',
  },
  {
    id: 2,
    name: 'Carlos Rodríguez',
    avatar: '',
    rating: 5,
    comment: 'Excelente atención y servicios de primera calidad. El facial rejuvenecedor dejó mi piel radiante.',
    service: 'Facial Rejuvenecedor',
  },
  {
    id: 3,
    name: 'Laura Martínez',
    avatar: '',
    rating: 5,
    comment: 'El ritual de piedras calientes fue mágico. Nunca me había sentido tan relajada.',
    service: 'Ritual de Piedras',
  },
]

export function TestimonialsSection() {
  return (
    <section className="py-20 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">
            Lo que dicen <span className="gradient-text">Nuestros Clientes</span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Experiencias reales de quienes confían en nosotros
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.id} className="hover-lift">
              <CardContent className="pt-6">
                <div className="flex items-center mb-4">
                  <Avatar className="h-12 w-12 mr-4">
                    <AvatarImage src={testimonial.avatar} />
                    <AvatarFallback>{testimonial.name[0]}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-semibold">{testimonial.name}</div>
                    <div className="text-sm text-gray-500">{testimonial.service}</div>
                  </div>
                </div>
                
                <div className="flex mb-3">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>

                <p className="text-gray-600 dark:text-gray-400">{testimonial.comment}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
