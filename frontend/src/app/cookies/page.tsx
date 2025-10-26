export default function CookiesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h1 className="text-3xl font-bold gradient-text mb-8">Política de Cookies</h1>
          
          <div className="prose max-w-none">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">¿Qué son las cookies?</h2>
            <p className="text-gray-600 mb-6">
              Las cookies son pequeños archivos de texto que se almacenan en su dispositivo cuando visita nuestro sitio web. 
              Nos ayudan a mejorar su experiencia de navegación y a proporcionar servicios personalizados.
            </p>

            <h2 className="text-xl font-semibold text-gray-900 mb-4">Tipos de cookies que utilizamos</h2>
            <div className="space-y-4 mb-6">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-2">Cookies esenciales</h3>
                <p className="text-gray-600">
                  Necesarias para el funcionamiento básico del sitio web, incluyendo la autenticación y la seguridad.
                </p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-2">Cookies de rendimiento</h3>
                <p className="text-gray-600">
                  Nos ayudan a entender cómo los visitantes interactúan con nuestro sitio web.
                </p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-2">Cookies de funcionalidad</h3>
                <p className="text-gray-600">
                  Permiten que el sitio web recuerde sus preferencias y proporcione características mejoradas.
                </p>
              </div>
            </div>

            <h2 className="text-xl font-semibold text-gray-900 mb-4">Cómo gestionar las cookies</h2>
            <p className="text-gray-600 mb-6">
              Puede controlar y eliminar las cookies a través de la configuración de su navegador. 
              Sin embargo, tenga en cuenta que deshabilitar ciertas cookies puede afectar la funcionalidad del sitio web.
            </p>

            <h2 className="text-xl font-semibold text-gray-900 mb-4">Cookies de terceros</h2>
            <p className="text-gray-600 mb-6">
              Utilizamos servicios de terceros como Google Analytics para analizar el uso del sitio web. 
              Estos servicios pueden establecer sus propias cookies.
            </p>

            <h2 className="text-xl font-semibold text-gray-900 mb-4">Actualizaciones de esta política</h2>
            <p className="text-gray-600 mb-6">
              Podemos actualizar esta política de cookies ocasionalmente. 
              Le recomendamos revisar esta página periódicamente para estar informado de cualquier cambio.
            </p>

            <h2 className="text-xl font-semibold text-gray-900 mb-4">Contacto</h2>
            <p className="text-gray-600 mb-6">
              Si tiene preguntas sobre nuestra política de cookies, puede contactarnos a través de 
              nuestra página de contacto.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
