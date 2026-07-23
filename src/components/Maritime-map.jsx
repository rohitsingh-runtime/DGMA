import Container from '../common/Container';
import { FiMap } from 'react-icons/fi';

const MaritimeMapBanner = () => {
  return (
    <section className="relative w-full py-20 md:py-28 bg-cover bg-center text-white font-sans bg-[url('/map-banner-placeholder.jpg')]">
      {/* Dark Teal/Blue Overlay */}
      <div className="absolute inset-0 bg-[#061C38]/85 mix-blend-multiply" />

      <Container className="relative z-10">
        <div className="max-w-3xl mx-auto text-center space-y-6 flex flex-col items-center justify-center">
          
          {/* Anchor Icon */}
          <div className="text-[#D6AF36] mb-1">
            <svg
              className="w-10 h-10 md:w-12 md:h-12 fill-current"
              viewBox="0 0 24 24"
            >
              <path d="M12 2a2.5 2.5 0 0 1 2.5 2.5c0 .93-.5 1.74-1.25 2.18V8.1a7.002 7.002 0 0 1 6.643 5.9h-2.032A5.002 5.002 0 0 0 13 10.1v8.78a2.5 2.5 0 1 1-2 0V10.1A5.002 5.002 0 0 0 6.139 14H4.107a7.002 7.002 0 0 1 6.643-5.9V6.68A2.497 2.497 0 0 1 9.5 4.5 2.5 2.5 0 0 1 12 2z" />
            </svg>
          </div>

          {/* Heading */}
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-normal tracking-tight text-white">
            Explore India's Maritime Map
          </h2>

          {/* Subtitle / Description */}
          <p className="text-gray-200 text-sm sm:text-base md:text-lg leading-relaxed max-w-2xl font-normal">
            Discover ship recycling facilities, training institutes, shipyards, and ports across India's 7,500 km coastline.
          </p>

          {/* CTA Button */}
          <div className="pt-2">
            <button className="bg-[#D6AF36] hover:bg-[#c29e2e] text-[#0A284D] font-bold px-6 py-3 rounded-md text-sm md:text-base transition-colors duration-200 flex items-center gap-2.5 shadow-md">
              <FiMap className="w-5 h-5" />
              <span>View Interactive Map</span>
            </button>
          </div>

        </div>
      </Container>
    </section>
  );
};

export default MaritimeMapBanner;