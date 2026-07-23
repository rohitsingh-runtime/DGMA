import { Link } from "react-router-dom";
import Container from "../common/Container";
import heroBg from "../assets/images/hero-bg.jpg";

const heroButtons = [
  { label: "Ship Recycling", isPrimary: true, path: "/ship-recycling" },
  { label: "Shipbuilding", isPrimary: false, path: "/shipbuilding" },
  { label: "Maritime Training Institutes", isPrimary: false, path: "/" },
  { label: "Maritime Leadership Series", isPrimary: false, path: "/" },
];

const Hero = () => {
  return (
    <section
      className="relative min-h-[calc(100vh-140px)] flex items-center bg-cover bg-center text-white py-20 md:py-28 font-sans"
      style={{
        backgroundImage: `url(${heroBg})`,
      }}
    >
      {/* Dark Overlay matching design tint */}
      <div className="absolute inset-0 bg-[#061C38]/80 mix-blend-multiply" />

      <Container className="relative z-10">
        {/* Left-shifted padding & offset matching reference design */}
        <div className="pl-0 sm:pl-6 md:pl-12 lg:pl-16 max-w-4xl space-y-6">
          {/* Label with dash line */}
          <div className="flex items-center space-x-2.5">
            <span className="w-5 h-[2px] bg-[#D6AF36]" />
            <span className="text-[#D6AF36] font-bold text-xs sm:text-sm tracking-wider uppercase">
              WELCOME TO DG SHIPPING
            </span>
          </div>

          {/* Main Heading */}
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-serif font-normal leading-[1.1] tracking-tight">
            Powering India&apos;s <br />
            <span className="text-[#D6AF36] font-normal">
              Maritime Future
            </span>
          </h1>

          {/* Description */}
          <p className="text-gray-300 text-sm sm:text-base md:text-lg leading-relaxed max-w-2xl font-normal pt-1">
            Driving growth. Enabling trade. Sustaining oceans for generations.
            Formulating robust maritime policies and safety parameters for our
            merchant fleet.
          </p>

          {/* Action Buttons */}
          <div className="pt-4 flex flex-wrap items-center gap-3">
            {heroButtons.map((btn, index) => (
              <Link
                key={index}
                to={btn.path}
                className={`px-4 py-2.5 rounded-md text-xs sm:text-sm font-semibold transition-all duration-200 ${
                  btn.isPrimary
                    ? "bg-[#D6AF36] text-[#0A284D] hover:bg-[#c29e2e]"
                    : "bg-[#0A284D]/40 text-white border border-white/30 hover:border-white/80 hover:bg-white/10"
                }`}
              >
                {btn.label}
              </Link>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
};

export default Hero;