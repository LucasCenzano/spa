export default function PrivacidadPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h1 className="text-3xl font-bold gradient-text mb-8">Política de Privacidad</h1>
          
          <div className="prose max-w-none">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Información que recopilamos</h2>
            <p className="text-gray-600 mb-6">
              Recopilamos información personal que nos proporciona directamente, como su nombre, 
              dirección de correo electrónico, número de teléfono y preferencias de servicios.
            </p>

            <h2 className="text-xl font-semibold text-gray-900 mb-4">Cómo utilizamos su información</h2>
            <div className="space-y-3 mb-6">
              <p className="text-gray-600">• Para procesar sus reservas y proporcionar nuestros servicios</p>
              <p className="text-gray-600">• Para comunicarnos con usted sobre sus citas y servicios</p>
              <p className="text-gray-600">• Para mejorar nuestros servicios y experiencia del cliente</p>
              <p className="text-gray-600">• Para enviarle información promocional (con su consentimiento)</p>
            </div>

            <h2 className="text-xl font-semibold text-gray-900 mb-4">Protección de datos</h2>
            <p className="text-gray-600 mb-6">
              Implementamos medidas de seguridad técnicas y organizativas apropiadas para proteger 
              su información personal contra acceso no autorizado, alteración, divulgación o destrucción.
            </p>

            <h2 className="text-xl font-semibold text-gray-900 mb-4">Compartir información</h2>
            <p className="text-gray-600 mb-6">
              No vendemos, alquilamos ni compartimos su información personal con terceros, 
              excepto cuando sea necesario para proporcionar nuestros servicios o cuando la ley lo requiera.
            </p>

            <h2 className="text-xl font-semibold text-gray-900 mb-4">Sus derechos</h2>
            <div className="space-y-3 mb-6">
              <p className="text-gray-600">• Acceder a su información personal</p>
              <p className="text-gray-600">• Corregir información inexacta</p>
              <p className="text-gray-600">• Solicitar la eliminación de sus datos</p>
              <p className="text-gray-600">• Retirar su consentimiento en cualquier momento</p>
              <p className="text-gray-600">• Portabilidad de datos</p>
            </div>

            <h2 className="text-xl font-semibold text-gray-900 mb-4">Cookies y tecnologías similares</h2>
            <p className="text-gray-600 mb-6">
              Utilizamos cookies y tecnologías similares para mejorar su experiencia en nuestro sitio web. 
              Puede gestionar sus preferencias de cookies a través de la configuración de su navegador.
            </p>

            <h2 className="text-xl font-semibold text-gray-900 mb-4">Retención de datos</h2>
            <p className="text-gray-600 mb-6">
              Conservamos su información personal solo durante el tiempo necesario para cumplir con los 
              propósitos descritos en esta política o según lo requiera la ley.
            </p>

            <h2 className="text-xl font-semibold text-gray-900 mb-4">Cambios en esta política</h2>
            <p className="text-gray-600 mb-6">
              Podemos actualizar esta política de privacidad ocasionalmente. Le notificaremos sobre 
              cambios significativos a través de nuestro sitio web o por correo electrónico.
            </p>

            <h2 className="text-xl font-semibold text-gray-900 mb-4">Contacto</h2>
            <p className="text-gray-600 mb-6">
              Si tiene preguntas sobre esta política de privacidad o desea ejercer sus derechos, 
              puede contactarnos a través de nuestra página de contacto.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
