import { useState } from "react";
import { NavLink, Link, useLocation } from "react-router-dom";
import Container from "../common/Container";
import { FiSearch, FiChevronDown, FiMenu, FiX } from "react-icons/fi";
import headerImg1 from "../assets/images/header-img1.png";
import headerImg2 from "../assets/images/header-img2.png";
import headerImg3 from "../assets/images/header-img3.png";

const menuItems = [
  {
    label: "Ship Recycling",
    path: "/ship-recycling",
    hasDropdown: true,
    dropdown: [
      { label: "Ship Recycling Overview", path: "/ship-recycling" },
      { label: "Handbook for Ship Recycling", path: "/knowledge-hub" },
      { label: "Recycling Yards Directory", path: "/ship-recycling" },
    ],
  },
  {
    label: "Shipbuilding",
    path: "/shipbuilding",
    hasDropdown: true,
    dropdown: [
      { label: "Shipbuilding Partners of India", path: "/shipbuilding" },
      { label: "Commercial Shipyards", path: "/shipbuilding" },
      { label: "Defense Shipbuilders", path: "/shipbuilding" },
    ],
  },
  {
    label: "Maritime Training Institute",
    path: "/",
    hasDropdown: true,
    dropdown: [
      { label: "Training Institutes Directory", path: "/" },
      { label: "Approved Courses", path: "/" },
    ],
  },
  {
    label: "Maritime Leadership",
    path: "/maritime-leadership",
    hasDropdown: true,
    dropdown: [
      { label: "Leaders Directory", path: "/maritime-leadership" },
      { label: "Former Chairmen", path: "/maritime-leadership" },
    ],
  },
  { label: "Knowledge Hub", path: "/knowledge-hub", hasDropdown: false },
  { label: "Media Centre", path: "/media-centre", hasDropdown: false },
  { label: "Stories", path: "/stories", hasDropdown: false },
  { label: "India Map", path: "/india-map", hasDropdown: false },
];

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const location = useLocation();

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
    setOpenDropdown(null);
  };

  const isActive = (path) => {
    if (path === "/") return location.pathname === "/";
    return location.pathname.startsWith(path);
  };

  return (
    <header className="sticky top-0 z-50 bg-[#0A284D] w-full text-white shadow-md font-sans">
      <Container>
        {/* Top Header Row */}
        <Link to="/" className="block text-inherit no-underline">
          <div className="relative flex items-center justify-center gap-20 py-3">
            {/* Left Logos */}
            <div className="flex items-center space-x-3 mr-8 sm:mr-16 md:mr-18">
              <img
                src={headerImg1}
                alt="Government of India"
                className="h-10 md:h-12 w-auto object-contain brightness-0 invert"
              />
              <img
                src={headerImg2}
                alt="DG Shipping"
                className="h-11 md:h-14 w-auto object-contain"
              />
            </div>

            {/* Center Titles */}
            <div className="text-center hidden sm:block">
              <h1 className="text-base md:text-xl font-normal tracking-wide text-white leading-tight">
                Directorate General of Shipping
              </h1>
              <p className="text-xs md:text-sm text-gray-200 mt-0.5">
                Ministry of Ports, Shipping and Waterways
              </p>
              <p className="text-xs md:text-sm text-gray-200">
                Government of India
              </p>
            </div>

            {/* Right Logos */}
            <div className="flex items-center space-x-3 ml-8 sm:ml-16 md:ml-30">
              <img
                src={headerImg3}
                alt="Azadi Ka Amrit Mahotsav & Swachh Bharat"
                className="h-10 md:h-14 w-auto object-contain brightness-0 invert"
              />
            </div>
          </div>
        </Link>

        {/* Navigation Row */}
        <div className="flex items-center justify-center py-3 relative">
          {/* Desktop Menu */}
          <nav className="hidden lg:flex items-center space-x-6 lg:space-x-8 text-xs lg:text-sm font-normal">
            {menuItems.map((item, index) => (
              <div
                key={index}
                className="relative group"
                onMouseEnter={() =>
                  item.hasDropdown && setOpenDropdown(index)
                }
                onMouseLeave={() => setOpenDropdown(null)}
              >
                <NavLink
                  to={item.path}
                  className={() =>
                    `flex items-center gap-1.5 transition-colors duration-200 whitespace-nowrap ${
                      isActive(item.path)
                        ? "text-[#D6AF36] font-semibold"
                        : "text-gray-200 hover:text-[#D6AF36]"
                    }`
                  }
                >
                  <span>{item.label}</span>
                  {item.hasDropdown && (
                    <FiChevronDown className="w-3 h-3 text-gray-300" />
                  )}
                </NavLink>

                {/* Dropdown Menu */}
                {item.hasDropdown && openDropdown === index && (
                  <div className="absolute left-0 top-full z-50 mt-0 w-56 rounded-lg bg-[#0D2E52] py-2 shadow-xl border border-white/10">
                    {item.dropdown.map((sub, subIndex) => (
                      <Link
                        key={subIndex}
                        to={sub.path}
                        className="block px-4 py-2.5 text-xs text-gray-300 transition-colors hover:bg-white/10 hover:text-[#D6AF36]"
                        onClick={() => setOpenDropdown(null)}
                      >
                        {sub.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Right Actions */}
          <div className="hidden lg:flex items-center space-x-4 absolute right-10">
            <Link
              to="/search"
              aria-label="Search"
              className="text-gray-200 hover:text-[#D6AF36] transition-colors duration-200"
            >
              <FiSearch className="w-4 h-4" />
            </Link>
            <Link
              to="/ai-assistant"
              className="bg-[#C9A827] hover:bg-[#c29e2e] text-[#0A284D] font-bold px-2 py-2 rounded-md text-xs tracking-wide transition-colors duration-200"
            >
              AI Assistant
            </Link>
          </div>

          {/* Mobile Hamburger Controls */}
          <div className="flex lg:hidden items-center justify-between w-full px-2">
            <span className="sm:hidden text-xs font-semibold tracking-wider text-gray-200 uppercase">
              DG Shipping
            </span>
            <div className="flex items-center space-x-4 ml-auto">
              <Link
                to="/search"
                aria-label="Search"
                className="text-gray-200 hover:text-[#D6AF36]"
                onClick={closeMobileMenu}
              >
                <FiSearch className="w-5 h-5" />
              </Link>
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                aria-label="Toggle Menu"
                className="text-gray-200 hover:text-white p-1"
              >
                {isMobileMenuOpen ? (
                  <FiX className="w-6 h-6" />
                ) : (
                  <FiMenu className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {isMobileMenuOpen && (
          <nav className="lg:hidden border-t border-white/10 py-2 flex flex-col space-y-1 px-2">
            {menuItems.map((item, index) => (
              <div key={index}>
                <NavLink
                  to={item.path}
                  onClick={() => {
                    if (!item.hasDropdown) closeMobileMenu();
                    else
                      setOpenDropdown(
                        openDropdown === index ? null : index
                      );
                  }}
                  className={() =>
                    `flex items-center justify-between text-sm py-2.5 px-2 rounded-md transition-colors ${
                      isActive(item.path)
                        ? "text-[#D6AF36] bg-white/5 font-semibold"
                        : "text-[#FFFFFFCC] hover:text-[#D6AF36] hover:bg-white/5"
                    }`
                  }
                >
                  <span>{item.label}</span>
                  {item.hasDropdown && (
                    <FiChevronDown
                      className={`w-4 h-4 text-gray-400 transition-transform ${
                        openDropdown === index ? "rotate-180" : ""
                      }`}
                    />
                  )}
                </NavLink>

                {/* Mobile sub-dropdown */}
                {item.hasDropdown && openDropdown === index && (
                  <div className="ml-4 border-l border-white/10 pl-3 py-1 space-y-1">
                    {item.dropdown.map((sub, subIndex) => (
                      <Link
                        key={subIndex}
                        to={sub.path}
                        onClick={closeMobileMenu}
                        className="block text-xs text-gray-400 py-1.5 hover:text-[#D6AF36] transition-colors"
                      >
                        {sub.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <div className="pt-3 border-t border-white/10 flex justify-start px-2">
              <button className="w-full bg-[#D6AF36] hover:bg-[#c29e2e] text-[#0A284D] font-bold py-2.5 rounded-md text-xs tracking-wide transition-colors duration-200">
                AI Assistant
              </button>
            </div>
          </nav>
        )}
      </Container>
    </header>
  );
};

export default Header;