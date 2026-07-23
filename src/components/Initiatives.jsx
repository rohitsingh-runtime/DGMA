import React from 'react';
import {
  Recycle,
  Anchor,
  GraduationCap,
  Trophy,
  ArrowRight,
  ChevronDown,
  CheckCircle2,
  FileText,
  Handshake,
} from 'lucide-react';
import img1 from '../assets/images/eoi/card-img1.png';
import img2 from '../assets/images/eoi/card-img2.png';
import img3 from '../assets/images/eoi/card-img3.png';
import img4 from '../assets/images/eoi/card-img4.png';

const initiativesData = [
  {
    id: 1,
    title: 'Handbook for Ship Recycling',
    description:
      'Sustainable green practices for cleaning our oceans and ensuring environmentally sound vessel decommissioning.',
    buttonText: 'Explore Directory',
    image: img1,
    icon: Recycle,
    iconBgColor: '#05B46A',
  },
  {
    id: 2,
    title: 'Handbook for Shipbuilding',
    description:
      'Strengthening and supporting domestic vessel manufacturing capabilities under advanced maritime frameworks.',
    buttonText: 'View Portals',
    image: img2,
    icon: Anchor,
    iconBgColor: '#3B82F6',
  },
  {
    id: 3,
    title: 'Handbook for Maritime Training Institute',
    description:
      'World-class certified navigation training and engineering programs shaping qualified merchant mariners.',
    buttonText: 'Find Institutes',
    image: img3,
    icon: GraduationCap,
    iconBgColor: '#00B4D8',
  },
  {
    id: 4,
    title: 'Leadership Series',
    description:
      'Distinguished thought leadership lectures and strategic dialogues guiding maritime policies.',
    buttonText: 'Read Lectures',
    image: img4,
    icon: Trophy,
    iconBgColor: '#F59E0B',
  },
];

export default function Initiatives() {
  return (
    <section className="bg-[#EFE9DE] py-[48px] md:py-[80px] px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="max-w-[1562px] mx-auto">
        {/* Heading Section */}
        <div className="text-center">
          <span className="block font-inter text-[16px] font-semibold text-[#6B6258] tracking-[1px] uppercase">
            EXPLORE OUR INITIATIVES
          </span>
          <h2 className="font-playfair text-[28px] sm:text-[36px] lg:text-[52px] font-bold text-[#111111] mt-[12px] mb-[56px] leading-tight">
            Knowledge. Leadership. Progress.
          </h2>
        </div>

        {/* Top 4 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-[32px] justify-items-center">
          {initiativesData.map((card) => {
            const IconComponent = card.icon;
            return (
              <div
                key={card.id}
                className="w-full max-w-[312px] h-[404px] bg-white rounded-[8px] border border-[#E2DACD] shadow-[0_4px_20px_rgba(0,0,0,0.05)] hover:shadow-[0_12px_28px_rgba(0,0,0,0.1)] transition-all duration-300 ease-in-out hover:-translate-y-[6px] flex flex-col justify-between opacity-100 group cursor-pointer"
              >
                {/* Top Image Container: 312x180 */}
                <div className="relative w-full h-[180px] bg-[#E5DEC9]/40 rounded-t-[8px] overflow-hidden opacity-100 shrink-0">
                  {card.image ? (
                    <img
                      src={card.image}
                      alt={card.title}
                      className="w-full h-[180px] object-cover opacity-100"
                    />
                  ) : (
                    <div className="w-full h-full bg-[#DFD9CD]/40 flex items-center justify-center text-[#9A9084] text-sm" />
                  )}
                </div>

                {/* Card Body with overlapping Icon Badge */}
                <div className="relative p-[20px] pt-[26px] flex flex-col justify-between flex-1 bg-white rounded-b-[8px]">
                  {/* Icon Badge overlapping Image & Body */}
                  <div
                    className="absolute -top-[22px] left-[20px] w-[44px] h-[44px] rounded-[8px] flex items-center justify-center text-white shadow-md z-10 opacity-100"
                    style={{ backgroundColor: card.iconBgColor }}
                  >
                    <IconComponent className="w-5 h-5 stroke-[2.2]" />
                  </div>

                  <div>
                    <h3 className="font-playfair text-[22px] font-bold text-[#111111] leading-[1.25] mb-[8px] line-clamp-2">
                      {card.title}
                    </h3>
                    <p className="font-inter text-[14px] text-[#6B6258] leading-[1.6] line-clamp-3">
                      {card.description}
                    </p>
                  </div>

                  {/* Bottom Link */}
                  <div className="pt-2">
                    <span className="inline-flex items-center gap-1.5 font-inter text-[15px] font-semibold text-[#111111] group-hover:underline transition-all">
                      <span>{card.buttonText}</span>
                      <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Four Industries Ribbon Banner */}
        <div className="relative my-[64px] w-full max-w-[1253.85px] min-h-[145.46px] mx-auto opacity-100 flex items-center justify-center">
          <div className="relative w-full min-h-[145.46px] bg-[#0A1F3C] text-[#EFEBE4] py-[28px] px-[24px] sm:px-[56px] flex items-center justify-center text-center shadow-lg rounded-[2px] opacity-100">
            {/* Left Ribbon Fold & Swallowtail */}
            <div className="hidden lg:block absolute -left-[20px] -bottom-[14px] w-[20px] h-[14px] bg-[#051121] [clip-path:polygon(100%_0,0_0,100%_100%)] z-0" />
            <div className="hidden lg:block absolute -left-[44px] top-[24px] w-[44px] h-[97px] bg-[#091B35] [clip-path:polygon(100%_0,0_0,40%_50%,0_100%,100%_100%)] z-10" />

            {/* Right Ribbon Fold & Swallowtail */}
            <div className="hidden lg:block absolute -right-[20px] -bottom-[14px] w-[20px] h-[14px] bg-[#051121] [clip-path:polygon(0_0,100%_0,0_100%)] z-0" />
            <div className="hidden lg:block absolute -right-[44px] top-[24px] w-[44px] h-[97px] bg-[#091B35] [clip-path:polygon(0_0,100%_0,60%_50%,100%_100%,0_100%)] z-10" />

            {/* Banner Text */}
            <p className="font-playfair italic text-[17px] sm:text-[20px] lg:text-[23px] text-[#F3EFE6] leading-[1.6] max-w-[1050px] font-normal">
              Four industries. One coastline. One story of what India is building at sea. The DG Shipping Maritime knowledge series, Ship Recycling, Shipbuilding, Maritime Training Institute, Maritime Leadership.
            </p>
          </div>
        </div>

        {/* Below Two Cards Section (624x449, gap: 24px, padding: 60px 32px) */}
        <div className="flex flex-col lg:flex-row justify-center items-center gap-[24px] max-w-[1272px] mx-auto opacity-100">
          {/* Card 1: Become a Subject Matter Expert */}
          <div className="w-full max-w-[624px] h-[449px] bg-[#E4EFE8] border border-[#CADBD0] rounded-[8px] pt-[60px] pr-[32px] pb-[60px] pl-[32px] flex flex-col justify-between relative shadow-sm opacity-100">
            {/* Top Right Line Art Image / Icon */}
            <FileText className="w-14 h-14 absolute top-[44px] right-[32px] text-[#A0C0B0] stroke-[1.2] opacity-70 pointer-events-none" />

            <div>
              <span className="block font-inter text-[13px] font-bold text-[#4B685B] tracking-[1px] uppercase mb-2">
                SHARE YOUR EXPERTISE
              </span>
              <h3 className="font-playfair text-[28px] font-bold text-[#111111] leading-tight mb-3">
                Become a Subject Matter Expert
              </h3>
              <p className="font-inter text-[14px] text-[#4B685B] leading-relaxed mb-6 max-w-[440px]">
                Contribute your deep domain knowledge and technical thoughts to shape India's dynamic maritime future.
              </p>

              {/* Form Inputs */}
              <form onSubmit={(e) => e.preventDefault()} className="space-y-3 mb-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <input
                    type="text"
                    placeholder="Full Name"
                    className="w-full bg-[#D7E6DD]/80 border border-[#B9D4C5] rounded-[6px] px-3.5 py-2 text-sm text-[#111111] placeholder-[#6E8A7B] focus:outline-none focus:ring-1 focus:ring-[#4B685B] transition-all"
                  />
                  <input
                    type="email"
                    placeholder="Email Address"
                    className="w-full bg-[#D7E6DD]/80 border border-[#B9D4C5] rounded-[6px] px-3.5 py-2 text-sm text-[#111111] placeholder-[#6E8A7B] focus:outline-none focus:ring-1 focus:ring-[#4B685B] transition-all"
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <input
                    type="tel"
                    placeholder="Phone Number"
                    className="w-full bg-[#D7E6DD]/80 border border-[#B9D4C5] rounded-[6px] px-3.5 py-2 text-sm text-[#111111] placeholder-[#6E8A7B] focus:outline-none focus:ring-1 focus:ring-[#4B685B] transition-all"
                  />
                  <div className="relative">
                    <select className="w-full bg-[#D7E6DD]/80 border border-[#B9D4C5] rounded-[6px] px-3.5 py-2 text-sm text-[#6E8A7B] focus:outline-none focus:ring-1 focus:ring-[#4B685B] transition-all appearance-none cursor-pointer pr-8">
                      <option value="">Select Handbook</option>
                      <option value="ship-recycling">Handbook for Ship Recycling</option>
                      <option value="shipbuilding">Handbook for Shipbuilding</option>
                      <option value="mti">Maritime Training Institute</option>
                      <option value="leadership">Leadership Series</option>
                    </select>
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-[#6E8A7B]">
                      <ChevronDown className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              </form>
            </div>

            <button
              type="submit"
              className="bg-[#242424] hover:bg-[#000000] text-white font-inter text-sm font-semibold px-6 py-2.5 rounded-[6px] transition-colors self-start shadow-sm cursor-pointer"
            >
              Contribute Your Expertise
            </button>
          </div>

          {/* Card 2: Sponsorship Opportunities */}
          <div className="w-full max-w-[624px] h-[449px] bg-[#F8F3E5] border border-[#E8DCC3] rounded-[8px] pt-[60px] pr-[32px] pb-[60px] pl-[32px] flex flex-col justify-between relative shadow-sm opacity-100">
            {/* Top Right Line Art Image / Icon */}
            <Handshake className="w-14 h-14 absolute top-[44px] right-[32px] text-[#DFCBA6] stroke-[1.2] opacity-70 pointer-events-none" />

            <div>
              <span className="block font-inter text-[13px] font-bold text-[#947B49] tracking-[1px] uppercase mb-2">
                PARTNER WITH US
              </span>
              <h3 className="font-playfair text-[28px] font-bold text-[#111111] leading-tight mb-3">
                Sponsorship Opportunities
              </h3>
              <p className="font-inter text-[14px] text-[#786646] leading-relaxed mb-6 max-w-[440px]">
                Align your commercial brand with India's maritime vision and global leadership across premium summits.
              </p>

              {/* Checklist Grid (2x2) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-3.5 gap-x-6 mb-6">
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-5 h-5 text-[#B89547] shrink-0" />
                  <span className="font-inter font-bold text-[14px] text-[#111111]">Brand Visibility</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-5 h-5 text-[#B89547] shrink-0" />
                  <span className="font-inter font-bold text-[14px] text-[#111111]">Industry Recognition</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-5 h-5 text-[#B89547] shrink-0" />
                  <span className="font-inter font-bold text-[14px] text-[#111111]">Thought Leadership</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-5 h-5 text-[#B89547] shrink-0" />
                  <span className="font-inter font-bold text-[14px] text-[#111111]">Impactful Collaboration</span>
                </div>
              </div>
            </div>

            <button
              type="button"
              className="bg-[#111111] hover:bg-[#000000] text-white font-inter text-sm font-semibold px-6 py-2.5 rounded-[6px] transition-colors self-start shadow-sm cursor-pointer mt-auto"
            >
              Explore Sponsorship Tiers
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
