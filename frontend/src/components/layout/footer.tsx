import Link from 'next/link'
import { Instagram, Facebook, Mail, Phone, MapPin } from 'lucide-react'

export function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4">Spa de Lujo</h3>
            <p className="text-sm text-gray-400">
              Tu destino de bienestar y relajación. Experiencias únicas diseñadas para tu cuidado personal.
            </p>
            <div className="flex space-x-4 mt-4">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition">
                <Facebook className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Enlaces Rápidos</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/servicios" className="hover:text-white transition">Servicios</Link></li>
              <li><Link href="/promociones" className="hover:text-white transition">Promociones</Link></li>
              <li><Link href="/gift-cards" className="hover:text-white transition">Gift Cards</Link></li>
              <li><Link href="/nosotros" className="hover:text-white transition">Nosotros</Link></li>
              <li><Link href="/contacto" className="hover:text-white transition">Contacto</Link></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-white font-semibold mb-4">Legal</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/terminos" className="hover:text-white transition">Términos y Condiciones</Link></li>
              <li><Link href="/privacidad" className="hover:text-white transition">Política de Privacidad</Link></li>
              <li><Link href="/cookies" className="hover:text-white transition">Política de Cookies</Link></li>
              <li><Link href="/cancelaciones" className="hover:text-white transition">Política de Cancelación</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-semibold mb-4">Contacto</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center space-x-2">
                <MapPin className="h-4 w-4" />
                <span>Av. Principal 123, CABA</span>
              </li>
              <li className="flex items-center space-x-2">
                <Phone className="h-4 w-4" />
                <a href="tel:+541112345678" className="hover:text-white transition">+54 11 1234-5678</a>
              </li>
              <li className="flex items-center space-x-2">
                <Mail className="h-4 w-4" />
                <a href="mailto:info@spadelujo.com" className="hover:text-white transition">info@spadelujo.com</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-sm text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} Spa de Lujo. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  )
}
