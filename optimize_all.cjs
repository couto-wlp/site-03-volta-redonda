const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const brainDir = 'C:\\Users\\WELLIS\\.gemini\\antigravity-ide\\brain\\c8fe3bb0-7722-4373-94e6-164c337fa03a';
const outputDir = 'd:\\SITE 03 VOLTA REDONDA\\public\\images\\blog';

const files = [
    { in: 'media__1785202099759.jpg', out: 'cacamba-barata-volta-redonda.webp' },
    { in: 'media__1785202487709.jpg', out: 'cacamba-homologada-volta-redonda.webp' },
    { in: 'media__1785202655140.jpg', out: 'coleta-entulho-volta-redonda.webp' },
    { in: 'media__1785202768548.jpg', out: 'coleta-gesso-drywall-volta-redonda.webp' },
    { in: 'media__1785202882768.jpg', out: 'coleta-jardinagem-podas-volta-redonda.webp' }
];

async function processImages() {
    for (const file of files) {
        const inputPath = path.join(brainDir, file.in);
        const outputPath = path.join(outputDir, file.out);
        
        try {
            // quality 60 and effort 6 (max compression effort) to reduce size without sacrificing too much visual quality
            const info = await sharp(inputPath)
                .resize({ width: 800, withoutEnlargement: true })
                .webp({ quality: 60, effort: 6 })
                .toFile(outputPath);
            
            console.log(`${file.out}: ${(info.size / 1024).toFixed(1)} KB`);
        } catch (err) {
            console.error(`Failed to process ${file.in}:`, err);
        }
    }
}

processImages();
