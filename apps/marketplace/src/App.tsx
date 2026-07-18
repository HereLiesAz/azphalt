import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform, useSpring, useAnimation } from 'framer-motion';
import type { PanInfo } from 'framer-motion';
import { Search, Box, Download, ArrowLeft, Layers, Fingerprint } from 'lucide-react';
import { RepositoryClient } from '@azphalt/repository-client';
import type { PackageSummary } from '@azphalt/azdk';
import './index.css';

const client = new RepositoryClient({ url: 'http://localhost:3000' });

// Advanced physics constants
const springConfig = { type: "spring" as const, stiffness: 400, damping: 30 };
const bouncySpring = { type: "spring" as const, stiffness: 500, damping: 20 };
const shudderTransition = { type: "spring" as const, stiffness: 2000, damping: 10, mass: 0.5 };

// Custom hook for pointer tracking
function usePointer() {
  const x = useMotionValue(typeof window !== 'undefined' ? window.innerWidth / 2 : 0);
  const y = useMotionValue(typeof window !== 'undefined' ? window.innerHeight / 2 : 0);
  
  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    window.addEventListener('mousemove', handleMove);
    return () => window.removeEventListener('mousemove', handleMove);
  }, [x, y]);

  return { x, y };
}

// Package Card with proximity scaling and spotlight
function DynamicPackageCard({ 
  pkg, 
  pointerX, 
  pointerY, 
  onClick 
}: { 
  pkg: PackageSummary, 
  pointerX: any, 
  pointerY: any, 
  onClick: () => void 
}) {
  const ref = useRef<HTMLDivElement>(null);
  
  // Calculate distance from pointer to card center
  const distance = useMotionValue(1000);
  
  useEffect(() => {
    const updateDistance = () => {
      if (ref.current) {
        const rect = ref.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const dx = pointerX.get() - centerX;
        const dy = pointerY.get() - centerY;
        distance.set(Math.sqrt(dx * dx + dy * dy));
      }
    };
    const unsubscribeX = pointerX.on('change', updateDistance);
    const unsubscribeY = pointerY.on('change', updateDistance);
    return () => { unsubscribeX(); unsubscribeY(); };
  }, [pointerX, pointerY, distance]);

  // Spring smooth the distance
  const smoothDistance = useSpring(distance, { stiffness: 200, damping: 30 });
  
  // Scale up cards that are close to the pointer
  const scale = useTransform(smoothDistance, [0, 300], [1.05, 1]);
  // Lighten the border for cards near the pointer
  const borderOpacity = useTransform(smoothDistance, [0, 200], [0.8, 0.1]);

  return (
    <motion.div
      ref={ref}
      layoutId={`pkg-card-${pkg.id}`}
      onClick={onClick}
      style={{ scale }}
      whileHover={{ scale: 1.08, zIndex: 10 }}
      whileTap={{ scale: 0.95 }}
      className="package-card"
    >
      <motion.div 
        className="package-card-border-glow"
        style={{ opacity: borderOpacity }}
      />
      <div className="package-card-content">
        <motion.h3 layoutId={`pkg-title-${pkg.id}`} className="pkg-title">{pkg.name}</motion.h3>
        <motion.p layoutId={`pkg-author-${pkg.id}`} className="pkg-author">
          {pkg.author || 'Unknown Author'}
        </motion.p>
        <div className="pkg-tags">
          {pkg.types.map((t: string) => (
            <span key={t} className="tag">{t}</span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

function App() {
  const { x, y } = usePointer();
  const [packages, setPackages] = useState<PackageSummary[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selectedPkg, setSelectedPkg] = useState<PackageSummary | null>(null);
  const [pkgDetail, setPkgDetail] = useState<any>(null);
  const [themeColor, setThemeColor] = useState('var(--md-sys-color-background)');

  // Animation controls
  const searchControls = useAnimation();
  const installControls = useAnimation();

  useEffect(() => {
    let active = true;
    async function fetchPackages() {
      try {
        const res = await client.search({ q: search });
        if (active) setPackages(res.packages);
      } catch (e) {
        console.error(e);
        // Physics shudder
        searchControls.start({
          x: [0, -15, 15, -10, 10, -5, 5, 0],
          transition: shudderTransition
        });
      } finally {
        if (active) setLoading(false);
      }
    }
    fetchPackages();
    return () => { active = false; };
  }, [search, searchControls]);

  useEffect(() => {
    if (selectedPkg) {
      setPkgDetail(null);
      // Simulate ambient color extraction based on package (deterministic mock)
      const colors = ['#1a0f14', '#0f1a18', '#140f1a', '#1a180f'];
      setThemeColor(colors[selectedPkg.id.length % colors.length]);
      client.getPackage(selectedPkg.id).then(setPkgDetail).catch(console.error);
    } else {
      setThemeColor('var(--md-sys-color-background)');
    }
  }, [selectedPkg]);

  const handleInstall = async () => {
    // Physics swell
    await installControls.start({
      scale: [1, 1.15, 0.9, 1.05, 1],
      transition: bouncySpring
    });
  };

  const handleDragEnd = (_event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    // Dismiss if swiped down hard or dragged far down
    if (info.velocity.y > 500 || info.offset.y > 150) {
      setSelectedPkg(null);
    }
  };

  // Cursor spotlight background
  const backgroundTemplate = useTransform(
    [x, y],
    ([latestX, latestY]) => `radial-gradient(circle at ${latestX}px ${latestY}px, rgba(161, 200, 253, 0.05) 0%, transparent 400px)`
  );

  return (
    <motion.div 
      className="layout-root"
      animate={{ backgroundColor: themeColor }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
    >
      {/* Dynamic Cursor Spotlight */}
      <motion.div 
        className="cursor-spotlight"
        style={{ background: backgroundTemplate as any }}
      />

      <nav className="navbar">
        <div className="brand">
          <Layers className="icon" />
          azphalt
        </div>
        <button className="btn btn-surface">
          <Fingerprint size={16} /> Sign In
        </button>
      </nav>

      <div className="layout-main">
        <div className="layout-sidebar">
          <h3 className="sidebar-heading">Explorer</h3>
          <motion.div animate={searchControls}>
            <div style={{ position: 'relative' }}>
              <Search className="search-icon" />
              <input 
                type="text" 
                className="search-input" 
                placeholder="Search packages..." 
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </motion.div>
          
          <div style={{ marginTop: 24 }}>
            <h4 className="sidebar-heading">Categories</h4>
            <div className="category-list">
              {['All', 'AI Models', 'Video Effects', 'Audio', 'Shaders'].map(cat => (
                <div key={cat} className={`category-item ${cat === 'All' ? 'active' : ''}`}>
                  {cat}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="layout-content">
          <div className="content-container">
            <h2 className="section-title">Extensions</h2>
            
            {loading ? (
              <div className="loading-state">Loading...</div>
            ) : (
              <div className="packages-grid">
                {packages.map((pkg) => (
                  <DynamicPackageCard 
                    key={pkg.id} 
                    pkg={pkg} 
                    pointerX={x} 
                    pointerY={y} 
                    onClick={() => setSelectedPkg(pkg)}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <AnimatePresence>
        {selectedPkg && (
          <motion.div
            initial={{ opacity: 0, backdropFilter: 'blur(0px)' }}
            animate={{ opacity: 1, backdropFilter: 'blur(20px)' }}
            exit={{ opacity: 0, backdropFilter: 'blur(0px)' }}
            transition={{ duration: 0.4 }}
            className="hero-overlay"
            onClick={() => setSelectedPkg(null)}
          >
            <motion.div
              layoutId={`pkg-card-${selectedPkg.id}`}
              drag="y"
              dragConstraints={{ top: 0, bottom: 0 }}
              dragElastic={0.4}
              onDragEnd={handleDragEnd}
              className="hero-card"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="hero-header">
                <div className="hero-drag-handle" />
                <button 
                  className="btn btn-glass" 
                  onClick={() => setSelectedPkg(null)}
                >
                  <ArrowLeft size={16} /> Back
                </button>
                <motion.h3 layoutId={`pkg-title-${selectedPkg.id}`} className="hero-title">
                  {selectedPkg.name}
                </motion.h3>
                <motion.p layoutId={`pkg-author-${selectedPkg.id}`} className="hero-author">
                  {selectedPkg.author || 'Unknown Author'} • v{selectedPkg.version}
                </motion.p>
              </div>

              <div className="hero-body">
                <div className="hero-action-bar">
                  <div style={{ display: 'flex', gap: 12 }}>
                    <span className="tag tag-large">{selectedPkg.kind || 'extension'}</span>
                  </div>
                  <motion.button 
                    animate={installControls}
                    className="btn btn-primary btn-large"
                    onClick={handleInstall}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Download size={20} /> Install
                  </motion.button>
                </div>

                <h4 className="section-title" style={{ marginTop: 32 }}>Included Assets</h4>
                {!pkgDetail ? (
                  <div className="loading-state">Loading assets...</div>
                ) : (
                  <div className="asset-list">
                    {pkgDetail.assets?.map((asset: any, i: number) => (
                      <motion.div 
                        key={i} 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1, ...springConfig }}
                        className="asset-item"
                      >
                        <Box size={20} color="var(--md-sys-color-primary)" />
                        <span className="asset-path">{asset.path || 'Remote Resource'}</span>
                        <span className="tag asset-type">{asset.type}</span>
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default App;
