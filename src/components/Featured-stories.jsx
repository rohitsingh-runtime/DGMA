import { Link } from 'react-router-dom';
import Container from '../common/Container';
import { FiChevronRight, FiFileText, FiImage, FiArrowRight } from 'react-icons/fi';
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaYoutube } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import fs1 from "../assets/images/fs1.png";
import fs2 from "../assets/images/fs2.png";
import fs3 from "../assets/images/fs3.png";

const stories = [
  {
    id: 1,
    category: 'GREEN SHIP RECYCLING',
    title: "Alang's Green Revolution: How India is Leading Sustainable Ship Dismantling",
    date: 'January 2024',
    image: fs1,
  },
  {
    id: 2,
    category: 'FUTURE MARINERS',
    title: "10,000 Cadets, One Dream: Inside India's Maritime Training Transformation",
    date: 'December 2023',
    image: fs2,
  },
  {
    id: 3,
    category: 'MARITIME INNOVATION',
    title: "Smart Ports 2030: The Digital Overhaul Reshaping India's Coastal Economy",
    date: 'November 2023',
    image: fs3,
  },
];

const mediaCentreCards = [
  {
    id: 1,
    title: 'Press Releases',
    subtitle: 'Official declarations and policy circulars',
    icon: FiFileText,
    href: '#',
  },
  {
    id: 2,
    title: 'Photo Gallery',
    subtitle: 'Visual highlights of national ports and events',
    icon: FiImage,
    href: '#',
  },
];

const FeaturedStories = () => {
  return (
    <section className="bg-[#F4F0EA] py-16 md:py-24 font-sans text-gray-900">
      <Container>
        <div className="px-4 sm:px-8 md:px-12 lg:px-16 max-w-[1400px] mx-auto">
          {/* Main Layout Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14">
            
            {/* Left Section - Featured Stories (8 cols) */}
            <div className="lg:col-span-8 space-y-8">
              {/* Section Header */}
              <div className="flex items-end justify-between border-b border-gray-300/40 pb-4">
                <div>
                  <span className="text-gray-500 font-semibold text-xs tracking-[0.25em] uppercase block mb-1">
                    EDITORIAL
                  </span>
                  <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-normal text-[#1A202C] tracking-tight">
                    Featured Stories
                  </h2>
                </div>
                <Link
                  to="/stories"
                  className="flex items-center gap-1 text-xs sm:text-sm font-semibold text-[#0A284D] hover:text-[#D6AF36] transition-colors duration-200 pb-1"
                >
                  <span>View All</span>
                  <FiChevronRight className="w-4 h-4" />
                </Link>
              </div>

              {/* Stories 3-Column Cards Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {stories.map((story) => (
                  <div key={story.id} className="group cursor-pointer space-y-3">
                    {/* Card Image */}
                    <div className="overflow-hidden rounded-xl h-[200px] w-full bg-gray-200">
                      <img
                        src={story.image}
                        alt={story.title}
                        className="w-full h-full object-cover rounded-xl transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>

                    {/* Card Meta & Title */}
                    <div className="space-y-2 pt-1">
                      <span className="text-[10px] sm:text-[11px] font-bold text-gray-500 tracking-wider uppercase block">
                        {story.category}
                      </span>
                      <h3 className="text-sm font-bold text-gray-800 leading-snug group-hover:text-[#0A284D] transition-colors line-clamp-3">
                        {story.title}
                      </h3>
                      <p className="text-xs text-gray-500 pt-1 font-normal">
                        {story.date}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Section - Press & Gallery + Socials (4 cols) */}
            <div className="lg:col-span-4 space-y-8 pl-0 lg:pl-4">
              
              {/* Media Centre Header */}
              <div className="border-b border-gray-300/40 pb-4">
                <span className="text-gray-500 font-semibold text-xs tracking-[0.25em] uppercase block mb-1">
                  MEDIA CENTRE
                </span>
                <h2 className="text-3xl sm:text-4xl font-serif font-normal text-[#1A202C] tracking-tight">
                  Press & Gallery
                </h2>
              </div>

              {/* Press & Gallery Action Cards */}
              <div className="space-y-4">
                {mediaCentreCards.map((card) => {
                  const Icon = card.icon;
                  return (
                    <a
                      key={card.id}
                      href={card.href}
                      className="flex items-center justify-between p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 group border border-gray-100"
                    >
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center text-[#0A284D] shrink-0">
                          <Icon className="w-5 h-5" />
                        </div>
                        <div>
                          <h4 className="text-sm font-bold text-gray-800 group-hover:text-[#0A284D] transition-colors">
                            {card.title}
                          </h4>
                          <p className="text-xs text-gray-500 leading-tight mt-0.5">
                            {card.subtitle}
                          </p>
                        </div>
                      </div>
                      <FiArrowRight className="w-4 h-4 text-gray-400 group-hover:text-[#0A284D] group-hover:translate-x-1 transition-all shrink-0 ml-2" />
                    </a>
                  );
                })}
              </div>

              {/* Follow Us Section */}
              <div className="pt-2 space-y-3">
                <span className="text-[11px] font-bold tracking-wider text-gray-700 uppercase block">
                  FOLLOW US
                </span>
                <div className="flex items-center space-x-3">
                  <a
                    href="#"
                    aria-label="Facebook"
                    className="w-8 h-8 rounded-full bg-white text-gray-700 hover:text-[#0A284D] shadow-sm hover:shadow flex items-center justify-center transition-all"
                  >
                    <FaFacebookF className="w-3.5 h-3.5" />
                  </a>
                  <a
                    href="#"
                    aria-label="Instagram"
                    className="w-8 h-8 rounded-full bg-white text-gray-700 hover:text-[#0A284D] shadow-sm hover:shadow flex items-center justify-center transition-all"
                  >
                    <FaInstagram className="w-3.5 h-3.5" />
                  </a>
                  <a
                    href="#"
                    aria-label="LinkedIn"
                    className="w-8 h-8 rounded-full bg-white text-gray-700 hover:text-[#0A284D] shadow-sm hover:shadow flex items-center justify-center transition-all"
                  >
                    <FaLinkedinIn className="w-3.5 h-3.5" />
                  </a>
                  <a
                    href="#"
                    aria-label="X / Twitter"
                    className="w-8 h-8 rounded-full bg-white text-gray-700 hover:text-[#0A284D] shadow-sm hover:shadow flex items-center justify-center transition-all"
                  >
                    <FaXTwitter className="w-3.5 h-3.5" />
                  </a>
                  <a
                    href="#"
                    aria-label="YouTube"
                    className="w-8 h-8 rounded-full bg-white text-gray-700 hover:text-[#0A284D] shadow-sm hover:shadow flex items-center justify-center transition-all"
                  >
                    <FaYoutube className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>

            </div>

          </div>
        </div>
      </Container>
    </section>
  );
};

export default FeaturedStories;