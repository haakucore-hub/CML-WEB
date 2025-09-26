import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, ChevronDown, ChevronRight } from "lucide-react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isWorkDropdownOpen, setIsWorkDropdownOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("LIVELIHOOD");

  const workCategories = {
    LIVELIHOOD: [
      "ORCHARD INTENSIFICATION",
      "FLOOD RESILIENCE", 
      "FISHERY DEVELOPMENT",
      "ASI - LIVELIHOOD"
    ],
    EDUCATION: [
      "EARLY CHILDHOOD DEVELOPMENT",
      "SCHOOL IMPROVEMENT",
      "TEACHER TRAINING",
      "DIGITAL LITERACY"
    ],
    "waSH": [
      "ANTARAN",
      "WATER INFRASTRUCTURE",
      "SANITATION PROGRAMS",
      "HYGIENE EDUCATION"
    ]
  };

  return (
    <header className="flex items-center justify-center bg-white shadow-sm sticky top-0 z-50 md:h-[90px]  text-center">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
           {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden m-2 text-cml-black"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>


          {/* Logo */}
          <div className="flex items-center space-x-3">
            <img 
              src="Logo.png" 
              alt="Centre for Microfinance & Livelihood" 
              className=" md:h-[60px] w-auto"
            />
          </div>

           {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-white  bg-cml-orange hover:bg-cml-orange/90 text-[14px] m-2   py-1 px-3 rounded-full font-semibold"
          >
                  DONATE
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            <a href="/" className="text-cta text-cml-black hover:text-cml-orange transition-colors">
              HOME
            </a>
            <div className="relative">
              <button 
                className="text-cta text-cml-black hover:text-cml-orange transition-colors flex items-center"
                onMouseEnter={() => setIsWorkDropdownOpen(true)}
                onMouseLeave={() => setIsWorkDropdownOpen(false)}
              >
                OUR WORK
                <ChevronDown className="ml-1 h-4 w-4" />
              </button>
              
              {/* Multi-level Dropdown */}
              {isWorkDropdownOpen && (
                <div 
                  className="absolute top-full left-0 mt-2 w-96 bg-white rounded-lg shadow-xl border z-50"
                  onMouseEnter={() => setIsWorkDropdownOpen(true)}
                  onMouseLeave={() => setIsWorkDropdownOpen(false)}
                >
                  <div className="flex">
                    {/* Main Categories */}
                    <div className="w-1/2 border-r">
                      {Object.keys(workCategories).map((category) => (
                        <button
                          key={category}
                          className={`w-full text-left px-4 py-3 text-cta transition-colors flex items-center justify-between ${
                            selectedCategory === category 
                              ? 'bg-cml-orange text-white' 
                              : 'text-cml-black hover:bg-gray-50'
                          }`}
                          onMouseEnter={() => setSelectedCategory(category)}
                        >
                          {category}
                          <ChevronRight className="h-4 w-4" />
                        </button>
                      ))}
                    </div>
                    
                    {/* Subcategories */}
                    <div className="w-1/2">
                      {workCategories[selectedCategory as keyof typeof workCategories]?.map((subCategory) => (
                        <a
                          key={subCategory}
                          href={`#${subCategory.toLowerCase().replace(/\s+/g, '-')}`}
                          className="block px-4 py-3 text-sm text-cml-black hover:bg-gray-50 transition-colors"
                        >
                          {subCategory}
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
            <a href="/about" className="text-cta text-cml-black hover:text-cml-orange transition-colors">
              ABOUT US
            </a>
            <a href="/MediaCoverage" className="text-cta text-cml-black hover:text-cml-orange transition-colors">
              MEDIA COVERAGE
            </a>
            <a href="/Tenders" className="text-cta text-cml-black hover:text-cml-orange transition-colors">
              TENDERS
            </a>
            <a href="/Career" className="text-cta text-cml-black hover:text-cml-orange transition-colors">
              CAREER
            </a>
          </nav>

          {/* CTA Button */}
          <div className="hidden md:block text-white ">
            <Button className="text-white  bg-cml-orange hover:bg-cml-orange/90  text-cta  px-6 py-2 rounded-full font-semibold">
              COLLABORATE
            </Button>
          </div>

         
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className=":hidden py-4 border-t">
            <nav className="flex flex-col space-y-4">
              <a href="#home" className="text-cta text-cml-black hover:text-cml-orange">HOME</a>
              <a href="#work" className="text-cta text-cml-black hover:text-cml-orange">OUR WORK</a>
              <a href="#about" className="text-cta text-cml-black hover:text-cml-orange">ABOUT US</a>
              <a href="#media" className="text-cta text-cml-black hover:text-cml-orange">MEDIA COVERAGE</a>
              <a href="#tenders" className="text-cta text-cml-black hover:text-cml-orange">TENDERS</a>
              <a href="#career" className="text-cta text-cml-black hover:text-cml-orange">CAREER</a>
              <Button className="text-white  bg-cml-orange hover:bg-cml-orange/90  text-cta  px-6 py-2 rounded-full font-semibold">
                COLLABORATE
              </Button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;