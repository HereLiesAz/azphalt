const fs = require('fs');
const { execSync } = require('child_process');
let c = fs.readFileSync('apps/storefront/lib/catalog.ts', 'utf8');

// 1. Remove duplicate DITHER_OLD
const first = c.indexOf('const DITHER_OLD');
const second = c.indexOf('const DITHER_OLD', first + 10);
if (second !== -1) {
  const end = c.indexOf('};', second) + 2;
  c = c.substring(0, second) + c.substring(end);
}

// 2. Insert cubeLut and svgSwatch
const old = execSync('git show 54b1432:apps/storefront/lib/catalog.ts').toString();
const cubeMatch = old.match(/function cubeLut[\s\S]*?\}\n/);
const svgMatch = old.match(/function svgSwatch[\s\S]*?\}\n/);

c = c.replace('function utf8(str: string): Uint8Array {', cubeMatch[0] + '\n' + svgMatch[0] + '\nfunction utf8(str: string): Uint8Array {');

// 3. Fix payments
c = c.replace(/const payments = new StripePaymentProvider\(\);/, 'const payments = process.env.NODE_ENV === "test" || !process.env.AZPHALT_STRIPE_SECRET_KEY ? new (require("@azphalt/registry").StubPaymentProvider)() : new StripePaymentProvider();');

fs.writeFileSync('apps/storefront/lib/catalog.ts', c);
console.log('Fixed everything');
