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
                {["f", "ig", "in", "X", "yt"].map((icon) => (
                  <a
                    key={icon}
                    href="#"
                    className="w-7 h-7 rounded-full border border-gray-600 flex items-center justify-center text-gray-300 hover:text-[#D6AF36] hover:border-[#D6AF36] transition-colors"
                  >
                    <span className="text-[10px] font-semibold">{icon}</span>
                  </a>
                ))}
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