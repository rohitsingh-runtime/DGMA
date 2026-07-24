import { useState, useRef, useEffect } from 'react';
import Container from '../common/Container';

/* ─── MAP MARKER DATA (Accurately aligned with SimpleMaps in.svg 1000x1000 viewBox) ─── */
const markers = [
  // Shipyards
  { id: 1, label: 'Cochin Shipyard', type: 'shipyard', state: 'Kerala', x: 31.5, y: 85.5, desc: 'Premier shipbuilding & maintenance facility. Built INS Vikrant.', capacity: '110,000 DWT' },
  { id: 2, label: 'Mazagon Dock', type: 'shipyard', state: 'Maharashtra', x: 23.5, y: 56.2, desc: 'India\'s leading defense shipyard. Submarines, destroyers & frigates.', capacity: '40,000 DWT' },
  { id: 3, label: 'GRSE Kolkata', type: 'shipyard', state: 'West Bengal', x: 69.0, y: 45.2, desc: 'Premier warship builder. 100+ warships delivered.', capacity: '25,000 DWT' },
  { id: 4, label: 'L&T Kattupalli', type: 'shipyard', state: 'Tamil Nadu', x: 44.8, y: 73.2, desc: 'Modular ship construction. Offshore & defense vessels.', capacity: '60,000 DWT' },
  { id: 5, label: 'Hindustan Shipyard', type: 'shipyard', state: 'Andhra Pradesh', x: 54.0, y: 62.2, desc: 'East coast shipbuilding & submarine retrofitting.', capacity: '80,000 DWT' },
  { id: 6, label: 'Goa Shipyard', type: 'shipyard', state: 'Goa', x: 25.8, y: 69.0, desc: 'High-speed patrol craft & missile boats.', capacity: '15,000 DWT' },
  { id: 7, label: 'Reliance Naval', type: 'shipyard', state: 'Gujarat', x: 21.5, y: 48.8, desc: 'One of the world\'s largest dry docks (662m).', capacity: '400,000 DWT' },

  // Ship Recycling Facilities
  { id: 8, label: 'Alang Ship Recycling', type: 'recycling', state: 'Gujarat', x: 23.0, y: 47.5, desc: 'World\'s largest ship recycling yard. 85,000 LDT/year.', capacity: '85,000 LDT/yr' },
  { id: 9, label: 'Kandla Recycling', type: 'recycling', state: 'Gujarat', x: 18.0, y: 39.2, desc: 'Green recycling, HKC & ISO 14001 certified.', capacity: '50,000 LDT/yr' },
  { id: 10, label: 'Mumbai Recycling', type: 'recycling', state: 'Maharashtra', x: 22.8, y: 57.8, desc: 'Standard recycling with ISO 9001 certification.', capacity: '30,000 LDT/yr' },

  // Training Institutes
  { id: 11, label: 'IMU Chennai', type: 'institute', state: 'Tamil Nadu', x: 44.2, y: 76.0, desc: 'Indian Maritime University — premier maritime education.', capacity: '2,000+ students' },
  { id: 12, label: 'MERI Mumbai', type: 'institute', state: 'Maharashtra', x: 23.9, y: 55.5, desc: 'Marine Engineering & Research Institute.', capacity: '1,500+ students' },
  { id: 13, label: 'IMU Visakhapatnam', type: 'institute', state: 'Andhra Pradesh', x: 53.0, y: 60.8, desc: 'IMU campus — eastern coast maritime training.', capacity: '800+ students' },
  { id: 14, label: 'IMU Kolkata', type: 'institute', state: 'West Bengal', x: 68.0, y: 46.8, desc: 'IMU campus — inland waterways & maritime studies.', capacity: '1,000+ students' },

  // Major Ports
  { id: 15, label: 'JNPT Mumbai', type: 'port', state: 'Maharashtra', x: 23.8, y: 58.2, desc: 'Jawaharlal Nehru Port — India\'s largest container port.', capacity: '5.1M TEUs' },
  { id: 16, label: 'Chennai Port', type: 'port', state: 'Tamil Nadu', x: 44.0, y: 75.0, desc: 'Second oldest port in India. Major cargo hub.', capacity: '51M tonnes' },
  { id: 17, label: 'Paradip Port', type: 'port', state: 'Odisha', x: 62.5, y: 51.5, desc: 'Largest port on India\'s east coast by cargo volume.', capacity: '130M tonnes' },
  { id: 18, label: 'Kandla Port', type: 'port', state: 'Gujarat', x: 18.5, y: 40.0, desc: 'Deendayal Port — largest by cargo throughput.', capacity: '132M tonnes' },
  { id: 19, label: 'Tuticorin Port', type: 'port', state: 'Tamil Nadu', x: 37.5, y: 89.0, desc: 'V.O. Chidambaranar Port — key southern hub.', capacity: '37M tonnes' },
  { id: 20, label: 'Mangalore Port', type: 'port', state: 'Karnataka', x: 27.5, y: 76.0, desc: 'New Mangalore Port — petrochemical & LPG hub.', capacity: '45M tonnes' },
];

const categories = [
  { key: 'all', label: 'All Locations', color: '#D6AF36' },
  { key: 'shipyard', label: 'Shipyards', color: '#3B82F6' },
  { key: 'recycling', label: 'Recycling', color: '#22C55E' },
  { key: 'institute', label: 'Institutes', color: '#A855F7' },
  { key: 'port', label: 'Ports', color: '#F97316' },
];

const typeColors = {
  shipyard: '#3B82F6',
  recycling: '#22C55E',
  institute: '#A855F7',
  port: '#F97316',
};

const stats = [
  { value: '7,500+', label: 'km Coastline' },
  { value: '12', label: 'Major Ports' },
  { value: '200+', label: 'Minor Ports' },
  { value: '150+', label: 'Shipyards & Facilities' },
];

/* ─── INDIA SVG OUTLINE ─── */
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

const MaritimeMapBanner = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [hoveredMarker, setHoveredMarker] = useState(null);
  const [selectedMarker, setSelectedMarker] = useState(null);
  const mapRef = useRef(null);
  const tooltipRef = useRef(null);
  const [tooltipPos, setTooltipPos] = useState({ left: 0, top: 0, flipX: false, flipY: false });

  const filtered = activeFilter === 'all'
    ? markers
    : markers.filter(m => m.type === activeFilter);

  const activeMarker = selectedMarker || hoveredMarker;

  /* Recalculate tooltip position so it doesn't overflow the map */
  useEffect(() => {
    if (!activeMarker || !mapRef.current) return;
    const mapRect = mapRef.current.getBoundingClientRect();
    const markerAbsX = (activeMarker.x / 100) * mapRect.width;
    const markerAbsY = (activeMarker.y / 100) * mapRect.height;
    setTooltipPos({
      left: markerAbsX,
      top: markerAbsY,
      flipX: markerAbsX > mapRect.width * 0.55,
      flipY: markerAbsY > mapRect.height * 0.65,
    });
  }, [activeMarker]);

  return (
    <section className="relative w-full py-16 md:py-24 bg-[#061C38] text-white font-sans overflow-hidden">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
        backgroundSize: '40px 40px',
      }} />

      <Container className="relative z-10">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <div className="text-[#D6AF36] mb-4">
            <svg className="w-10 h-10 md:w-12 md:h-12 fill-current mx-auto" viewBox="0 0 24 24">
              <path d="M12 2a2.5 2.5 0 0 1 2.5 2.5c0 .93-.5 1.74-1.25 2.18V8.1a7.002 7.002 0 0 1 6.643 5.9h-2.032A5.002 5.002 0 0 0 13 10.1v8.78a2.5 2.5 0 1 1-2 0V10.1A5.002 5.002 0 0 0 6.139 14H4.107a7.002 7.002 0 0 1 6.643-5.9V6.68A2.497 2.497 0 0 1 9.5 4.5 2.5 2.5 0 0 1 12 2z" />
            </svg>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-normal tracking-tight text-white">
            India&apos;s Maritime Map
          </h2>
          <p className="text-gray-300 text-sm sm:text-base md:text-lg leading-relaxed max-w-2xl mx-auto mt-4 font-normal">
            Explore shipyards, recycling facilities, training institutes, and major ports across India&apos;s 7,500 km coastline.
          </p>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-8 md:mb-10">
          {categories.map(cat => (
            <button
              key={cat.key}
              onClick={() => { setActiveFilter(cat.key); setSelectedMarker(null); }}
              className="px-4 py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 border"
              style={{
                backgroundColor: activeFilter === cat.key ? cat.color + '22' : 'transparent',
                borderColor: activeFilter === cat.key ? cat.color : 'rgba(255,255,255,0.15)',
                color: activeFilter === cat.key ? cat.color : 'rgba(255,255,255,0.6)',
              }}
            >
              <span className="inline-block w-2 h-2 rounded-full mr-2" style={{ backgroundColor: cat.color }} />
              {cat.label}
            </button>
          ))}
        </div>

        {/* Map + Info Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Interactive Map */}
          <div className="lg:col-span-2 relative rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-[#0A1E38]" ref={mapRef}>
            {/* SVG India Map in 1:1 ratio container */}
            <div className="w-full aspect-square relative overflow-hidden">
              <IndiaSVG />

              {/* Markers Overlay */}
              <div className="absolute inset-0">
                {filtered.map(marker => {
                  const color = typeColors[marker.type];
                  const isActive = activeMarker?.id === marker.id;
                  return (
                    <button
                      key={marker.id}
                      className="absolute transform -translate-x-1/2 -translate-y-1/2 focus:outline-none"
                      style={{
                        left: `${marker.x}%`,
                        top: `${marker.y}%`,
                        zIndex: isActive ? 30 : 10,
                      }}
                      onMouseEnter={() => setHoveredMarker(marker)}
                      onMouseLeave={() => setHoveredMarker(null)}
                      onClick={() => setSelectedMarker(selectedMarker?.id === marker.id ? null : marker)}
                      aria-label={marker.label}
                    >
                      {/* Pulse ring */}
                      <span
                        className="absolute rounded-full opacity-40"
                        style={{
                          backgroundColor: color,
                          width: isActive ? '24px' : '16px',
                          height: isActive ? '24px' : '16px',
                          top: '50%',
                          left: '50%',
                          transform: 'translate(-50%, -50%)',
                          animation: 'markerPing 2s cubic-bezier(0, 0, 0.2, 1) infinite',
                        }}
                      />
                      {/* Dot */}
                      <span
                        className="relative block rounded-full border-2 border-white/90 shadow-lg transition-all duration-300 cursor-pointer"
                        style={{
                          backgroundColor: color,
                          width: isActive ? '14px' : '9px',
                          height: isActive ? '14px' : '9px',
                          boxShadow: isActive ? `0 0 18px ${color}90` : `0 0 6px ${color}50`,
                        }}
                      />
                      {isActive && (
                        <span className="absolute left-1/2 -translate-x-1/2 -top-5 whitespace-nowrap text-[9px] sm:text-[10px] font-semibold px-1.5 py-0.5 rounded bg-black/80 text-white pointer-events-none">
                          {marker.label}
                        </span>
                      )}
                    </button>
                  );
                })}

                {/* Tooltip */}
                {activeMarker && (
                  <div
                    ref={tooltipRef}
                    className="absolute z-40 pointer-events-none"
                    style={{
                      left: tooltipPos.left,
                      top: tooltipPos.top,
                      transform: `translate(${tooltipPos.flipX ? 'calc(-100% - 14px)' : '14px'}, ${tooltipPos.flipY ? 'calc(-100% - 14px)' : '14px'})`,
                      transition: 'opacity 0.2s',
                    }}
                  >
                    <div className="bg-[#0D2E52]/95 backdrop-blur-md border border-white/15 rounded-xl px-4 py-3 shadow-2xl min-w-[200px] max-w-[260px]">
                      <div className="flex items-center gap-2 mb-1.5">
                        <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: typeColors[activeMarker.type] }} />
                        <span className="text-xs font-bold uppercase tracking-wider" style={{ color: typeColors[activeMarker.type] }}>
                          {activeMarker.type}
                        </span>
                      </div>
                      <h4 className="text-sm font-semibold text-white leading-snug">{activeMarker.label}</h4>
                      <p className="text-xs text-gray-400 mt-0.5">{activeMarker.state}</p>
                      <p className="text-xs text-gray-300 mt-2 leading-relaxed">{activeMarker.desc}</p>
                      <div className="mt-2 pt-2 border-t border-white/10 flex items-center justify-between">
                        <span className="text-[10px] text-gray-400 uppercase tracking-wider">Capacity</span>
                        <span className="text-xs font-semibold text-[#D6AF36]">{activeMarker.capacity}</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Map Legend */}
            <div className="absolute bottom-3 left-3 sm:bottom-4 sm:left-4 bg-[#0B2240]/90 backdrop-blur-sm border border-white/10 rounded-lg px-3 py-2 sm:px-4 sm:py-3 z-20">
              <p className="text-[10px] uppercase tracking-wider text-gray-400 mb-1.5 font-semibold">Legend</p>
              <div className="flex flex-col gap-1.5">
                {categories.filter(c => c.key !== 'all').map(cat => (
                  <div key={cat.key} className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full" style={{ backgroundColor: cat.color }} />
                    <span className="text-[10px] sm:text-xs text-gray-300">{cat.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Marker count badge */}
            <div className="absolute top-3 right-3 sm:top-4 sm:right-4 bg-[#D6AF36]/15 border border-[#D6AF36]/30 rounded-full px-3 py-1 z-20">
              <span className="text-xs font-bold text-[#D6AF36]">{filtered.length}</span>
              <span className="text-[10px] text-gray-300 ml-1">locations</span>
            </div>
          </div>

          {/* Sidebar Info Panel */}
          <div className="lg:col-span-1 flex flex-col gap-4">
            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-3">
              {stats.map((stat, i) => (
                <div key={i} className="bg-white/5 border border-white/10 rounded-xl p-4 text-center hover:bg-white/[0.08] transition-colors duration-300">
                  <p className="text-xl sm:text-2xl font-bold text-[#D6AF36]">{stat.value}</p>
                  <p className="text-[10px] sm:text-xs text-gray-400 mt-1 uppercase tracking-wider">{stat.label}</p>
                </div>
              ))}
            </div>

            {/* Selected / Active Info Card */}
            <div className="flex-1 bg-white/5 border border-white/10 rounded-xl p-5 flex flex-col min-h-[200px]">
              {activeMarker ? (
                <>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="w-3 h-3 rounded-full" style={{ backgroundColor: typeColors[activeMarker.type] }} />
                    <span className="text-xs font-bold uppercase tracking-wider" style={{ color: typeColors[activeMarker.type] }}>
                      {activeMarker.type}
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold text-white">{activeMarker.label}</h3>
                  <p className="text-sm text-gray-400 mt-1">{activeMarker.state}</p>
                  <p className="text-sm text-gray-300 mt-3 leading-relaxed flex-1">{activeMarker.desc}</p>
                  <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between">
                    <span className="text-xs text-gray-400 uppercase tracking-wider">Capacity</span>
                    <span className="text-sm font-bold text-[#D6AF36]">{activeMarker.capacity}</span>
                  </div>
                </>
              ) : (
                <div className="flex-1 flex flex-col items-center justify-center text-center">
                  <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center mb-3">
                    <svg className="w-6 h-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                    </svg>
                  </div>
                  <p className="text-sm text-gray-400">Hover or click a marker on the map to view details</p>
                  <p className="text-xs text-gray-500 mt-2">{markers.length} maritime locations mapped</p>
                </div>
              )}
            </div>

            {/* Quick Facts */}
            <div className="bg-gradient-to-br from-[#D6AF36]/10 to-transparent border border-[#D6AF36]/20 rounded-xl p-5">
              <h4 className="text-sm font-bold text-[#D6AF36] mb-2">Did You Know?</h4>
              <p className="text-xs text-gray-300 leading-relaxed">
                India accounts for over <span className="text-white font-semibold">30% of global ship recycling</span>, with Alang in Gujarat being the world&apos;s largest ship-breaking yard. India&apos;s 12 major ports handle over 1,500 million tonnes of cargo annually.
              </p>
            </div>
          </div>
        </div>
      </Container>

      {/* CSS for marker animations */}
      <style>{`
        @keyframes markerPing {
          0% { transform: translate(-50%, -50%) scale(1); opacity: 0.6; }
          75%, 100% { transform: translate(-50%, -50%) scale(2.5); opacity: 0; }
        }
      `}</style>
    </section>
  );
};

export default MaritimeMapBanner;