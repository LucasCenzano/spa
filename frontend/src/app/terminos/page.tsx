export default function TerminosPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h1 className="text-3xl font-bold gradient-text mb-8">Términos y Condiciones</h1>
          
          <div className="prose max-w-none">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">1. Aceptación de los Términos</h2>
            <p className="text-gray-600 mb-6">
              Al acceder y utilizar nuestros servicios, usted acepta estar sujeto a estos términos y condiciones. 
              Si no está de acuerdo con alguna parte de estos términos, no debe utilizar nuestros servicios.
            </p>

            <h2 className="text-xl font-semibold text-gray-900 mb-4">2. Servicios Ofrecidos</h2>
            <p className="text-gray-600 mb-6">
              Ofrecemos servicios de spa y bienestar, incluyendo masajes, tratamientos faciales, 
              terapias corporales y otros servicios relacionados con el cuidado personal y la relajación.
            </p>

            <h2 className="text-xl font-semibold text-gray-900 mb-4">3. Reservas y Cancelaciones</h2>
            <p className="text-gray-600 mb-6">
              Las reservas deben realizarse con al menos 24 horas de anticipación. 
              Las cancelaciones pueden realizarse hasta 4 horas antes de la cita sin costo adicional.
            </p>

            <h2 className="text-xl font-semibold text-gray-900 mb-4">4. Política de Pagos</h2>
            <p className="text-gray-600 mb-6">
              Los pagos se realizan al momento de la reserva o al finalizar el servicio. 
              Aceptamos efectivo, tarjetas de crédito/débito y transferencias bancarias.
            </p>

            <h2 className="text-xl font-semibold text-gray-900 mb-4">5. Responsabilidades del Cliente</h2>
            <p className="text-gray-600 mb-6">
              Los clientes deben informar sobre cualquier condición médica, alergias o limitaciones 
              físicas antes de recibir cualquier tratamiento.
            </p>

            <h2 className="text-xl font-semibold text-gray-900 mb-4">6. Modificaciones</h2>
            <p className="text-gray-600 mb-6">
              Nos reservamos el derecho de modificar estos términos en cualquier momento. 
              Los cambios serán efectivos inmediatamente después de su publicación en nuestro sitio web.
            </p>

            <h2 className="text-xl font-semibold text-gray-900 mb-4">7. Contacto</h2>
            <p className="text-gray-600 mb-6">
              Para cualquier consulta sobre estos términos, puede contactarnos a través de 
              nuestra página de contacto o por teléfono.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
