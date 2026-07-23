import Container from '../common/Container';
import fm1 from "../assets/images/fm-img1.png";
import fm2 from "../assets/images/fm-img2.png";
import fm3 from "../assets/images/fm-img3.png";
import fm4 from "../assets/images/fm-img4.png";
import fm5 from "../assets/images/fm-img5.png";
import fm6 from "../assets/images/fm-img6.png";

const featuredModules = [
  {
    id: 1,
    title: 'Ship Recycling',
    image: fm1,
  },
  {
    id: 2,
    title: 'Shipbuilding',
    image: fm2,
  },
  {
    id: 3,
    title: 'Knowledge Hub',
    image: fm3,
  },
  {
    id: 4,
    title: 'Maritime Training',
    image: fm4,
  },
  {
    id: 5,
    title: 'Media Centre',
    image: fm5,
  },
  {
    id: 6,
    title: 'Fleet Operations',
    image: fm6,
  },
];

const FeaturedModules = () => {
  return (
    <section className="bg-[#F4F0EA] py-16 md:py-24 font-sans text-gray-900">
      <Container>
        {/* Header Section */}
        <div className="text-center max-w-2xl mx-auto mb-12 md:mb-16 space-y-3">
          <span className="text-gray-500 font-semibold text-xs md:text-sm tracking-[0.25em] uppercase block">
            EXPLORE
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-normal text-gray-900 tracking-tight">
            Featured Modules
          </h2>
          <p className="text-gray-600 text-xs sm:text-sm leading-relaxed pt-1">
            Everything India's maritime ecosystem has to offer, organized for seamless discovery.
          </p>
        </div>

        {/* 3x2 Image Cards Grid with Responsive Scaling */}
      <div className="px-4 sm:px-8 md:px-10 lg:px-10 max-w-350 mx-auto">
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-6 lg:gap-4 justify-items-center">
    {featuredModules.map((item) => (
      <div
        key={item.id}
        className="relative overflow-hidden rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300 group w-full max-w-[410.65px] h-[308px]"
      >
        <img
          src={item.image}
          alt={item.title}
          className="w-full h-full object-cover rounded-2xl transition-transform duration-500 group-hover:scale-105"
        />
      </div>
    ))}
  </div>
</div>
      </Container>
    </section>
  );
};

export default FeaturedModules;