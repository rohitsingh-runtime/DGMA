import { useState, useRef, useEffect } from 'react';
import Container from '../common/Container';

/* ─── MAP MARKER DATA ─── */
const markers = [
  { id: 1, label: 'Cochin Shipyard', type: 'shipyard', state: 'Kerala', x: 42, y: 82, desc: 'Premier shipbuilding & maintenance facility. Built INS Vikrant.', capacity: '110,000 DWT' },
  { id: 2, label: 'Mazagon Dock', type: 'shipyard', state: 'Maharashtra', x: 32, y: 62, desc: "India's leading defense shipyard. Submarines, destroyers & frigates.", capacity: '40,000 DWT' },
  { id: 3, label: 'GRSE Kolkata', type: 'shipyard', state: 'West Bengal', x: 72, y: 48, desc: 'Premier warship builder. 100+ warships delivered.', capacity: '25,000 DWT' },
  { id: 4, label: 'L&T Kattupalli', type: 'shipyard', state: 'Tamil Nadu', x: 49, y: 80, desc: 'Modular ship construction. Offshore & defense vessels.', capacity: '60,000 DWT' },
  { id: 5, label: 'Hindustan Shipyard', type: 'shipyard', state: 'Andhra Pradesh', x: 55, y: 65, desc: 'East coast shipbuilding & submarine retrofitting.', capacity: '80,000 DWT' },
  { id: 6, label: 'Goa Shipyard', type: 'shipyard', state: 'Goa', x: 33, y: 68, desc: 'High-speed patrol craft & missile boats.', capacity: '15,000 DWT' },
  { id: 7, label: 'Reliance Naval', type: 'shipyard', state: 'Gujarat', x: 27, y: 50, desc: "One of the world's largest dry docks (662m).", capacity: '400,000 DWT' },
  { id: 8, label: 'Alang Ship Recycling', type: 'recycling', state: 'Gujarat', x: 29, y: 48, desc: "World's largest ship recycling yard.", capacity: '85,000 LDT/yr' },
  { id: 9, label: 'Kandla Recycling', type: 'recycling', state: 'Gujarat', x: 24, y: 43, desc: 'Green recycling, HKC & ISO 14001 certified.', capacity: '50,000 LDT/yr' },
  { id: 10, label: 'Mumbai Recycling', type: 'recycling', state: 'Maharashtra', x: 30, y: 60, desc: 'Standard recycling with ISO 9001 certification.', capacity: '30,000 LDT/yr' },
  { id: 11, label: 'IMU Chennai', type: 'institute', state: 'Tamil Nadu', x: 51, y: 78, desc: 'Indian Maritime University — premier maritime education.', capacity: '2,000+ students' },
  { id: 12, label: 'MERI Mumbai', type: 'institute', state: 'Maharashtra', x: 30, y: 58, desc: 'Marine Engineering & Research Institute.', capacity: '1,500+ students' },
  { id: 13, label: 'IMU Visakhapatnam', type: 'institute', state: 'Andhra Pradesh', x: 58, y: 62, desc: 'IMU campus — eastern coast maritime training.', capacity: '800+ students' },
  { id: 14, label: 'IMU Kolkata', type: 'institute', state: 'West Bengal', x: 74, y: 50, desc: 'IMU campus — inland waterways & maritime studies.', capacity: '1,000+ students' },
  { id: 15, label: 'JNPT Mumbai', type: 'port', state: 'Maharashtra', x: 28, y: 61, desc: "Jawaharlal Nehru Port — India's largest container port.", capacity: '5.1M TEUs' },
  { id: 16, label: 'Chennai Port', type: 'port', state: 'Tamil Nadu', x: 53, y: 77, desc: 'Second oldest port in India. Major cargo hub.', capacity: '51M tonnes' },
  { id: 17, label: 'Paradip Port', type: 'port', state: 'Odisha', x: 66, y: 54, desc: "Largest port on India's east coast by cargo volume.", capacity: '130M tonnes' },
  { id: 18, label: 'Kandla Port', type: 'port', state: 'Gujarat', x: 22, y: 42, desc: 'Deendayal Port — largest by cargo throughput.', capacity: '132M tonnes' },
  { id: 19, label: 'Tuticorin Port', type: 'port', state: 'Tamil Nadu', x: 46, y: 86, desc: 'V.O. Chidambaranar Port — key southern hub.', capacity: '37M tonnes' },
  { id: 20, label: 'Mangalore Port', type: 'port', state: 'Karnataka', x: 37, y: 74, desc: 'New Mangalore Port — petrochemical & LPG hub.', capacity: '45M tonnes' },
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
  <svg
    viewBox="0 0 500 550"
    className="w-full h-full"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Water / ocean background */}
    <rect width="500" height="550" fill="#0A1E38" rx="12" />

    {/* Grid lines for nautical feel */}
    {[...Array(11)].map((_, i) => (
      <line key={`h${i}`} x1="0" y1={i * 50} x2="500" y2={i * 50} stroke="#ffffff" strokeOpacity="0.04" strokeWidth="0.5" />
    ))}
    {[...Array(11)].map((_, i) => (
      <line key={`v${i}`} x1={i * 50} y1="0" x2={i * 50} y2="550" stroke="#ffffff" strokeOpacity="0.04" strokeWidth="0.5" />
    ))}

    {/* India outline - simplified polygon */}
    <path
      d="M200,30 L215,28 L230,25 L240,30 L248,28 L260,32 L275,30 L290,28 
         L310,32 L325,35 L340,30 L355,35 L365,38 L375,42 L385,48 
         L390,55 L388,65 L392,72 L395,80 L390,88 L385,95 L380,102 
         L375,108 L370,115 L365,120 L358,125 L352,130 L348,138 
         L350,148 L355,155 L360,162 L362,170 L358,178 L352,185 
         L345,190 L338,195 L332,200 L328,208 L325,215 L320,222 
         L315,228 L310,235 L305,242 L298,248 L292,255 L285,260 
         L280,268 L275,275 L270,282 L265,288 L262,295 L260,302 
         L258,310 L256,318 L255,325 L252,332 L248,340 L245,348 
         L240,355 L235,362 L230,368 L225,375 L220,382 L218,390 
         L222,398 L228,405 L232,412 L238,418 L242,425 L248,430 
         L252,435 L255,440 L258,448 L260,455 L258,462 L252,468 
         L245,472 L238,478 L232,482 L225,488 L218,492 L210,495 
         L202,498 L195,502 L188,505 L180,508 L172,505 L165,500 
         L158,495 L152,488 L148,480 L145,472 L142,465 L140,458 
         L138,450 L135,442 L132,435 L128,428 L125,420 L122,412 
         L120,405 L118,398 L115,390 L112,382 L110,375 L108,368 
         L105,360 L102,352 L100,345 L98,338 L96,330 L95,322 
         L94,315 L92,308 L90,300 L88,292 L86,285 L84,278 
         L82,270 L80,262 L78,255 L76,248 L75,240 L78,232 
         L82,225 L88,218 L95,212 L100,205 L105,198 L108,190 
         L110,182 L108,175 L105,168 L102,160 L100,152 L98,145 
         L96,138 L95,130 L98,122 L102,115 L108,108 L115,102 
         L122,96 L128,90 L132,82 L135,75 L138,68 L142,60 
         L148,52 L155,45 L162,40 L170,36 L178,33 L185,30 
         L192,28 L200,30Z"
      fill="#0F2D4F"
      stroke="#D6AF36"
      strokeWidth="1.5"
      strokeOpacity="0.6"
    />

    {/* Interior detail lines for states - subtle */}
    <path d="M155,45 L200,80 L280,68 L340,80" stroke="#D6AF36" strokeOpacity="0.12" strokeWidth="0.5" />
    <path d="M100,200 L180,190 L260,200 L330,205" stroke="#D6AF36" strokeOpacity="0.12" strokeWidth="0.5" />
    <path d="M80,270 L160,260 L240,280 L300,260" stroke="#D6AF36" strokeOpacity="0.12" strokeWidth="0.5" />
    <path d="M120,350 L200,340 L260,360" stroke="#D6AF36" strokeOpacity="0.12" strokeWidth="0.5" />

    {/* Coastline glow effect */}
    <path
      d="M200,30 L215,28 L230,25 L240,30 L248,28 L260,32 L275,30 L290,28 
         L310,32 L325,35 L340,30 L355,35 L365,38 L375,42 L385,48 
         L390,55 L388,65 L392,72 L395,80 L390,88 L385,95 L380,102 
         L375,108 L370,115 L365,120 L358,125 L352,130 L348,138 
         L350,148 L355,155 L360,162 L362,170 L358,178 L352,185 
         L345,190 L338,195 L332,200 L328,208 L325,215 L320,222 
         L315,228 L310,235 L305,242 L298,248 L292,255 L285,260 
         L280,268 L275,275 L270,282 L265,288 L262,295 L260,302 
         L258,310 L256,318 L255,325 L252,332 L248,340 L245,348 
         L240,355 L235,362 L230,368 L225,375 L220,382 L218,390 
         L222,398 L228,405 L232,412 L238,418 L242,425 L248,430 
         L252,435 L255,440 L258,448 L260,455 L258,462 L252,468 
         L245,472 L238,478 L232,482 L225,488 L218,492 L210,495 
         L202,498 L195,502 L188,505 L180,508 L172,505 L165,500 
         L158,495 L152,488 L148,480 L145,472 L142,465 L140,458 
         L138,450 L135,442 L132,435 L128,428 L125,420 L122,412 
         L120,405 L118,398 L115,390 L112,382 L110,375 L108,368 
         L105,360 L102,352 L100,345 L98,338 L96,330 L95,322 
         L94,315 L92,308 L90,300 L88,292 L86,285 L84,278 
         L82,270 L80,262 L78,255 L76,248 L75,240 L78,232 
         L82,225 L88,218 L95,212 L100,205 L105,198 L108,190 
         L110,182 L108,175 L105,168 L102,160 L100,152 L98,145 
         L96,138 L95,130 L98,122 L102,115 L108,108 L115,102 
         L122,96 L128,90 L132,82 L135,75 L138,68 L142,60 
         L148,52 L155,45 L162,40 L170,36 L178,33 L185,30 
         L192,28 L200,30Z"
      fill="none"
      stroke="#D6AF36"
      strokeWidth="4"
      strokeOpacity="0.08"
      filter="url(#glow)"
    />

    {/* Sri Lanka */}
    <ellipse cx="250" cy="502" rx="14" ry="18" fill="#0F2D4F" stroke="#D6AF36" strokeWidth="0.8" strokeOpacity="0.4" />

    {/* Label: Arabian Sea */}
    <text x="60" y="340" fill="#ffffff" fillOpacity="0.08" fontSize="14" fontFamily="serif" fontStyle="italic" transform="rotate(-30, 60, 340)">Arabian Sea</text>

    {/* Label: Bay of Bengal */}
    <text x="340" y="320" fill="#ffffff" fillOpacity="0.08" fontSize="14" fontFamily="serif" fontStyle="italic" transform="rotate(20, 340, 320)">Bay of Bengal</text>

    {/* Label: Indian Ocean */}
    <text x="150" y="530" fill="#ffffff" fillOpacity="0.08" fontSize="14" fontFamily="serif" fontStyle="italic">Indian Ocean</text>

    {/* Glow filter */}
    <defs>
      <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
        <feGaussianBlur stdDeviation="3" result="blur" />
        <feMerge>
          <feMergeNode in="blur" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
    </defs>
  </svg>
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
            {/* SVG India Map */}
            <div className="w-full aspect-[10/11] relative">
              <IndiaSVG />
            </div>

            {/* Markers Overlay */}
            <div className="absolute inset-0">
              {filtered.map(marker => {
                const color = typeColors[marker.type];
                const isActive = activeMarker?.id === marker.id;
                return (
                  <button
                    key={marker.id}
                    className="absolute group"
                    style={{
                      left: `${marker.x}%`,
                      top: `${marker.y}%`,
                      transform: 'translate(-50%, -50%)',
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
                      className="relative block rounded-full border-2 border-white/80 shadow-lg transition-all duration-300 cursor-pointer"
                      style={{
                        backgroundColor: color,
                        width: isActive ? '14px' : '10px',
                        height: isActive ? '14px' : '10px',
                        boxShadow: isActive ? `0 0 16px ${color}90` : `0 0 6px ${color}60`,
                      }}
                    />
                    {/* Label on hover */}
                    {isActive && (
                      <span className="absolute left-1/2 -translate-x-1/2 -top-5 whitespace-nowrap text-[9px] sm:text-[10px] font-semibold px-1.5 py-0.5 rounded bg-black/70 text-white pointer-events-none">
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
                    transform: `translate(${tooltipPos.flipX ? 'calc(-100% - 12px)' : '12px'}, ${tooltipPos.flipY ? 'calc(-100% - 12px)' : '12px'})`,
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

            {/* Map Legend */}
            <div className="absolute bottom-3 left-3 sm:bottom-4 sm:left-4 bg-[#0B2240]/90 backdrop-blur-sm border border-white/10 rounded-lg px-3 py-2 sm:px-4 sm:py-3">
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
            <div className="absolute top-3 right-3 sm:top-4 sm:right-4 bg-[#D6AF36]/15 border border-[#D6AF36]/30 rounded-full px-3 py-1">
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