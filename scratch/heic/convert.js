const fs = require('fs');
const path = require('path');
const convert = require('heic-convert');

const dir = 'C:\\Users\\Administrator\\Desktop\\fotos-instag';

async function main() {
  const files = fs.readdirSync(dir);
  let converted = 0;
  for (const file of files) {
    if (file.toLowerCase().endsWith('.heic')) {
      const inputBuffer = fs.readFileSync(path.join(dir, file));
      console.log(`Convirtiendo ${file}...`);
      try {
        const outputBuffer = await convert({
          buffer: inputBuffer,
          format: 'JPEG',
          quality: 0.9
        });
        const outName = file.replace(/\.heic$/i, '.jpg');
        fs.writeFileSync(path.join(dir, outName), outputBuffer);
        console.log(`Guardado ${outName}`);
        converted++;
      } catch (e) {
        console.error(`Error en ${file}:`, e.message);
      }
    }
  }
  console.log(`\n¡Listo! ${converted} fotos convertidas a JPG en la carpeta.`);
}

main().catch(console.error);
