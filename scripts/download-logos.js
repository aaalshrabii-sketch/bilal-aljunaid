const fs = require('fs');
const path = require('path');
const https = require('https');
const http = require('http');

const BRANDS_JSON_PATH = path.join(__dirname, '../src/data/brands.json');
const OUTPUT_DIR = path.join(__dirname, '../public/images/brands');

// Ensure destination directory exists
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

// Helper to derive domain from website, domain field, or brand name
function getDomain(brand) {
  if (brand.domain) {
    return brand.domain.replace(/^www\./, '').trim();
  }
  if (brand.website) {
    try {
      const url = new URL(brand.website);
      return url.hostname.replace(/^www\./, '').trim();
    } catch {
      // Fallback
    }
  }
  const cleanName = (brand.nameEn || brand.name || '')
    .toLowerCase()
    .replace(/[^a-z0-9]/g, '');
  return `${cleanName}.com`;
}

// Download image following HTTP/HTTPS redirects
function downloadImage(url, destPath, redirectDepth = 0) {
  if (redirectDepth > 5) {
    return Promise.reject(new Error('Too many redirects'));
  }

  return new Promise((resolve, reject) => {
    const parsedUrl = new URL(url);
    const protocol = parsedUrl.protocol === 'https:' ? https : http;

    const requestOptions = {
      hostname: parsedUrl.hostname,
      port: parsedUrl.port || (parsedUrl.protocol === 'https:' ? 443 : 80),
      path: parsedUrl.pathname + parsedUrl.search,
      method: 'GET',
      headers: {
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36',
        Accept: 'image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8',
      },
    };

    const req = protocol.request(requestOptions, (res) => {
      // Handle HTTP redirects (301, 302, 303, 307, 308)
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        let redirectUrl = res.headers.location;
        if (!redirectUrl.startsWith('http')) {
          redirectUrl = new URL(redirectUrl, parsedUrl.origin).href;
        }
        return downloadImage(redirectUrl, destPath, redirectDepth + 1)
          .then(resolve)
          .catch(reject);
      }

      if (res.statusCode !== 200) {
        return reject(new Error(`HTTP Status ${res.statusCode}`));
      }

      const fileStream = fs.createWriteStream(destPath);
      res.pipe(fileStream);

      fileStream.on('finish', () => {
        fileStream.close();
        resolve(true);
      });

      fileStream.on('error', (err) => {
        fs.unlink(destPath, () => {});
        reject(err);
      });
    });

    req.on('error', (err) => {
      fs.unlink(destPath, () => {});
      reject(err);
    });

    req.setTimeout(10000, () => {
      req.destroy();
      fs.unlink(destPath, () => {});
      reject(new Error('Request timeout'));
    });

    req.end();
  });
}

async function main() {
  console.log('🚀 Starting Automatic Brand Logo Downloader...\n');

  if (!fs.existsSync(BRANDS_JSON_PATH)) {
    console.error(`❌ Error: Could not find ${BRANDS_JSON_PATH}`);
    process.exit(1);
  }

  const rawData = fs.readFileSync(BRANDS_JSON_PATH, 'utf8');
  const brands = JSON.parse(rawData);

  console.log(`📌 Found ${brands.length} brand entries in brands.json\n`);

  const failedBrands = [];
  let successCount = 0;

  for (let i = 0; i < brands.length; i++) {
    const brand = brands[i];
    const brandId = brand.id || `brand-${i + 1}`;
    const domain = getDomain(brand);
    const filename = `${brandId}.png`;
    const destPath = path.join(OUTPUT_DIR, filename);

    // List of logo sources to attempt in order
    const sources = [
      { name: 'Clearbit API', url: `https://logo.clearbit.com/${domain}` },
      { name: 'IconHorse API', url: `https://icon.horse/icon/${domain}` },
      { name: 'Google Favicon (256px)', url: `https://www.google.com/s2/favicons?domain=${domain}&sz=256` },
      { name: 'Unavatar API', url: `https://unavatar.io/${domain}` },
    ];

    if (brand.logo && brand.logo.startsWith('http')) {
      sources.push({ name: 'Direct URL from JSON', url: brand.logo });
    }

    console.log(`[${i + 1}/${brands.length}] Processing "${brand.nameEn || brand.name}" (${domain})...`);

    let downloaded = false;

    for (const source of sources) {
      try {
        await downloadImage(source.url, destPath);
        console.log(`   ✅ Downloaded via ${source.name} -> public/images/brands/${filename}`);
        downloaded = true;
        break;
      } catch (err) {
        // Try next candidate
      }
    }

    if (downloaded) {
      successCount++;
      brand.logo = `/images/brands/${filename}`;
    } else {
      console.log(`   ❌ FAILED to download logo for "${brand.nameEn || brand.name}"`);
      failedBrands.push(brand);
    }

    // Small delay between requests
    await new Promise((res) => setTimeout(res, 350));
  }

  // Update brands.json with the updated local logo image paths
  fs.writeFileSync(BRANDS_JSON_PATH, JSON.stringify(brands, null, 2), 'utf8');
  console.log(`\n💾 Updated src/data/brands.json with local image paths.`);

  console.log('\n========================================');
  console.log(`🎉 Process Completed!`);
  console.log(`✅ Successfully downloaded logos: ${successCount}/${brands.length}`);

  if (failedBrands.length > 0) {
    console.log(`\n⚠️ Failed brands (${failedBrands.length}):`);
    failedBrands.forEach((b) => console.log(`   - ${b.nameEn || b.name} (ID: ${b.id || 'N/A'})`));
  }
  console.log('========================================\n');
}

main().catch((err) => {
  console.error('Fatal error running downloader:', err);
});
