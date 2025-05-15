import Link from "next/link"
import { Facebook, Instagram, Twitter, Youtube, Mail, MapPin, Phone } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-gradient-to-r from-indigo-600 to-blue-600 text-white py-12 relative z-10 overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5 z-0">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('/abstract-geometric-pattern.png')] bg-no-repeat bg-cover"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
          {/* Logo and description */}
          <div className="space-y-4">
            <div className="flex items-center gap-3 mb-4 group">
              <div className="bg-white rounded-full p-1.5 shadow-lg transform transition-transform duration-300 group-hover:scale-110">
                <img
                  src="/images/unismuh-logo.png"
                  alt="Logo Universitas Muhammadiyah Makassar"
                  width={48}
                  height={48}
                  className="rounded-full transition-all duration-300"
                />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white">BUMM</h2>
                <p className="text-sm text-gray-100">Beasiswa Unggulan Unismuh Makassar</p>
              </div>
            </div>
            <p className="text-sm text-gray-200 leading-relaxed">
              Portal Beasiswa Universitas Muhammadiyah Makassar menyediakan informasi dan layanan beasiswa bagi
              mahasiswa yang berprestasi.
            </p>
            <div className="flex items-center gap-3 mt-4">
              <Link href="#" className="transition-transform hover:scale-110" title="Akreditasi Unggul">
                <img
                  src="/images/logo-akreditasi-unggul.png"
                  alt="Akreditasi Unggul"
                  width={36}
                  height={36}
                  className="bg-white rounded-full p-1 shadow-md"
                />
              </Link>
              <Link href="#" className="transition-transform hover:scale-110" title="Green Islamic Futuristic">
                <img
                  src="/images/gift-unismuh.png"
                  alt="Green Islamic Futuristic"
                  width={36}
                  height={36}
                  className="bg-white rounded-full p-1 shadow-md"
                />
              </Link>
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 border-b border-white/20 pb-2">Tautan Cepat</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/"
                  className="text-sm text-gray-200 hover:text-white transition-colors flex items-center gap-2 group"
                >
                  <span className="w-1.5 h-1.5 bg-blue-300 rounded-full transition-all duration-300 group-hover:w-2 group-hover:h-2"></span>
                  Beranda
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-sm text-gray-200 hover:text-white transition-colors flex items-center gap-2 group"
                >
                  <span className="w-1.5 h-1.5 bg-blue-300 rounded-full transition-all duration-300 group-hover:w-2 group-hover:h-2"></span>
                  Tentang Kami
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-sm text-gray-200 hover:text-white transition-colors flex items-center gap-2 group"
                >
                  <span className="w-1.5 h-1.5 bg-blue-300 rounded-full transition-all duration-300 group-hover:w-2 group-hover:h-2"></span>
                  Syarat & Ketentuan
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-sm text-gray-200 hover:text-white transition-colors flex items-center gap-2 group"
                >
                  <span className="w-1.5 h-1.5 bg-blue-300 rounded-full transition-all duration-300 group-hover:w-2 group-hover:h-2"></span>
                  Kebijakan Privasi
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-sm text-gray-200 hover:text-white transition-colors flex items-center gap-2 group"
                >
                  <span className="w-1.5 h-1.5 bg-blue-300 rounded-full transition-all duration-300 group-hover:w-2 group-hover:h-2"></span>
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact information */}
          <div>
            <h3 className="text-lg font-semibold mb-4 border-b border-white/20 pb-2">Kontak</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-blue-300 mt-0.5 flex-shrink-0" />
                <p className="text-sm text-gray-200">
                  Jl. Sultan Alauddin No. 259, Makassar, Sulawesi Selatan, Indonesia 90221
                </p>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-blue-300 flex-shrink-0" />
                <p className="text-sm text-gray-200">+62 411 866972</p>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-blue-300 flex-shrink-0" />
                <p className="text-sm text-gray-200">beasiswa@unismuh.ac.id</p>
              </li>
            </ul>
          </div>

          {/* Social media and newsletter */}
          <div>
            <h3 className="text-lg font-semibold mb-4 border-b border-white/20 pb-2">Ikuti Kami</h3>
            <div className="flex flex-wrap gap-3 mb-6">
              <Link
                href="#"
                className="bg-white/10 hover:bg-white/20 p-2 rounded-full transition-all duration-300 hover:scale-110"
              >
                <Facebook className="h-5 w-5 text-white" />
              </Link>
              <Link
                href="#"
                className="bg-white/10 hover:bg-white/20 p-2 rounded-full transition-all duration-300 hover:scale-110"
              >
                <Instagram className="h-5 w-5 text-white" />
              </Link>
              <Link
                href="#"
                className="bg-white/10 hover:bg-white/20 p-2 rounded-full transition-all duration-300 hover:scale-110"
              >
                <Twitter className="h-5 w-5 text-white" />
              </Link>
              <Link
                href="#"
                className="bg-white/10 hover:bg-white/20 p-2 rounded-full transition-all duration-300 hover:scale-110"
              >
                <Youtube className="h-5 w-5 text-white" />
              </Link>
            </div>

            <h3 className="text-lg font-semibold mb-3">Jam Operasional</h3>
            <p className="text-sm text-gray-200 mb-1">Senin - Jumat: 08.00 - 16.00 WITA</p>
            <p className="text-sm text-gray-200">Sabtu: 08.00 - 12.00 WITA</p>
          </div>
        </div>

        {/* Bottom section */}
        <div className="border-t border-white/20 pt-6 mt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-300 mb-4 md:mb-0">
            © {new Date().getFullYear()} Universitas Muhammadiyah Makassar. Hak Cipta Dilindungi.
          </p>
          <div className="flex items-center gap-4">
            <Link href="#" className="text-xs text-gray-300 hover:text-white transition-colors">
              Peta Situs
            </Link>
            <span className="text-gray-500">|</span>
            <Link href="#" className="text-xs text-gray-300 hover:text-white transition-colors">
              Bantuan
            </Link>
            <span className="text-gray-500">|</span>
            <Link href="#" className="text-xs text-gray-300 hover:text-white transition-colors">
              Hubungi Kami
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
