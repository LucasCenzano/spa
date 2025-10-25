import { Shield, Award, Users, Clock } from 'lucide-react'

const features = [
  {
    icon: Shield,
    title: 'Ambiente Seguro',
    description: 'Protocolos de higiene y seguridad de máximo nivel para tu tranquilidad.',
  },
  {
    icon: Award,
    title: 'Profesionales Certificados',
    description: 'Equipo de terapeutas con certificación internacional y años de experiencia.',
  },
  {
    icon: Users,
    title: 'Atención Personalizada',
    description: 'Servicios adaptados a tus necesidades específicas y preferencias.',
  },
  {
    icon: Clock,
    title: 'Horarios Flexibles',
    description: 'Disponibilidad de lunes a domingo para adaptarnos a tu agenda.',
  },
]

export function FeaturesSection() {
  return (
    <section className="py-20 spa-gradient">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">
            ¿Por qué <span className="gradient-text">Elegirnos</span>?
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Compromiso con la excelencia en cada detalle de tu experiencia
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <div 
                key={index} 
                className="text-center p-6 rounded-lg glass-effect hover-lift"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 mb-4 rounded-full bg-gradient-to-br from-purple-600 to-pink-600">
                  <Icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600 dark:text-gray-400">{feature.description}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
