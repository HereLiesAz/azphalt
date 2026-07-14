import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Link, useParams } from 'react-router-dom';
import { RepositoryClient } from '@azphalt/repository-client';
import type { PackageSummary } from '@azphalt/sdk';
import './index.css';

// Initialize the client pointing to our local mock backend
const client = new RepositoryClient({
  url: 'http://localhost:3000'
});

function Navbar() {
  return (
    <nav className="navbar">
      <div className="container">
        <Link to="/" className="brand">
          azphalt<span>.</span>
        </Link>
        <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
          <a href="#" className="btn btn-glass">Creators</a>
          <a href="#" className="btn btn-primary">Publish</a>
        </div>
      </div>
    </nav>
  );
}

function PackageCard({ pkg }: { pkg: PackageSummary }) {
  return (
    <Link to={`/package/${pkg.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
      <div className="glass-panel animate-fade-in" style={{ padding: '24px', height: '100%', display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <div>
          <h3 style={{ fontSize: '1.25rem', marginBottom: '4px' }}>{pkg.name}</h3>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>by {pkg.author || 'Unknown'}</p>
        </div>
        
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginTop: 'auto' }}>
          {pkg.types.map((t: string) => (
            <span key={t} className={`tag tag-${t}`}>{t}</span>
          ))}
          <span className="tag" style={{ marginLeft: 'auto' }}>v{pkg.version}</span>
        </div>
      </div>
    </Link>
  );
}

function Home() {
  const [packages, setPackages] = useState<PackageSummary[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    async function fetchPackages() {
      try {
        const res = await client.search({ q: search });
        setPackages(res.packages);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
    fetchPackages();
  }, [search]);

  return (
    <div className="container" style={{ padding: '60px 24px' }}>
      <div style={{ textAlign: 'center', marginBottom: '60px' }} className="animate-fade-in">
        <h1 style={{ fontSize: '4rem', marginBottom: '16px' }}>
          The <span style={{ color: 'var(--accent-primary)' }}>Open Standard</span><br/>for Creative Assets.
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '1.25rem', maxWidth: '600px', margin: '0 auto', marginBottom: '32px' }}>
          Discover thousands of AI models, video filters, LUTs, and shaders built for the azphalt ecosystem.
        </p>
        
        <div style={{ maxWidth: '500px', margin: '0 auto' }}>
          <input 
            type="text" 
            className="search-input" 
            placeholder="Search for models, transitions, shaders..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      <div style={{ marginBottom: '32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2 style={{ fontSize: '1.5rem' }}>Featured Packages</h2>
      </div>

      {loading ? (
        <div style={{ textAlign: 'center', padding: '40px', color: 'var(--text-muted)' }}>Loading...</div>
      ) : (
        <div className="grid-3">
          {packages.map((pkg, i) => (
            <div key={pkg.id} style={{ animationDelay: `${i * 0.1}s` }}>
              <PackageCard pkg={pkg} />
            </div>
          ))}
          {packages.length === 0 && (
            <div style={{ gridColumn: '1 / -1', textAlign: 'center', color: 'var(--text-muted)', padding: '40px' }}>
              No packages found.
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function PackageDetail() {
  const { id } = useParams();
  const [pkg, setPkg] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPackage() {
      try {
        const res = await client.getPackage(id!);
        setPkg(res);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
    fetchPackage();
  }, [id]);

  if (loading) return <div className="container" style={{ padding: '60px 24px' }}>Loading...</div>;
  if (!pkg) return <div className="container" style={{ padding: '60px 24px' }}>Package not found.</div>;

  return (
    <div className="container animate-fade-in" style={{ padding: '60px 24px' }}>
      <div className="glass-panel" style={{ padding: '40px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '32px' }}>
          <div>
            <h1 style={{ fontSize: '3rem', marginBottom: '8px' }}>{pkg.name}</h1>
            <p style={{ fontSize: '1.25rem', color: 'var(--text-secondary)' }}>{pkg.id} • v{pkg.version}</p>
          </div>
          <button className="btn btn-primary" style={{ fontSize: '1.1rem', padding: '12px 24px' }}>
            Install Package
          </button>
        </div>

        <div style={{ display: 'flex', gap: '12px', marginBottom: '32px' }}>
          <span className="tag">{pkg.license}</span>
          <span className="tag">{pkg.kind}</span>
        </div>

        <div style={{ borderTop: '1px solid var(--glass-border)', paddingTop: '32px' }}>
          <h3 style={{ marginBottom: '16px' }}>Assets Included</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {pkg.assets?.map((asset: any, i: number) => (
              <div key={i} className="glass-panel" style={{ padding: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <span className={`tag tag-${asset.type}`}>{asset.type}</span>
                  <span style={{ fontFamily: 'monospace', color: 'var(--text-secondary)' }}>
                    {asset.path || 'Remote Asset'}
                  </span>
                </div>
                {asset.remoteUrl && (
                  <a href={asset.remoteUrl} target="_blank" rel="noreferrer" style={{ color: 'var(--accent-blue)', fontSize: '0.9rem' }}>
                    View Remote URL ↗
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>

        <div style={{ borderTop: '1px solid var(--glass-border)', paddingTop: '32px', marginTop: '32px' }}>
          <h3 style={{ marginBottom: '16px' }}>Install via CLI</h3>
          <div style={{ background: 'rgba(0,0,0,0.5)', padding: '16px', borderRadius: '8px', fontFamily: 'monospace', color: 'var(--accent-blue)' }}>
            npx azphalt install {pkg.id}
          </div>
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/package/:id" element={<PackageDetail />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
