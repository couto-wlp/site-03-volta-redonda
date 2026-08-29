const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const publicDir = 'd:\\SITE 03 VOLTA REDONDA\\public';

async function run() {
  console.log('Optimizing images...');

  // 1. Hero image (LCP)
  if (fs.existsSync(path.join(publicDir, 'caminhao-cacamba.jpg'))) {
    await sharp(path.join(publicDir, 'caminhao-cacamba.jpg'))
      .resize({ width: 800, withoutEnlargement: true })
      .webp({ quality: 80, effort: 6 })
      .toFile(path.join(publicDir, 'caminhao-cacamba.webp'));
    console.log('Converted caminhao-cacamba.jpg -> caminhao-cacamba.webp');
  }

  // 2. Avatars
  const avatars = ['carlos', 'ana', 'rodrigo'];
  for (const name of avatars) {
    const pngPath = path.join(publicDir, 'images', `${name}.png`);
    if (fs.existsSync(pngPath)) {
      await sharp(pngPath)
        .resize({ width: 160, height: 160, fit: 'cover' })
        .webp({ quality: 80 })
        .toFile(path.join(publicDir, 'images', `${name}.webp`));
      console.log(`Converted images/${name}.png -> images/${name}.webp`);
    }
  }

  // 3. Service images (6m and 8m)
  for (const size of ['6m', '8m']) {
    const jpgPath = path.join(publicDir, `cacamba-${size}.jpg`);
    if (fs.existsSync(jpgPath)) {
      await sharp(jpgPath)
        .resize({ width: 600, withoutEnlargement: true })
        .webp({ quality: 80 })
        .toFile(path.join(publicDir, `cacamba-${size}.webp`));
      console.log(`Converted cacamba-${size}.jpg -> cacamba-${size}.webp`);
    }
  }

  console.log('Done optimizing site images!');
}

run().catch(console.error);
