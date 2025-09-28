import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import useOurWorkStore from "@/store/useOurWorkStore";
import { Menu, X, ChevronDown, ChevronRight, ChevronUp } from "lucide-react";
import DonationPopup from "@/components/DonationPopup";

const Header = () => {
  const { ourWork, fetchOurWork } = useOurWorkStore();
  const [showDonation, setShowDonation] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isWorkDropdownOpen, setIsWorkDropdownOpen] = useState(false);
  const [isMobileWorkOpen, setIsMobileWorkOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("LIVELIHOOD");
  const [selectedMobileCategory, setSelectedMobileCategory] = useState("");


  // Static and final categories
  const categories = ['Livelihood', 'WaSH', 'Education', 'Institution Building'];

  // Get subcategories for each static category from ourWork
  const getSubcategories = (category: string) => {
    return ourWork
      .filter(item => item.type?.toLowerCase() === category.toLowerCase())
      .map(item => ({ id: item.id, title: item.title }));
  };

  // const workCategories = {
  //   LIVELIHOOD: [
  //     "ORCHARD INTENSIFICATION",
  //     "FLOOD RESILIENCE", 
  //     "FISHERY DEVELOPMENT",
  //     "ASI - LIVELIHOOD"
  //   ],
  //   EDUCATION: [
  //     "EARLY CHILDHOOD DEVELOPMENT",
  //     "SCHOOL IMPROVEMENT",
  //     "TEACHER TRAINING",
  //     "DIGITAL LITERACY"
  //   ],
  //   "waSH": [
  //     "ANTARAN",
  //     "WATER INFRASTRUCTURE",
  //     "SANITATION PROGRAMS",
  //     "HYGIENE EDUCATION"
  //   ]
  // };

  useEffect(() => {
    fetchOurWork();
  }, [fetchOurWork]);

  const toggleMobileCategory = (category) => {
    if (selectedMobileCategory === category) {
      setSelectedMobileCategory("");
    } else {
      setSelectedMobileCategory(category);
    }
  };

  return (
    <header className="flex items-center justify-between bg-white shadow-sm sticky top-0 z-50 md:h-[90px]">
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
              className="md:h-[60px] w-auto"
            />
          </div>

          {/* Mobile donate button */}
          <button
            onClick={() => setShowDonation(true)}

            className="md:hidden text-white bg-cml-orange hover:bg-cml-orange/90 text-[14px] m-2 py-1 px-3 rounded-full font-semibold"
          >
            DONATE
          </button>
          <DonationPopup open={showDonation} onClose={() => setShowDonation(false)} />
          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            <Link to="/" className="text-cta text-cml-black hover:text-cml-orange transition-colors border-b-2 border-transparent hover:border-cml-orange pb-1">
              HOME
            </Link>
            <div className="relative">
              <button
                className="text-cta text-cml-black hover:text-cml-orange transition-colors flex items-center border-b-2 border-transparent hover:border-cml-orange pb-1"
                onMouseEnter={() => setIsWorkDropdownOpen(true)}
                onMouseLeave={() => setIsWorkDropdownOpen(false)}
              >
                OUR WORK
                <ChevronDown className="ml-1 h-4 w-4" />
              </button>

              {/* Multi-level Dropdown */}
              {isWorkDropdownOpen && (
                <div
                  className="absolute top-full left-0  w-96 bg-white rounded-lg shadow-xl border z-500"
                  onMouseEnter={() => setIsWorkDropdownOpen(true)}
                  onMouseLeave={() => setIsWorkDropdownOpen(false)}
                >
                  <div className="flex">
                    {/* Main Categories */}
                    <div className="w-1/2 border-r">
                      {categories.map((category) => (
                        <button
                          key={category}
                          className={`w-full text-left px-4 py-3 text-cta flex items-center justify-between ${selectedCategory === category
                              ? "bg-cml-orange text-white"
                              : "text-cml-black hover:bg-gray-50"
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
                      {getSubcategories(selectedCategory).length > 0 ? (
                        getSubcategories(selectedCategory).map((subCategory) => (
                          <Link
                            key={subCategory.id}
                            to={`/WorkDetail/${subCategory.id}`}
                            className="block px-4 py-3 text-sm text-cml-black hover:bg-gray-50 border-b border-gray-100"
                          >
                            {subCategory.title}
                          </Link>
                        ))
                      ) : (
                        <div className="px-4 py-3 text-sm text-gray-400">No subcategories available</div>
                      )}
                    </div>

                  </div>
                </div>
              )}
            </div>
            <Link to="/about" className="text-cta text-cml-black hover:text-cml-orange transition-colors border-b-2 border-transparent hover:border-cml-orange pb-1">
              ABOUT US
            </Link>
            <Link to="/MediaCoverage" className="text-cta text-cml-black hover:text-cml-orange transition-colors border-b-2 border-transparent hover:border-cml-orange pb-1">
              MEDIA COVERAGE
            </Link>
            <Link to="/Tenders" className="text-cta text-cml-black hover:text-cml-orange transition-colors border-b-2 border-transparent hover:border-cml-orange pb-1">
              TENDERS
            </Link>
            <Link to="/Career" className="text-cta text-cml-black hover:text-cml-orange transition-colors border-b-2 border-transparent hover:border-cml-orange pb-1">
              CAREER
            </Link>
          </nav>

          {/* CTA Button */}
          <div className="hidden md:block text-white">
            <Button className="text-white bg-cml-orange hover:bg-cml-orange/90 text-cta px-6 py-2 rounded-full font-semibold">
              COLLABORATE
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <nav className="flex flex-col space-y-4 items-start">
              <Link to="/" className="text-cta text-cml-black hover:text-cml-orange border-b border-transparent hover:border-cml-orange pb-1 transition-colors">
                HOME
              </Link>

              {/* Mobile OUR WORK with submenu */}
              <div className="w-full">
                <button
                  onClick={() => setIsMobileWorkOpen(!isMobileWorkOpen)}
                  className="text-cta text-cml-black hover:text-cml-orange flex items-center gap-2 border-b border-transparent hover:border-cml-orange pb-1 transition-colors"
                >
                  OUR WORK
                  {isMobileWorkOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                </button>

                {isMobileWorkOpen && (
                  <div className="mt-2 ml-4 space-y-2">
                    {categories.map((category) => (
                      <div key={category}>
                        <button
                          onClick={() => toggleMobileCategory(category)}
                          className="text-sm text-cml-black hover:text-cml-orange flex items-center gap-2 py-1"
                        >
                          {category}
                          {selectedMobileCategory === category
                            ? <ChevronUp className="h-3 w-3" />
                            : <ChevronDown className="h-3 w-3" />
                          }
                        </button>
                        {selectedMobileCategory === category && (
                          <div className="ml-4 mt-1 space-y-1">
                            {getSubcategories(category).length > 0 ? (
                              getSubcategories(category).map((subCategory) => (
                                <Link
                                  key={subCategory.id}
                                  to={`/WorkDetail/${subCategory.id}`}
                                  className="block text-xs text-gray-600 hover:text-cml-orange py-1"
                                >
                                  {subCategory.title}
                                </Link>
                              ))
                            ) : null}
                          </div>
                        )}
                      </div>
                    ))}

                  </div>
                )}
              </div>

              <Link to="/about" className="text-cta text-cml-black hover:text-cml-orange border-b border-transparent hover:border-cml-orange pb-1 transition-colors">
                ABOUT US
              </Link>
              <Link to="/MediaCoverage" className="text-cta text-cml-black hover:text-cml-orange border-b border-transparent hover:border-cml-orange pb-1 transition-colors">
                MEDIA COVERAGE
              </Link>
              <Link to="/Tenders" className="text-cta text-cml-black hover:text-cml-orange border-b border-transparent hover:border-cml-orange pb-1 transition-colors">
                TENDERS
              </Link>
              <Link to="/Career" className="text-cta text-cml-black hover:text-cml-orange border-b border-transparent hover:border-cml-orange pb-1 transition-colors">
                CAREER
              </Link>
              <Button className="text-white bg-cml-orange hover:bg-cml-orange/90 text-cta px-6 py-2 rounded-full font-semibold">
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