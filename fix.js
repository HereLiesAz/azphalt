const fs = require('fs');
let c = fs.readFileSync('apps/storefront/lib/catalog.ts', 'utf8');
const ditherPattern = /const DITHER_OLD: Omit<Manifest, "files"> = \{[\s\S]*?\};\n/g;
let i = 0;
c = c.replace(ditherPattern, (match) => {
    i++;
    return i === 1 ? match : '';
});
fs.writeFileSync('apps/storefront/lib/catalog.ts', c);
console.log('Fixed');
