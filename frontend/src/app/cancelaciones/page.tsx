export default function CancelacionesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h1 className="text-3xl font-bold gradient-text mb-8">Política de Cancelaciones</h1>
          
          <div className="prose max-w-none">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Cancelaciones sin costo</h2>
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
              <p className="text-green-800">
                <strong>Hasta 4 horas antes:</strong> Puede cancelar su reserva sin ningún costo adicional.
              </p>
            </div>

            <h2 className="text-xl font-semibold text-gray-900 mb-4">Cancelaciones con costo</h2>
            <div className="space-y-4 mb-6">
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <p className="text-yellow-800">
                  <strong>Entre 2-4 horas antes:</strong> Se cobrará el 25% del valor del servicio.
                </p>
              </div>
              <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                <p className="text-orange-800">
                  <strong>Entre 1-2 horas antes:</strong> Se cobrará el 50% del valor del servicio.
                </p>
              </div>
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <p className="text-red-800">
                  <strong>Menos de 1 hora o no presentarse:</strong> Se cobrará el 100% del valor del servicio.
                </p>
              </div>
            </div>

            <h2 className="text-xl font-semibold text-gray-900 mb-4">Cómo cancelar</h2>
            <div className="space-y-3 mb-6">
              <p className="text-gray-600">• Llamando a nuestro teléfono de contacto</p>
              <p className="text-gray-600">• Enviando un email a nuestra dirección de contacto</p>
              <p className="text-gray-600">• A través de nuestra plataforma online (si está disponible)</p>
              <p className="text-gray-600">• En persona en nuestras instalaciones</p>
            </div>

            <h2 className="text-xl font-semibold text-gray-900 mb-4">Reagendamiento</h2>
            <p className="text-gray-600 mb-6">
              Si necesita reagendar su cita, puede hacerlo sin costo adicional hasta 4 horas antes 
              de la hora original, sujeto a disponibilidad.
            </p>

            <h2 className="text-xl font-semibold text-gray-900 mb-4">Cancelaciones por emergencia</h2>
            <p className="text-gray-600 mb-6">
              En casos de emergencia médica o situaciones imprevistas, evaluaremos cada caso 
              individualmente y podremos hacer excepciones a nuestra política estándar.
            </p>

            <h2 className="text-xl font-semibold text-gray-900 mb-4">Reembolsos</h2>
            <p className="text-gray-600 mb-6">
              Los reembolsos se procesarán dentro de 5-10 días hábiles después de la cancelación 
              confirmada, utilizando el mismo método de pago original.
            </p>

            <h2 className="text-xl font-semibold text-gray-900 mb-4">Contacto</h2>
            <p className="text-gray-600 mb-6">
              Para cancelaciones o consultas sobre esta política, puede contactarnos a través de 
              nuestra página de contacto o por teléfono.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
