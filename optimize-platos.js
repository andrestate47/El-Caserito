const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const dir = path.join(__dirname, 'public/platos-caserito');

fs.readdir(dir, async (err, files) => {
  if (err) throw err;
  
  const imgExts = ['.jpg', '.jpeg', '.png', '.JPG', '.HEIC'];
  const images = files.filter(f => imgExts.includes(path.extname(f)));
  
  console.log(`Found ${images.length} images to optimize.`);
  let count = 0;
  
  for (const file of images) {
    const filePath = path.join(dir, file);
    // Replace extension with webp, handle double extensions if any
    const baseName = path.basename(file, path.extname(file));
    const webpPath = path.join(dir, `${baseName}.webp`);
    
    try {
      const info = await sharp(filePath)
        .resize({ width: 1200, withoutEnlargement: true })
        .webp({ quality: 80 })
        .toFile(webpPath);
        
      console.log(`[${++count}/${images.length}] Optimized ${file} -> ${(info.size / 1024).toFixed(2)} KB`);
    } catch (err) {
      console.error(`Error processing ${file}:`, err.message);
    }
  }
});
