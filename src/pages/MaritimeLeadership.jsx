import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Archive,
  Users,
  BookOpen,
  Award,
  Eye,
  MessageSquare,
  Globe,
  ChevronLeft,
  ChevronRight,
  Anchor,
  Building2,
  Compass,
  Recycle,
} from "lucide-react";
import { leaders, knowledgeSeries } from "../data/leadershipData";
import LeaderCard from "../components/LeaderCard";

const pillars = [
  {
    icon: Archive,
    title: "Preserve",
    desc: "Documenting legacies\nfor future generations",
  },
  {
    icon: Users,
    title: "Inspire",
    desc: "Motivating today's\nand tomorrow's leaders",
  },
  {
    icon: BookOpen,
    title: "Inform",
    desc: "Enriching knowledge\nfor policy and industry",
  },
  {
    icon: Award,
    title: "Celebrate",
    desc: "Honouring contributions\nand achievements",
  },
];

const seriesIcons = {
  recycle: Recycle,
  anchor: Anchor,
  building: Building2,
  compass: Compass,
};

const MaritimeLeadership = () => {
  const scrollRef = useRef(null);
  const [expertise, setExpertise] = useState("");

  const scrollCards = (direction) => {
    if (scrollRef.current) {
      const amount = 300;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -amount : amount,
        behavior: "smooth",
      });
    }
  };

  return (
    <main className="w-full font-sans">
      {/* ═══════════ 1. HERO ═══════════ */}
      <section className="relative min-h-[520px] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/shipyard/ocean-sunset.png"
            alt=""
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0A1525]/95 via-[#0A1525]/80 to-[#0A1525]/50" />
        </div>

        <div className="relative z-10 mx-auto w-full max-w-7xl px-6 py-20 md:px-10">
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#D6AF36]">
            MARITIME LEADERSHIP SERIES
          </p>
          <h1 className="mt-4 max-w-3xl font-serif text-4xl font-bold leading-[1.15] text-white md:text-5xl lg:text-6xl">
            The Leaders Who{" "}
            <span className="text-[#D6AF36]">
              Shaped India&apos;s Maritime Future
            </span>
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-gray-300">
            Honouring the vision, leadership and legacy of India&apos;s most
            distinguished maritime pioneers who charted courses of growth,
            modernization, and sovereign strength.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <a
              href="#leaders"
              className="inline-flex items-center gap-2 rounded-md bg-[#D6AF36] px-6 py-3 text-sm font-bold text-[#0A1F3C] transition-colors hover:bg-[#c29e2e]"
            >
              Explore Leaders
              <ArrowRight size={16} />
            </a>
            <a
              href="#contribute"
              className="inline-flex items-center gap-2 rounded-md border border-white/30 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10"
            >
              Become a Contributor
              <ArrowRight size={16} />
            </a>
          </div>
        </div>
      </section>

      {/* ═══════════ 2. PILLARS ═══════════ */}
      <section className="bg-[#F5F0E7] py-16">
        <div className="mx-auto max-w-7xl px-6 md:px-10">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4 md:gap-0 md:divide-x md:divide-gray-300/60">
            {pillars.map((p) => (
              <div
                key={p.title}
                className="flex flex-col items-center text-center px-6"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-full border-2 border-[#D6AF36]/40 bg-white shadow-sm">
                  <p.icon size={22} className="text-[#D6AF36]" />
                </div>
                <h3 className="mt-4 font-serif text-lg font-bold text-gray-900">
                  {p.title}
                </h3>
                <p className="mt-2 whitespace-pre-line text-sm text-gray-500">
                  {p.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ 3. FEATURED LEADERS ═══════════ */}
      <section id="leaders" className="bg-[#F0E9DE] py-16">
        <div className="mx-auto max-w-7xl px-6 md:px-10">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#C5A028]">
                FEATURED LEADERS
              </p>
              <h2 className="mt-2 font-serif text-3xl font-bold text-gray-900 md:text-4xl">
                Meet the Visionaries
              </h2>
            </div>
            <button
              type="button"
              className="flex items-center gap-1 text-sm font-bold text-[#0A284D] transition-colors hover:text-[#D6AF36]"
            >
              View All Leaders
              <ArrowRight size={14} />
            </button>
          </div>

          {/* Scrollable cards */}
          <div className="relative mt-8">
            <button
              type="button"
              onClick={() => scrollCards("left")}
              aria-label="Scroll left"
              className="absolute -left-4 top-1/2 z-10 hidden -translate-y-1/2 items-center justify-center rounded-full border border-gray-200 bg-white p-2 shadow-md transition-colors hover:bg-gray-50 md:flex"
            >
              <ChevronLeft size={18} />
            </button>
            <div
              ref={scrollRef}
              className="flex gap-5 overflow-x-auto pb-4 scrollbar-hide"
              style={{ scrollbarWidth: "none" }}
            >
              {leaders.map((leader) => (
                <LeaderCard key={leader.id} leader={leader} />
              ))}
            </div>
            <button
              type="button"
              onClick={() => scrollCards("right")}
              aria-label="Scroll right"
              className="absolute -right-4 top-1/2 z-10 hidden -translate-y-1/2 items-center justify-center rounded-full border border-gray-200 bg-white p-2 shadow-md transition-colors hover:bg-gray-50 md:flex"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </section>

      {/* ═══════════ 4. BECOME EXPERT + SPONSORSHIP ═══════════ */}
      <section id="contribute" className="bg-[#F0E9DE] py-16">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 px-6 lg:grid-cols-2 md:px-10">
          {/* Expert Form */}
          <div className="rounded-2xl bg-[#1A2A3F] p-8 text-white sm:p-10">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#D6AF36]">
              SHARE YOUR EXPERTISE
            </p>
            <h3 className="mt-3 font-serif text-2xl font-bold leading-snug sm:text-3xl">
              Become a Subject Matter Expert
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-gray-300">
              Contribute articles, research or interviews and help document
              India&apos;s maritime future.
            </p>
            <div className="mt-6 space-y-4">
              <div>
                <label className="text-xs font-semibold text-gray-300">
                  Full Name
                </label>
                <input
                  type="text"
                  placeholder="e.g. Captain Sandeep Sharma"
                  className="mt-1.5 w-full rounded-lg border border-white/15 bg-white/5 px-4 py-3 text-sm text-white placeholder-gray-500 outline-none transition focus:border-[#D6AF36]"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-300">
                  Email Address
                </label>
                <input
                  type="email"
                  placeholder="e.g. sandeep@maritime.gov.in"
                  className="mt-1.5 w-full rounded-lg border border-white/15 bg-white/5 px-4 py-3 text-sm text-white placeholder-gray-500 outline-none transition focus:border-[#D6AF36]"
                />
              </div>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="text-xs font-semibold text-gray-300">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    placeholder="+91 98765 43210"
                    className="mt-1.5 w-full rounded-lg border border-white/15 bg-white/5 px-4 py-3 text-sm text-white placeholder-gray-500 outline-none transition focus:border-[#D6AF36]"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-300">
                    Area of Expertise
                  </label>
                  <select
                    value={expertise}
                    onChange={(e) => setExpertise(e.target.value)}
                    className="mt-1.5 w-full rounded-lg border border-white/15 bg-white/5 px-4 py-3 text-sm text-white outline-none transition focus:border-[#D6AF36] appearance-none cursor-pointer"
                  >
                    <option value="" className="text-gray-900">
                      Select Specialty
                    </option>
                    <option value="ship-recycling" className="text-gray-900">
                      Ship Recycling
                    </option>
                    <option value="shipbuilding" className="text-gray-900">
                      Shipbuilding
                    </option>
                    <option value="maritime-law" className="text-gray-900">
                      Maritime Law
                    </option>
                    <option value="training" className="text-gray-900">
                      Maritime Training
                    </option>
                    <option value="port-management" className="text-gray-900">
                      Port Management
                    </option>
                  </select>
                </div>
              </div>
              <button
                type="button"
                className="mt-2 flex w-full items-center justify-center gap-2 rounded-lg bg-[#D6AF36] py-3.5 text-sm font-bold text-[#0A1F3C] transition-colors hover:bg-[#c29e2e] active:scale-[0.98]"
              >
                Submit Your Interest
                <ArrowRight size={16} />
              </button>
            </div>
          </div>

          {/* Sponsorship Card */}
          <div className="relative overflow-hidden rounded-2xl bg-[#F5F0E7]">
            <div className="flex h-full flex-col justify-between p-8 sm:p-10 lg:pr-[45%]">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#C5A028]">
                  PARTNER WITH US
                </p>
                <h3 className="mt-3 font-serif text-2xl font-bold leading-snug text-gray-900 sm:text-3xl">
                  Sponsorship Opportunities
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-gray-500">
                  Showcase your organisation and support this national knowledge
                  initiative.
                </p>
                <ul className="mt-6 space-y-4">
                  {[
                    {
                      icon: Eye,
                      title: "Brand Visibility",
                      desc: "Across digital & print platforms",
                    },
                    {
                      icon: MessageSquare,
                      title: "Thought Leadership",
                      desc: "Be positioned as a maritime leader",
                    },
                    {
                      icon: Globe,
                      title: "Nation Building",
                      desc: "Contribute to preserving maritime legacy",
                    },
                  ].map((item) => (
                    <li key={item.title} className="flex items-start gap-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#0A284D]/10">
                        <item.icon size={18} className="text-[#0A284D]" />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-gray-900">
                          {item.title}
                        </p>
                        <p className="text-xs text-gray-500">{item.desc}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
              <button
                type="button"
                className="mt-8 flex w-full items-center justify-center gap-2 rounded-lg bg-[#0A284D] py-3.5 text-sm font-bold text-white transition-colors hover:bg-[#0D3566]"
              >
                View Sponsorship Tiers
                <ArrowRight size={16} />
              </button>
            </div>
            {/* Lighthouse image (decorative) */}
            <div className="absolute right-0 top-0 bottom-0 hidden w-[40%] lg:block">
              <img
                src="/shipyard/lighthouse.png"
                alt=""
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════ 5. KNOWLEDGE SERIES ═══════════ */}
      <section className="bg-[#F0E9DE] py-16">
        <div className="mx-auto max-w-7xl px-6 md:px-10">
          <div className="text-center">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#C5A028]">
              OUR MARITIME PUBLICATIONS
            </p>
            <h2 className="mt-3 font-serif text-3xl font-bold text-gray-900 md:text-4xl">
              Explore Our Knowledge Series
            </h2>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {knowledgeSeries.map((item) => {
              const IconComp = seriesIcons[item.icon];
              return (
                <Link
                  key={item.title}
                  to={item.path}
                  className="group overflow-hidden rounded-xl border border-gray-200/60 bg-white transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
                >
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <img
                      src={item.img}
                      alt={item.title}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                    {/* Icon overlay */}
                    <div className="absolute bottom-3 left-3 flex h-10 w-10 items-center justify-center rounded-full bg-[#0A284D] shadow-lg">
                      {IconComp && (
                        <IconComp size={18} className="text-[#D6AF36]" />
                      )}
                    </div>
                  </div>
                  <div className="p-5">
                    <h3 className="font-serif text-base font-bold text-gray-900">
                      {item.title}
                    </h3>
                    <p className="mt-1.5 text-sm text-gray-500 leading-relaxed">
                      {item.description}
                    </p>
                    <p className="mt-4 flex items-center gap-1.5 text-sm font-bold text-[#C5A028] transition-colors group-hover:text-[#a8881f]">
                      Explore
                      <ArrowRight size={14} />
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </main>
  );
};

export default MaritimeLeadership;
