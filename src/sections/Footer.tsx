import { Link } from 'react-router-dom'
import { Phone, MapPin, Facebook, MessageCircle } from 'lucide-react'

const quickLinks = [
  { label: 'Home', path: '/' },
  { label: 'New Industrial / Commercial Launches', path: '/launches' },
  { label: 'About', path: '/about' },
  { label: 'Our Team', path: '/team' },
  { label: 'Blog', path: '/blog' },
  { label: 'Privacy Policy', path: '#' },
]

export default function Footer() {
  return (
    <footer style={{ backgroundColor: '#1C1A17' }} className="pt-20 pb-10">
      <div className="max-w-[1128px] mx-auto px-6">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {/* Column 1: Logo & Description */}
          <div>
            <Link to="/" className="flex items-center gap-3 mb-4">
              <img
                src="/images/SGIG_HighRes_Print.png"
                alt="SG Industrial Properties Logo"
                className="h-10 w-auto"
              />
              <span className="font-sans text-base font-semibold text-white">
                SG INDUSTRIAL PROPERTIES
              </span>
            </Link>
            <p className="font-sans text-sm leading-relaxed" style={{ color: '#6B6560' }}>
              Creating wealth through Singapore Industrial Property Investments since 2009. Specializing in B1 and B2 industrial properties across all major districts.
            </p>
            {/* Social Links */}
            <div className="flex items-center gap-4 mt-6">
              <a
                href="https://www.facebook.com/sgindustrialproperties/"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors hover:text-[#4A3E3D]"
                style={{ color: '#6B6560' }}
                aria-label="Facebook"
              >
                <Facebook size={20} />
              </a>
              <a
                href="https://wa.me/message/7EESXSAYAH2II1"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors hover:text-[#4A3E3D]"
                style={{ color: '#6B6560' }}
                aria-label="WhatsApp"
              >
                <MessageCircle size={20} />
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 className="font-sans text-sm font-semibold text-white mb-4">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.path}
                    className="font-sans text-sm transition-colors hover:text-[#4A3E3D]"
                    style={{ color: '#6B6560' }}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 2: Contact Info */}
          <div>
            <h4 className="font-sans text-sm font-semibold text-white mb-4">
              Contact Us
            </h4>
            <ul className="space-y-4">
              <li className="flex items-center gap-3">
                <Phone size={16} color="#4A3E3D" />
                <a
                  href="tel:+6597687722"
                  className="font-sans text-sm transition-colors hover:text-[#4A3E3D]"
                  style={{ color: '#6B6560' }}
                >
                  +65 9768 7722
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={16} color="#4A3E3D" />
                <a
                  href="tel:+6586882929"
                  className="font-sans text-sm transition-colors hover:text-[#4A3E3D]"
                  style={{ color: '#6B6560' }}
                >
                  +65 8688 2929
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin size={16} color="#4A3E3D" className="mt-0.5" />
                <span className="font-sans text-sm" style={{ color: '#6B6560' }}>
                  Singapore<br />
                  (serving all industrial districts)
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* SEO Rich Text Block */}
        <div className="mt-12 pt-8" style={{ borderTop: '1px solid rgba(255,255,255,0.1)' }}>
          <p className="font-sans text-xs leading-relaxed max-w-[800px]" style={{ color: '#6B6560' }}>
            <strong>SG Industrial Properties</strong> and <strong>SG Industrial Group</strong> are Singapore's premier industrial property specialists, focusing on industrial new launch and industrial new project developments, B1 and B2 factories, warehouses, and business parks for sale and for rent. All industrial properties come with <strong>No ABSD</strong> (No Additional Buyer's Stamp Duty), making them highly attractive investments. Led by James Goh (R002565A), our team of 21 CEA registered industrial specialists includes Caroline Chan (R046614C), Alvin Lim (R042513G), Amanda Chuah (R056404H), David Yong (R056841H), Greenie Choo (R023447A), Jimmy Ng (R009588I), John Suar (R009496C), Ken Ng (R024280F), Lee Geok Chew (R023491I), Maverick Cheng (R016259D), Moon Lai (R062936J), Paul Tan (R024959B), Shaun Quai (R073861I), Simon Tham (R023257F), SK Lee (R065066G), Stella Ng (R016155E), Sunny Chua (R052568I), Teressa Tang (R019925J), and Theresa Tan (R052724Z). Our featured industrial new launches include Gate+ at Tukang Jurong, CT Gold at Macpherson (100% fully sold), Generations@Tannery at 71 Tannery Lane, and Gourmet Xchange at 1 Kallang Way. We cover all major Singapore industrial districts including Tuas, Jurong, Woodlands, Changi, Paya Lebar, Macpherson, Kaki Bukit, and Ubi. Contact us for industrial property investment, factory sales, warehouse rentals, and industrial space leasing across Singapore.
          </p>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-6 text-center" style={{ borderTop: '1px solid rgba(255,255,255,0.1)' }}>
          <p className="font-mono text-xs" style={{ color: '#6B6560' }}>
            &copy; 2024 SG Industrial Properties. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
