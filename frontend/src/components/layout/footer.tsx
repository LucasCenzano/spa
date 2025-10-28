import Link from 'next/link'
import { Instagram, Facebook, Mail, Phone, MapPin } from 'lucide-react'

export function Footer() {
  return (
    <footer className="bg-gradient-to-b from-[#FFFBF9] to-rose-50/30 text-gray-700 border-t border-rose-100/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* About */}
          <div>
            <h3 className="text-spa-rose-600 font-bold text-xl mb-4 font-serif">Ce Spa</h3>
            <p className="text-sm text-gray-600 leading-relaxed font-light">
              Tu destino de bienestar y relajación. Experiencias únicas diseñadas para tu cuidado personal.
            </p>
            <div className="flex space-x-4 mt-6">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-spa-rose-400 hover:text-spa-gold-500 transition-colors duration-300">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-spa-rose-400 hover:text-spa-gold-500 transition-colors duration-300">
                <Facebook className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-gray-800 font-semibold mb-4 font-sans text-sm uppercase tracking-wider">Enlaces Rápidos</h3>
            <ul className="space-y-3 text-sm">
              <li><Link href="/servicios" className="text-gray-600 hover:text-spa-rose-500 transition-colors duration-300 font-light">Servicios</Link></li>
              <li><Link href="/promociones" className="text-gray-600 hover:text-spa-rose-500 transition-colors duration-300 font-light">Promociones</Link></li>
              <li><Link href="/gift-cards" className="text-gray-600 hover:text-spa-gold-500 transition-colors duration-300 font-light">Gift Cards</Link></li>
              <li><Link href="/nosotros" className="text-gray-600 hover:text-spa-green-500 transition-colors duration-300 font-light">Nosotros</Link></li>
              <li><Link href="/contacto" className="text-gray-600 hover:text-spa-rose-500 transition-colors duration-300 font-light">Contacto</Link></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-gray-800 font-semibold mb-4 font-sans text-sm uppercase tracking-wider">Legal</h3>
            <ul className="space-y-3 text-sm">
              <li><Link href="/terminos" className="text-gray-600 hover:text-spa-rose-500 transition-colors duration-300 font-light">Términos y Condiciones</Link></li>
              <li><Link href="/privacidad" className="text-gray-600 hover:text-spa-rose-500 transition-colors duration-300 font-light">Política de Privacidad</Link></li>
              <li><Link href="/cookies" className="text-gray-600 hover:text-spa-rose-500 transition-colors duration-300 font-light">Política de Cookies</Link></li>
              <li><Link href="/cancelaciones" className="text-gray-600 hover:text-spa-rose-500 transition-colors duration-300 font-light">Política de Cancelación</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-gray-800 font-semibold mb-4 font-sans text-sm uppercase tracking-wider">Contacto</h3>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start space-x-3">
                <MapPin className="h-4 w-4 text-spa-rose-400 mt-0.5 flex-shrink-0" />
                <span className="text-gray-600 font-light">Av. Principal 123, CABA</span>
              </li>
              <li className="flex items-start space-x-3">
                <Phone className="h-4 w-4 text-spa-rose-400 mt-0.5 flex-shrink-0" />
                <a href="tel:+541112345678" className="text-gray-600 hover:text-spa-rose-500 transition-colors duration-300 font-light">+54 11 1234-5678</a>
              </li>
              <li className="flex items-start space-x-3">
                <Mail className="h-4 w-4 text-spa-rose-400 mt-0.5 flex-shrink-0" />
                <a href="mailto:info@cespa.com" className="text-gray-600 hover:text-spa-rose-500 transition-colors duration-300 font-light">info@cespa.com</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-rose-100/40 mt-12 pt-8 text-sm text-center">
          <p className="text-gray-500 font-light">&copy; {new Date().getFullYear()} Ce Spa. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  )
}
