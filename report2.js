const fs = require('fs');
const path = require('path');

const menuDataPath = path.join(process.cwd(), 'src', 'data', 'menuData.ts');
const content = fs.readFileSync(menuDataPath, 'utf8');

const regex = /name:\s*['"]([^'"]+)['"].*?image:\s*['"]([^'"]+)['"]/g;
let match;
let items = [];

while ((match = regex.exec(content)) !== null) {
  items.push({ name: match[1], image: path.basename(match[2]) });
}

let uniqueImages = new Set();
let uniqueItems = [];
let missingItems = [];

items.forEach(item => {
  if (!uniqueImages.has(item.image)) {
    uniqueImages.add(item.image);
    uniqueItems.push(item);
  } else {
    missingItems.push(item);
  }
});

let md = '# 📋 Platos con Fotos y Platos Faltantes\n\n';
md += 'Como tenemos 80 platos y me entregaste 43 fotos, tuve que repetir imágenes para que no quedara ningún plato vacío en la página. Aquí tienes el reporte dividido:\n\n';

md += '## 🔴 Platos que FALTAN (Tienen foto prestada/repetida)\n';
md += 'Estos son los 37 platos que actualmente están usando una foto prestada de otro plato. Para estos, idealmente nos harían falta sus propias fotografías:\n\n';
md += '| Plato / Bebida | Foto Prestada (Temporal) |\n';
md += '|---|---|\n';
missingItems.forEach(item => {
  md += '| ' + item.name + ' | `' + item.image + '` |\n';
});

md += '\n## 🟢 Platos con las 43 fotos (Asignadas al azar)\n';
md += 'Estos platos tienen asignada una de las 43 fotos que subiste. Ten en cuenta que **las asigne al azar** porque las fotos no tienen el nombre del plato, así que tendrás que decirme cuál foto corresponde realmente a cuál plato.\n\n';
md += '| Plato / Bebida | Archivo Asignado Actualmente |\n';
md += '|---|---|\n';
uniqueItems.forEach(item => {
  md += '| ' + item.name + ' | `' + item.image + '` |\n';
});

fs.writeFileSync('report.md', md);
