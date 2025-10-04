import { Facebook, Instagram, Linkedin, Mail, Phone, MapPin } from "lucide-react";
import { Twitter } from "lucide-react";

const Footer = () => {
  return (
    <footer
      className="bg-cml-green text-white relative"
      style={{
        backgroundImage: "url('/footer.png')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <p className="text-footer leading-relaxed">
              Centre for Microfinance & Livelihood (CML) is a 
              Tata Trusts initiative committed to empowering 
              communities across Northeast India through 
              sustainable development in livelihoods, 
              education, health, and leadership.
            </p>
            <div className="flex space-x-4">
              <a href="https://www.facebook.com/cmltatatrustssports/" target="_blank" rel="noopener noreferrer">
                <Facebook className="h-6 w-6 hover:text-cml-orange transition-colors cursor-pointer" />
              </a>
              <a href="https://www.instagram.com/cmlnortheast/" target="_blank" rel="noopener noreferrer">
                <Instagram className="h-6 w-6 hover:text-cml-orange transition-colors cursor-pointer" />
              </a>
              <a href="https://www.linkedin.com/company/centre-for-microfinance-and-livelihood/" target="_blank" rel="noopener noreferrer">
                <Linkedin className="h-6 w-6 hover:text-cml-orange transition-colors cursor-pointer" />
              </a>
              <a href="https://x.com/CMLnortheast" target="_blank" rel="noopener noreferrer">
                <Twitter className="h-6 w-6 hover:text-cml-orange transition-colors cursor-pointer" />
              </a>
            </div>
          </div>

          {/* About Us */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold">ABOUT US</h3>
            <ul className="space-y-2 text-footer">
              <li><a href="#story" className="hover:text-cml-orange transition-colors">Our Story</a></li>
              <li><a href="#vision" className="hover:text-cml-orange transition-colors">Vision & Mission</a></li>
              <li><a href="#leadership" className="hover:text-cml-orange transition-colors">Leadership Team</a></li>
              <li><a href="#board" className="hover:text-cml-orange transition-colors">Board of Directors</a></li>
              <li><a href="#reports" className="hover:text-cml-orange transition-colors">Annual Reports</a></li>
              <li><a href="/MediaCoverage" className="hover:text-cml-orange transition-colors">News And Events</a></li>
            </ul>
          </div>

          {/* Our Work */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold">OUR WORK</h3>
            <ul className="space-y-2 text-footer">
              <li><a href="#whatwedo" className="hover:text-cml-orange transition-colors">Education</a></li>
              <li><a href="#whatwedo"  className="hover:text-cml-orange transition-colors">Livelihood</a></li>
              <li><a href="#whatwedo"  className="hover:text-cml-orange transition-colors">WaSH</a></li>
              <li><a href="#whatwedo"  className="hover:text-cml-orange transition-colors">Institution Building</a></li>

            </ul>
          </div>

          {/* Get in Touch */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold">GET IN TOUCH</h3>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <Mail className="h-5 w-5 mt-1 flex-shrink-0 text-cml-orange" />
                <span className="text-footer">contact@cmlnortheast.org</span>
              </div>
              <div className="flex items-start space-x-3">
                <Phone className="h-5 w-5 mt-1 flex-shrink-0 text-cml-orange" />
                <span className="text-footer">+91 96781 45549</span>
              </div>
              <div className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 mt-1 flex-shrink-0 text-cml-orange" />
                <div className="text-footer">
                  <p>5th Floor, Divine Plaza, GS Rd, Super Market, Dispur, Sarumotoria, Guwahati, Assam 781005</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-white/20 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-footer">
              © 2025 Centre for Microfinance & Livelihood. All rights reserved. | Charity Registration: 12A & 80G Certified
            </p>
            <div className="flex space-x-6 text-footer">
              <a href="/privacy" className="hover:text-cml-orange transition-colors">Privacy Policy</a>
              <a href="/terms" className="hover:text-cml-orange transition-colors">Terms & Conditions</a>
              <a href="/refund" className="hover:text-cml-orange transition-colors">Refund Policy</a>
          
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;