import { useState, useRef, useEffect } from 'react';
import Container from '../common/Container';
import { Filter } from 'lucide-react';

/* ─── LOCATION DATA (Accurately aligned with SimpleMaps in.svg 1000x1000 viewBox) ─── */
const locations = [
  // Major Ports
  { id: 1, name: 'Deendayal Port (Kandla)', type: 'port', state: 'Gujarat', city: 'Kandla', x: 18.5, y: 40.0, desc: 'India\'s largest port by cargo throughput. Handles 132M tonnes annually.', stat: '132M tonnes', established: '1955' },
  { id: 2, name: 'Mumbai Port Trust', type: 'port', state: 'Maharashtra', city: 'Mumbai', x: 23.2, y: 57.0, desc: 'One of India\'s oldest and busiest natural harbors.', stat: '65M tonnes', established: '1873' },
  { id: 3, name: 'JNPT (Nhava Sheva)', type: 'port', state: 'Maharashtra', city: 'Navi Mumbai', x: 23.8, y: 58.2, desc: 'India\'s largest container port handling 5.1M TEUs.', stat: '5.1M TEUs', established: '1989' },
  { id: 4, name: 'Mormugao Port', type: 'port', state: 'Goa', city: 'Vasco da Gama', x: 25.5, y: 68.0, desc: 'Major iron ore and coal handling port on west coast.', stat: '22M tonnes', established: '1885' },
  { id: 5, name: 'New Mangalore Port', type: 'port', state: 'Karnataka', city: 'Mangalore', x: 27.5, y: 76.0, desc: 'Petroleum, LPG, and petrochemical hub.', stat: '45M tonnes', established: '1974' },
  { id: 6, name: 'Cochin Port', type: 'port', state: 'Kerala', city: 'Kochi', x: 31.0, y: 84.5, desc: 'Natural harbor with modern container terminal.', stat: '32M tonnes', established: '1928' },
  { id: 7, name: 'V.O. Chidambaranar Port', type: 'port', state: 'Tamil Nadu', city: 'Tuticorin', x: 37.5, y: 89.0, desc: 'Key southern port for coal and container cargo.', stat: '37M tonnes', established: '1974' },
  { id: 8, name: 'Chennai Port', type: 'port', state: 'Tamil Nadu', city: 'Chennai', x: 44.0, y: 75.0, desc: 'India\'s second oldest major port. Major auto and container hub.', stat: '51M tonnes', established: '1881' },
  { id: 9, name: 'Kamarajar Port', type: 'port', state: 'Tamil Nadu', city: 'Ennore', x: 44.5, y: 73.8, desc: 'India\'s first corporatized major port. Coal and LNG.', stat: '30M tonnes', established: '2001' },
  { id: 10, name: 'Visakhapatnam Port', type: 'port', state: 'Andhra Pradesh', city: 'Visakhapatnam', x: 53.5, y: 61.5, desc: 'East coast\'s premier port for steel and petroleum.', stat: '72M tonnes', established: '1933' },
  { id: 11, name: 'Paradip Port', type: 'port', state: 'Odisha', city: 'Paradip', x: 62.5, y: 51.5, desc: 'Largest east coast port by cargo volume.', stat: '130M tonnes', established: '1966' },
  { id: 12, name: 'Kolkata/Haldia Port', type: 'port', state: 'West Bengal', city: 'Kolkata', x: 68.5, y: 46.0, desc: 'India\'s only riverine major port on the Hooghly.', stat: '46M tonnes', established: '1870' },

  // Shipyards
  { id: 13, name: 'Cochin Shipyard Limited', type: 'shipyard', state: 'Kerala', city: 'Kochi', x: 31.5, y: 85.5, desc: 'India\'s premier shipbuilding facility. Built INS Vikrant.', stat: '110,000 DWT', established: '1972' },
  { id: 14, name: 'Mazagon Dock Shipbuilders', type: 'shipyard', state: 'Maharashtra', city: 'Mumbai', x: 23.5, y: 56.2, desc: 'Leading defense shipyard — submarines, destroyers & frigates.', stat: '40,000 DWT', established: '1934' },
  { id: 15, name: 'GRSE', type: 'shipyard', state: 'West Bengal', city: 'Kolkata', x: 69.0, y: 45.2, desc: 'Premier warship builder. 100+ warships delivered.', stat: '25,000 DWT', established: '1884' },
  { id: 16, name: 'L&T Shipbuilding', type: 'shipyard', state: 'Tamil Nadu', city: 'Kattupalli', x: 44.8, y: 73.2, desc: 'State-of-the-art modular ship construction facility.', stat: '60,000 DWT', established: '2007' },
  { id: 17, name: 'Hindustan Shipyard', type: 'shipyard', state: 'Andhra Pradesh', city: 'Visakhapatnam', x: 54.0, y: 62.2, desc: 'East coast shipbuilding & submarine retrofitting.', stat: '80,000 DWT', established: '1941' },
  { id: 18, name: 'Goa Shipyard Limited', type: 'shipyard', state: 'Goa', city: 'Vasco da Gama', x: 25.8, y: 69.0, desc: 'Patrol craft, missile boats & training ships.', stat: '15,000 DWT', established: '1957' },
  { id: 19, name: 'Reliance Naval', type: 'shipyard', state: 'Gujarat', city: 'Pipavav', x: 21.5, y: 48.8, desc: 'One of the world\'s largest dry docks (662m).', stat: '400,000 DWT', established: '1997' },

  // Ship Recycling
  { id: 20, name: 'Alang Ship Recycling Yard', type: 'recycling', state: 'Gujarat', city: 'Alang', x: 23.0, y: 47.5, desc: 'World\'s largest ship breaking facility.', stat: '85,000 LDT/yr', established: '1983' },
  { id: 21, name: 'Kandla Ship Recycling', type: 'recycling', state: 'Gujarat', city: 'Kandla', x: 18.0, y: 39.2, desc: 'HKC & ISO 14001 certified green recycling.', stat: '50,000 LDT/yr', established: '1982' },
  { id: 22, name: 'Mumbai Ship Recycling', type: 'recycling', state: 'Maharashtra', city: 'Mumbai', x: 22.8, y: 57.8, desc: 'ISO 9001 certified standard recycling.', stat: '30,000 LDT/yr', established: '1979' },

  // Training Institutes
  { id: 23, name: 'IMU Chennai', type: 'institute', state: 'Tamil Nadu', city: 'Chennai', x: 44.2, y: 76.0, desc: 'Indian Maritime University — premier maritime education.', stat: '2,000+ students', established: '2008' },
  { id: 24, name: 'MERI Mumbai', type: 'institute', state: 'Maharashtra', city: 'Mumbai', x: 23.9, y: 55.5, desc: 'Marine Engineering & Research Institute.', stat: '1,500+ students', established: '1949' },
  { id: 25, name: 'IMU Visakhapatnam', type: 'institute', state: 'Andhra Pradesh', city: 'Visakhapatnam', x: 53.0, y: 60.8, desc: 'Eastern coast campus for maritime studies.', stat: '800+ students', established: '2008' },
  { id: 26, name: 'IMU Kolkata', type: 'institute', state: 'West Bengal', city: 'Kolkata', x: 68.0, y: 46.8, desc: 'Inland waterways & maritime training campus.', stat: '1,000+ students', established: '2008' },
];

const categoryConfig = [
  { key: 'all', label: 'All', color: '#D6AF36', icon: '⊕' },
  { key: 'port', label: 'Major Ports', color: '#F97316', icon: '⚓' },
  { key: 'shipyard', label: 'Shipyards', color: '#3B82F6', icon: '🔧' },
  { key: 'recycling', label: 'Ship Recycling', color: '#22C55E', icon: '♻' },
  { key: 'institute', label: 'Training Institutes', color: '#A855F7', icon: '🎓' },
];

const typeColors = { port: '#F97316', shipyard: '#3B82F6', recycling: '#22C55E', institute: '#A855F7' };
const typeLabels = { port: 'Major Port', shipyard: 'Shipyard', recycling: 'Ship Recycling', institute: 'Training Institute' };

const coastlineStats = [
  { value: '7,516', label: 'km Coastline', icon: '🌊' },
  { value: '12', label: 'Major Ports', icon: '⚓' },
  { value: '200+', label: 'Minor Ports', icon: '🚢' },
  { value: '6', label: 'Shipyard Hubs', icon: '🔧' },
  { value: '150+', label: 'Recycling Yards', icon: '♻' },
  { value: '130+', label: 'Training Institutes', icon: '🎓' },
];

/* ─── INDIA SVG MAP COMPONENT ─── */
const IndiaSVG = () => (
  <div className="relative w-full h-full">
    {/* Ocean Background & Nautical Grid */}
    <div className="absolute inset-0 bg-[#0A1E38] overflow-hidden">
      {[...Array(11)].map((_, i) => (
        <div key={`h${i}`} className="absolute w-full border-b border-white/[0.04]" style={{ top: `${i * 10}%` }} />
      ))}
      {[...Array(11)].map((_, i) => (
        <div key={`v${i}`} className="absolute h-full border-r border-white/[0.04]" style={{ left: `${i * 10}%` }} />
      ))}
      <span className="absolute left-[5%] top-[62%] -rotate-30 text-white/[0.08] text-xs sm:text-sm font-serif italic pointer-events-none">Arabian Sea</span>
      <span className="absolute right-[8%] top-[60%] rotate-20 text-white/[0.08] text-xs sm:text-sm font-serif italic pointer-events-none">Bay of Bengal</span>
      <span className="absolute left-[30%] bottom-[3%] text-white/[0.08] text-xs sm:text-sm font-serif italic pointer-events-none">Indian Ocean</span>
    </div>

    {/* SimpleMaps Official SVG Map (Exact 1:1 ratio filling relative container) */}
    <img
      src="/india-map.svg"
      alt="India SVG Map"
      className="absolute inset-0 w-full h-full object-fill opacity-90 transition-all duration-300 pointer-events-none"
      style={{
        filter: 'brightness(0.9) contrast(1.2) drop-shadow(0 0 10px rgba(214, 175, 54, 0.25))'
      }}
    />
  </div>
);

const IndiaMap = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [hoveredLocation, setHoveredLocation] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const mapRef = useRef(null);
  const [tooltipPos, setTooltipPos] = useState({ left: 0, top: 0, flipX: false, flipY: false });

  const activeLocation = selectedLocation || hoveredLocation;

  const filtered = (activeFilter === 'all'
    ? locations
    : locations.filter(l => l.type === activeFilter)
  ).filter(l => !searchQuery || l.name.toLowerCase().includes(searchQuery.toLowerCase()) || l.state.toLowerCase().includes(searchQuery.toLowerCase()) || l.city.toLowerCase().includes(searchQuery.toLowerCase()));

  // Counts per category
  const counts = {};
  categoryConfig.forEach(c => {
    counts[c.key] = c.key === 'all' ? locations.length : locations.filter(l => l.type === c.key).length;
  });

  useEffect(() => {
    if (!activeLocation || !mapRef.current) return;
    const rect = mapRef.current.getBoundingClientRect();
    const absX = (activeLocation.x / 100) * rect.width;
    const absY = (activeLocation.y / 100) * rect.height;
    setTooltipPos({ left: absX, top: absY, flipX: absX > rect.width * 0.55, flipY: absY > rect.height * 0.65 });
  }, [activeLocation]);

  return (
    <main className="w-full bg-[#061C38] text-white font-sans min-h-screen">
      {/* ═══════════ HERO SECTION ═══════════ */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
          backgroundSize: '40px 40px',
        }} />
        <Container className="relative z-10 py-12 md:py-16 text-center">
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#D6AF36]/70 mb-3">
            Interactive Maritime Map
          </p>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-normal tracking-tight text-white">
            India&apos;s Maritime Infrastructure
          </h1>
          <p className="text-gray-400 text-sm sm:text-base md:text-lg leading-relaxed max-w-2xl mx-auto mt-4">
            Explore {locations.length} ports, shipyards, recycling facilities, and training institutes across India&apos;s 7,516 km coastline.
          </p>
        </Container>
      </section>

      {/* ═══════════ STATS BAR ═══════════ */}
      <section className="border-y border-white/5 bg-[#071E38]">
        <Container>
          <div className="grid grid-cols-3 md:grid-cols-6 divide-x divide-white/5">
            {coastlineStats.map((s, i) => (
              <div key={i} className="py-4 md:py-5 text-center">
                <span className="text-sm md:text-base mr-1">{s.icon}</span>
                <span className="text-lg md:text-xl font-bold text-[#D6AF36]">{s.value}</span>
                <p className="text-[9px] md:text-[10px] text-gray-500 uppercase tracking-wider mt-0.5">{s.label}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* ═══════════ FILTERS + SEARCH ═══════════ */}
      <section className="border-b border-white/5 bg-[#071E38]/80 sticky top-[108px] z-20 backdrop-blur-sm">
        <Container>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 py-3">
            {/* Category Filters */}
            <div className="flex flex-wrap items-center gap-2">
              <Filter className="w-3.5 h-3.5 text-gray-500 mr-1 hidden sm:block" />
              {categoryConfig.map(cat => (
                <button
                  key={cat.key}
                  onClick={() => { setActiveFilter(cat.key); setSelectedLocation(null); }}
                  className="px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-300 border"
                  style={{
                    backgroundColor: activeFilter === cat.key ? typeColors[cat.key] ? typeColors[cat.key] + '20' : '#D6AF3620' : 'transparent',
                    borderColor: activeFilter === cat.key ? typeColors[cat.key] || '#D6AF36' : 'rgba(255,255,255,0.1)',
                    color: activeFilter === cat.key ? typeColors[cat.key] || '#D6AF36' : 'rgba(255,255,255,0.5)',
                  }}
                >
                  {cat.label}
                  <span className="ml-1.5 text-[10px] opacity-60">{counts[cat.key]}</span>
                </button>
              ))}
            </div>

            {/* Search */}
            <div className="relative w-full sm:w-64">
              <input
                type="text"
                placeholder="Search locations..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 pl-8 text-xs text-white placeholder-gray-500 outline-none focus:border-[#D6AF36]/40 focus:bg-white/[0.07] transition-all"
              />
              <svg className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
              </svg>
            </div>
          </div>
        </Container>
      </section>

      {/* ═══════════ MAP + SIDEBAR ═══════════ */}
      <section className="py-8 md:py-12">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Map Area */}
            <div className="lg:col-span-8 relative rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-[#0A1E38]" ref={mapRef}>
              <div className="w-full aspect-square relative overflow-hidden">
                <IndiaSVG />

                {/* Markers Overlay (Sharing exact 1:1 aspect-square bounds) */}
                <div className="absolute inset-0">
                  {filtered.map(loc => {
                    const color = typeColors[loc.type];
                    const isActive = activeLocation?.id === loc.id;
                    return (
                      <button
                        key={loc.id}
                        className="absolute transform -translate-x-1/2 -translate-y-1/2 focus:outline-none"
                        style={{ left: `${loc.x}%`, top: `${loc.y}%`, zIndex: isActive ? 30 : 10 }}
                        onMouseEnter={() => setHoveredLocation(loc)}
                        onMouseLeave={() => setHoveredLocation(null)}
                        onClick={() => setSelectedLocation(selectedLocation?.id === loc.id ? null : loc)}
                        aria-label={loc.name}
                      >
                        <span className="absolute rounded-full opacity-40" style={{
                          backgroundColor: color, width: isActive ? '22px' : '14px', height: isActive ? '22px' : '14px',
                          top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
                          animation: 'markerPing 2s cubic-bezier(0, 0, 0.2, 1) infinite',
                        }} />
                        <span className="relative block rounded-full border-2 border-white/90 shadow-lg transition-all duration-300 cursor-pointer" style={{
                          backgroundColor: color, width: isActive ? '14px' : '9px', height: isActive ? '14px' : '9px',
                          boxShadow: isActive ? `0 0 18px ${color}90` : `0 0 6px ${color}50`,
                        }} />
                        {isActive && (
                          <span className="absolute left-1/2 -translate-x-1/2 -top-5 whitespace-nowrap text-[9px] font-semibold px-1.5 py-0.5 rounded bg-black/80 text-white pointer-events-none">
                            {loc.name}
                          </span>
                        )}
                      </button>
                    );
                  })}

                  {/* Tooltip */}
                  {activeLocation && (
                    <div className="absolute z-40 pointer-events-none" style={{
                      left: tooltipPos.left, top: tooltipPos.top,
                      transform: `translate(${tooltipPos.flipX ? 'calc(-100% - 14px)' : '14px'}, ${tooltipPos.flipY ? 'calc(-100% - 14px)' : '14px'})`,
                    }}>
                      <div className="bg-[#0D2E52]/95 backdrop-blur-md border border-white/15 rounded-xl px-4 py-3 shadow-2xl min-w-[220px] max-w-[280px]">
                        <div className="flex items-center gap-2 mb-1.5">
                          <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: typeColors[activeLocation.type] }} />
                          <span className="text-[10px] font-bold uppercase tracking-wider" style={{ color: typeColors[activeLocation.type] }}>
                            {typeLabels[activeLocation.type]}
                          </span>
                        </div>
                        <h4 className="text-sm font-semibold text-white leading-snug">{activeLocation.name}</h4>
                        <p className="text-[11px] text-gray-400 mt-0.5">{activeLocation.city}, {activeLocation.state}</p>
                        <p className="text-[11px] text-gray-300 mt-2 leading-relaxed">{activeLocation.desc}</p>
                        <div className="mt-2 pt-2 border-t border-white/10 flex items-center justify-between">
                          <span className="text-[9px] text-gray-500 uppercase tracking-wider">Est. {activeLocation.established}</span>
                          <span className="text-xs font-semibold text-[#D6AF36]">{activeLocation.stat}</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Legend */}
              <div className="absolute bottom-3 left-3 sm:bottom-4 sm:left-4 bg-[#0B2240]/90 backdrop-blur-sm border border-white/10 rounded-lg px-3 py-2 z-20">
                <p className="text-[9px] uppercase tracking-wider text-gray-500 mb-1.5 font-semibold">Legend</p>
                <div className="flex flex-col gap-1">
                  {categoryConfig.filter(c => c.key !== 'all').map(cat => (
                    <div key={cat.key} className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full" style={{ backgroundColor: typeColors[cat.key] }} />
                      <span className="text-[10px] text-gray-400">{cat.label}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Count badge */}
              <div className="absolute top-3 right-3 bg-[#D6AF36]/10 border border-[#D6AF36]/25 rounded-full px-3 py-1 z-20">
                <span className="text-xs font-bold text-[#D6AF36]">{filtered.length}</span>
                <span className="text-[10px] text-gray-400 ml-1">shown</span>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-4 flex flex-col gap-4">
              {/* Detail Card */}
              <div className="bg-white/[0.04] border border-white/10 rounded-xl p-5 flex flex-col min-h-[240px]">
                {activeLocation ? (
                  <>
                    <div className="flex items-center gap-2 mb-3">
                      <span className="w-3 h-3 rounded-full" style={{ backgroundColor: typeColors[activeLocation.type] }} />
                      <span className="text-[10px] font-bold uppercase tracking-wider" style={{ color: typeColors[activeLocation.type] }}>
                        {typeLabels[activeLocation.type]}
                      </span>
                    </div>
                    <h3 className="text-lg font-semibold text-white leading-snug">{activeLocation.name}</h3>
                    <p className="text-sm text-gray-400 mt-1">{activeLocation.city}, {activeLocation.state}</p>
                    <p className="text-sm text-gray-300 mt-3 leading-relaxed flex-1">{activeLocation.desc}</p>
                    <div className="mt-4 grid grid-cols-2 gap-3 pt-3 border-t border-white/10">
                      <div>
                        <p className="text-[9px] text-gray-500 uppercase tracking-wider">Established</p>
                        <p className="text-sm font-semibold text-white mt-0.5">{activeLocation.established}</p>
                      </div>
                      <div>
                        <p className="text-[9px] text-gray-500 uppercase tracking-wider">Capacity</p>
                        <p className="text-sm font-bold text-[#D6AF36] mt-0.5">{activeLocation.stat}</p>
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="flex-1 flex flex-col items-center justify-center text-center">
                    <div className="w-14 h-14 rounded-full bg-white/5 flex items-center justify-center mb-3">
                      <svg className="w-7 h-7 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                      </svg>
                    </div>
                    <p className="text-sm text-gray-400 font-medium">Select a Location</p>
                    <p className="text-xs text-gray-500 mt-1.5 max-w-[200px]">Hover or click any marker on the map to view detailed information</p>
                  </div>
                )}
              </div>

              {/* Location List */}
              <div className="bg-white/[0.04] border border-white/10 rounded-xl overflow-hidden flex-1">
                <div className="px-4 py-3 border-b border-white/5 flex items-center justify-between">
                  <h3 className="text-xs font-semibold text-white uppercase tracking-wider">Locations</h3>
                  <span className="text-[10px] text-gray-500">{filtered.length} results</span>
                </div>
                <div className="max-h-[380px] overflow-y-auto" style={{ scrollbarWidth: 'thin', scrollbarColor: '#ffffff15 transparent' }}>
                  {filtered.length === 0 ? (
                    <div className="px-4 py-8 text-center">
                      <p className="text-sm text-gray-500">No locations match your search.</p>
                    </div>
                  ) : (
                    filtered.map(loc => (
                      <button
                        key={loc.id}
                        onClick={() => setSelectedLocation(selectedLocation?.id === loc.id ? null : loc)}
                        className={`w-full text-left px-4 py-3 border-b border-white/5 transition-all duration-200 hover:bg-white/5 ${selectedLocation?.id === loc.id ? 'bg-white/[0.06]' : ''}`}
                      >
                        <div className="flex items-start gap-2.5">
                          <span className="w-2 h-2 rounded-full mt-1.5 shrink-0" style={{ backgroundColor: typeColors[loc.type] }} />
                          <div className="min-w-0">
                            <p className="text-xs font-medium text-white truncate">{loc.name}</p>
                            <p className="text-[10px] text-gray-500 mt-0.5">{loc.city}, {loc.state}</p>
                          </div>
                          <span className="text-[9px] text-gray-600 ml-auto shrink-0 mt-0.5">{loc.established}</span>
                        </div>
                      </button>
                    ))
                  )}
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* ═══════════ INFO BANNER ═══════════ */}
      <section className="border-t border-white/5 py-10 md:py-14 bg-gradient-to-b from-[#061C38] to-[#071E3A]">
        <Container>
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-xl md:text-2xl font-serif text-white mb-4">India&apos;s Maritime Heritage</h2>
            <p className="text-sm text-gray-400 leading-relaxed">
              With a coastline stretching 7,516 km and a maritime history spanning over 5,000 years, India is one of the world&apos;s leading maritime nations. The country accounts for over <span className="text-[#D6AF36] font-semibold">30% of global ship recycling</span> and has rapidly modernized its port infrastructure under the <span className="text-white font-medium">Sagarmala Programme</span>, targeting $110 billion in infrastructure investment by 2035.
            </p>
          </div>
        </Container>
      </section>

      <style>{`
        @keyframes markerPing {
          0% { transform: translate(-50%, -50%) scale(1); opacity: 0.6; }
          75%, 100% { transform: translate(-50%, -50%) scale(2.5); opacity: 0; }
        }
      `}</style>
    </main>
  );
};

export default IndiaMap;
