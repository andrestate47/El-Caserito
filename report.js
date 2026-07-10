const fs = require('fs');
const path = require('path');

const menuDataPath = path.join(process.cwd(), 'src', 'data', 'menuData.ts');
const content = fs.readFileSync(menuDataPath, 'utf8');

// We'll extract items using a simple regex: name: "(.*?)".*?image: "(.*?)"
const regex = /name:\s*['"]([^'"]+)['"].*?image:\s*['"]([^'"]+)['"]/g;
let match;
let items = [];

while ((match = regex.exec(content)) !== null) {
  items.push({ name: match[1], image: path.basename(match[2]) });
}

let md = '# 📋 Reporte de Platos y Fotografías Asignadas\n\n';
md += 'Actualmente tenemos **' + items.length + '** platos/bebidas en la carta y solo **43** fotografías únicas. Para que el menú funcione sin repeticiones, las imágenes han sido recicladas.\n\n';
md += 'A continuación, la lista completa de todos los platos de la web y la foto exacta que se les ha asignado automáticamente. Para que un plato tenga su foto real correcta, deberás buscar en tu carpeta el nombre del archivo (ej. `IMG_5506.JPG`) y anotarlo junto al plato correspondiente.\n\n';

md += '| Plato / Bebida | Archivo Asignado Actualmente |\n';
md += '|---|---|\n';

items.forEach(item => {
  md += '| ' + item.name + ' | `' + item.image + '` |\n';
});

fs.writeFileSync('report.md', md);
