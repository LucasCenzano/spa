import { Navbar } from '@/components/layout/navbar'
import { Footer } from '@/components/layout/footer'

export default function ConfiguracionPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-center mb-8">Configuración</h1>
          <p className="text-center text-gray-600">Página en construcción</p>
        </div>
      </main>
      <Footer />
    </>
  )
}
