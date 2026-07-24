import { Link } from "react-router-dom";
import Container from "../common/Container";
import footerImg1 from "../assets/images/footer-img.png";
import headerImg1 from "../assets/images/header-img1.png";
import headerImg2 from "../assets/images/header-img2.png";
import headerImg3 from "../assets/images/header-img3.png";

const footerSections = [
  {
    title: "SHIP RECYCLING",
    links: [
      { label: "Facility Directory", to: "/ship-recycling" },
      { label: "Interactive Map", to: "/" },
      { label: "Certifications", to: "/" },
    ],
  },
  {
    title: "TRAINING",
    links: [
      { label: "Institute Directory", to: "/" },
      { label: "Publications", to: "/" },
      { label: "Stories", to: "/stories" },
    ],
  },
  {
    title: "RESOURCES",
    links: [
      { label: "Media Centre", to: "/" },
      { label: "Shipbuilding", to: "/shipbuilding" },
      { label: "AI Assistant", to: "/" },
    ],
  },
];

const Footer = () => {
  return (
    <footer className="w-full bg-black text-white py-12 md:py-16 font-sans">
      <Container>
        {/* Main Content Layout with intentional left padding/offset matching design */}
        <div className="pl-0 sm:pl-6 md:pl-16 lg:pl-24 pr-0">
          {/* Main Grid Section */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-y-10 md:gap-x-8 pb-10">
            {/* Left Branding Column */}
            <div className="md:col-span-5 space-y-4">
              {/* Government Logos */}
              <div className="flex items-center space-x-3 flex-wrap gap-y-2">
                <img
                  src={headerImg1}
                  alt="Government of India"
                  className="h-8 md:h-10 w-auto object-contain brightness-0 invert"
                />
                <img
                  src={headerImg2}
                  alt="DG Shipping"
                  className="h-9 md:h-11 w-auto object-contain"
                />
                <img
                  src={headerImg3}
                  alt="Azadi Ka Amrit Mahotsav & Swachh Bharat"
                  className="h-8 md:h-10 w-auto object-contain brightness-0 invert"
                />
              </div>

              {/* Logo & Title */}
              <div className="flex items-center space-x-3">
                <img
                  src={footerImg1}
                  alt="DG Shipping Logo"
                  className="h-10 w-auto object-contain"
                />
                <span className="text-lg md:text-xl font-serif text-white tracking-wide font-normal">
                  Maritime India
                </span>
              </div>

              {/* Description */}
              <p className="text-gray-400 text-xs sm:text-sm leading-relaxed max-w-xs pt-1">
                India&apos;s unified digital platform for maritime knowledge,
                ship recycling, training, and industry resources.
              </p>

              {/* Social Icons */}
              <div className="flex items-center space-x-2.5 pt-2">
                {/* Facebook */}
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                  className="w-8 h-8 rounded-full border border-gray-600 flex items-center justify-center text-gray-300 hover:text-[#D6AF36] hover:border-[#D6AF36] transition-colors duration-200"
                >
                  <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>
                {/* Instagram */}
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="w-8 h-8 rounded-full border border-gray-600 flex items-center justify-center text-gray-300 hover:text-[#D6AF36] hover:border-[#D6AF36] transition-colors duration-200"
                >
                  <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
                  </svg>
                </a>
                {/* LinkedIn */}
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  className="w-8 h-8 rounded-full border border-gray-600 flex items-center justify-center text-gray-300 hover:text-[#D6AF36] hover:border-[#D6AF36] transition-colors duration-200"
                >
                  <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </a>
                {/* X (Twitter) */}
                <a
                  href="https://x.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="X (Twitter)"
                  className="w-8 h-8 rounded-full border border-gray-600 flex items-center justify-center text-gray-300 hover:text-[#D6AF36] hover:border-[#D6AF36] transition-colors duration-200"
                >
                  <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                </a>
                {/* YouTube */}
                <a
                  href="https://youtube.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="YouTube"
                  className="w-8 h-8 rounded-full border border-gray-600 flex items-center justify-center text-gray-300 hover:text-[#D6AF36] hover:border-[#D6AF36] transition-colors duration-200"
                >
                  <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                    <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                  </svg>
                </a>
              </div>
            </div>

            {/* Right Links Columns */}
            <div className="md:col-span-8 lg:col-span-7 md:-ml-8 grid grid-cols-1 sm:grid-cols-3 gap-8 pt-1 md:pt-0">
              {footerSections.map((section, idx) => (
                <div key={idx} className="space-y-3.5">
                  <h3 className="text-[#D6AF36] text-[11px] font-semibold tracking-wider uppercase">
                    {section.title}
                  </h3>
                  <ul className="space-y-2.5">
                    {section.links.map((link, linkIdx) => (
                      <li key={linkIdx}>
                        <Link
                          to={link.to}
                          className="text-gray-400 hover:text-white text-xs sm:text-sm transition-colors duration-200"
                        >
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom Copyright Row */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-between text-[11px] sm:text-xs text-gray-500 gap-3">
            <p>
              © 2026 Directorate General of Maritime Administration. Government
              of India.
            </p>

            <p className="text-gray-500 font-normal sm:-translate-x-12 transition-transform">
              Powering India&apos;s Maritime Future
            </p>
          </div>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;