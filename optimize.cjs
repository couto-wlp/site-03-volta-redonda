const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const inputPath = 'C:\\Users\\WELLIS\\.gemini\\antigravity-ide\\brain\\c8fe3bb0-7722-4373-94e6-164c337fa03a\\media__1785204787942.jpg';
const outputDir = 'd:\\SITE 03 VOLTA REDONDA\\public\\images\\blog';
const outputPath = path.join(outputDir, 'preco-aluguel-cacamba-volta-redonda.webp');

if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
}

sharp(inputPath)
  .resize({ width: 800, withoutEnlargement: true })
  .webp({ quality: 60, effort: 6 })
  .toFile(outputPath)
  .then(info => {
    console.log(`Image optimized successfully. Size: ${(info.size / 1024).toFixed(1)} KB`);
  })
  .catch(err => {
    console.error('Error optimizing image:', err);
  });
