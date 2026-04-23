const fs = require('fs');
const path = require('path');
const https = require('https');

const logos = [
  { slug: 'google', color: '4285F4' },
  { slug: 'apple', color: '000000' },
  { slug: 'amazon', color: 'FF9900' },
  { slug: 'linkedin', color: '0A66C2' },
  { slug: 'salesforce', color: '00A1E0' },
  { slug: 'spotify', color: '1ED760' },
  { slug: 'airbnb', color: 'FF5A5F' },
  { slug: 'paypal', color: '00457C' },
  { slug: 'adobe', color: 'FF0000' },
  { slug: 'dropbox', color: '0061FF' },
  { slug: 'pinterest', color: 'E60023' },
  { slug: 'shopify', color: '95BF47' }
];

const dir = path.join(__dirname, 'public', 'images', 'logos');
if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir, { recursive: true });
}

logos.forEach(logo => {
  const url = `https://unpkg.com/simple-icons@10.4.0/icons/${logo.slug}.svg`;
  https.get(url, res => {
    let data = '';
    
    // Follow redirect if 302
    if (res.statusCode === 302 || res.statusCode === 301) {
      https.get(res.headers.location.startsWith('http') ? res.headers.location : 'https://unpkg.com' + res.headers.location, redirectRes => {
        let redirectData = '';
        redirectRes.on('data', chunk => redirectData += chunk);
        redirectRes.on('end', () => saveColoredSvg(logo, redirectData));
      });
      return;
    }

    res.on('data', chunk => data += chunk);
    res.on('end', () => saveColoredSvg(logo, data));
  });
});

function saveColoredSvg(logo, svgData) {
  // Add fill attribute to the SVG tag
  const coloredSvg = svgData.replace('<svg ', `<svg fill="#${logo.color}" `);
  fs.writeFileSync(path.join(dir, `${logo.slug}.svg`), coloredSvg);
  console.log(`Saved ${logo.slug}.svg with color #${logo.color}`);
}
