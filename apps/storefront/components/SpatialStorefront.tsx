"use client";

import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform, useSpring, useAnimation } from 'framer-motion';
import type { PanInfo } from 'framer-motion';
import { Search, Box, Download, ArrowLeft, Layers, Fingerprint } from 'lucide-react';
import type { PackageSummary } from '@azphalt/registry';

// Advanced physics constants
const springConfig = { type: "spring" as const, stiffness: 400, damping: 30 };
const bouncySpring = { type: "spring" as const, stiffness: 500, damping: 20 };
const shudderTransition = { type: "spring" as const, stiffness: 2000, damping: 10, mass: 0.5 };

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

function DynamicPackageCard({ 
  pkg, 
  pointerX, 
  pointerY, 
  onClick,
  isPaid
}: { 
  pkg: PackageSummary, 
  pointerX: any, 
  pointerY: any, 
  onClick: () => void,
  isPaid?: boolean
}) {
  const ref = useRef<HTMLDivElement>(null);
  
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

  const smoothDistance = useSpring(distance, { stiffness: 200, damping: 30 });
  const scale = useTransform(smoothDistance, [0, 300], [1.05, 1]);
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
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <motion.h3 layoutId={`pkg-title-${pkg.id}`} className="pkg-title">{pkg.name}</motion.h3>
          {isPaid && <span className="tag paid">Paid</span>}
        </div>
        <motion.p layoutId={`pkg-author-${pkg.id}`} className="pkg-author">
          {pkg.author || 'Unknown Author'}
        </motion.p>
      </div>
    </motion.div>
  );
}

export function SpatialStorefront({ 
  forSale, 
  free 
}: { 
  forSale: PackageSummary[], 
  free: PackageSummary[] 
}) {
  const { x, y } = usePointer();
  const [search, setSearch] = useState('');
  const [selectedPkg, setSelectedPkg] = useState<PackageSummary | null>(null);
  const [themeColor, setThemeColor] = useState('var(--md-sys-color-background)');
  
  const searchControls = useAnimation();
  const installControls = useAnimation();

  useEffect(() => {
    if (selectedPkg) {
      const colors = ['#1a0f14', '#0f1a18', '#140f1a', '#1a180f'];
      setThemeColor(colors[selectedPkg.id.length % colors.length]);
    } else {
      setThemeColor('var(--md-sys-color-background)');
    }
  }, [selectedPkg]);

  const handleInstall = async () => {
    await installControls.start({
      scale: [1, 1.15, 0.9, 1.05, 1],
      transition: bouncySpring
    });
  };

  const handleDragEnd = (_event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    if (info.velocity.y > 500 || info.offset.y > 150) {
      setSelectedPkg(null);
    }
  };

  const backgroundTemplate = useTransform(
    [x, y],
    ([latestX, latestY]) => `radial-gradient(circle at ${latestX}px ${latestY}px, rgba(161, 200, 253, 0.05) 0%, transparent 400px)`
  );

  const filteredForSale = forSale.filter(p => p.name.toLowerCase().includes(search.toLowerCase()));
  const filteredFree = free.filter(p => p.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <motion.div 
      className="layout-root"
      animate={{ backgroundColor: themeColor }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
    >
      <motion.div 
        className="cursor-spotlight"
        style={{ background: backgroundTemplate as any }}
      />

      <nav className="navbar">
        <a href="/" className="brand">
          <Layers size={24} />
          azphalt storefront
        </a>
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
              <div className="category-item active">All</div>
              <div className="category-item">Paid Consignment</div>
              <div className="category-item">Free Registry</div>
            </div>
          </div>
        </div>

        <div className="layout-content">
          <div className="content-container">
            {filteredForSale.length > 0 && (
              <>
                <h2 className="section-title">For sale on consignment</h2>
                <div className="packages-grid">
                  {filteredForSale.map((pkg) => (
                    <DynamicPackageCard 
                      key={pkg.id} 
                      pkg={pkg} 
                      pointerX={x} 
                      pointerY={y} 
                      onClick={() => setSelectedPkg(pkg)}
                      isPaid={true}
                    />
                  ))}
                </div>
              </>
            )}

            {filteredFree.length > 0 && (
              <>
                <h2 className="section-title">Popular in the free registry</h2>
                <div className="packages-grid">
                  {filteredFree.map((pkg) => (
                    <DynamicPackageCard 
                      key={pkg.id} 
                      pkg={pkg} 
                      pointerX={x} 
                      pointerY={y} 
                      onClick={() => setSelectedPkg(pkg)}
                    />
                  ))}
                </div>
              </>
            )}
            
            {filteredForSale.length === 0 && filteredFree.length === 0 && (
              <div className="loading-state">No packages found.</div>
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
                  style={{ marginBottom: '24px' }}
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
                    <span className="tag tag-large">extension</span>
                  </div>
                  <motion.button 
                    animate={installControls}
                    className="btn btn-primary btn-large"
                    onClick={handleInstall}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Download size={20} /> Purchase / Install
                  </motion.button>
                </div>

                <div className="loading-state" style={{ marginTop: '24px' }}>
                  <p>Detailed assets and information will load here based on the registry API.</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
