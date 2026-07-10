const fs = require('fs');
const path = require('path');

const dataFile = path.join(__dirname, 'src/data/menuData.ts');
let content = fs.readFileSync(dataFile, 'utf8');

const mapping = {
  'DSCF0064.JPG': 'huevos,tocino,arepas,jamon,queso.webp', // Americano
  'DSCF0066.JPG': 'arepa,caraota,tajada,huevo,carnemechada.webp', // Criollo
  'DSCF0071.JPG': 'arepa,tajada,aguacate,chicharron,quesoasado+jugo.webp', // Caserito
  'DSCF0082.JPG': 'parrilla.webp', // Los Potros
  'DSCF0086.JPG': 'empanadas y arepas+jugo.webp', // Omelet
  'DSCF0087.JPG': '4arepas con queso.webp', // Arepitas
  'DSCF0094.JPG': 'trio.webp', // Trio empanaditas
  'DSCF0096.JPG': 'empanadas2.webp', // Arepita rellena
  'DSCF0102.JPG': 'cafe con leche.webp', // Desayuno fit (cafe for now)
  'DSCF0105.JPG': 'cafe con leche.webp', // Frutal
  'DSCF0109.JPG': 'empanadas.webp', // Tequeños
  'DSCF0116.JPG': 'parrilla.webp',
  'DSCF0119.JPG': 'mariscos rebosados.webp', // Camarones
  'DSCF0124.JPG': 'Casuela de marisco.webp', // Ceviche
  'IMG_5495.JPG': 'Casuela de marisco.webp', // Ceviche mariscos
  'IMG_5497.JPG': 'chicharron aceitunas .webp', // Chicharron pescado
  'IMG_5505.JPG': 'sopa de marisco.webp', 
  'IMG_5506.JPG': 'ensalada cesar.webp', 
  'IMG_5508.JPG': 'ensalada cesar.webp', // Caserito
  'IMG_5511.JPG': 'ensalada cesar.webp', // Caprese
  'IMG_5515.JPG': 'ensalada cesar.webp', // Cesar Tradicional
  'IMG_5527.JPG': 'ensalada cesar.webp', // Cesar con pollo
  'IMG_5533.JPG': 'ensalada cesar.webp', // Cesar con camaron
  'IMG_5536.JPG': 'Pure carne camarones .webp', // Lomito
  'IMG_5537.JPG': 'parrilla.webp', // Lomito al gusto
  'IMG_5567.JPG': 'varias parrillas.webp', // Churrasco
  'IMG_5571.JPG': 'parrilla.webp', // Punta
  'IMG_5581.JPG': 'milanesa pure.webp', // Pechuga
  'IMG_5584.JPG': 'milanesa pure.webp', // Milanesa
  'IMG_5589.JPG': 'parrilla.webp', // Salteado
  'IMG_5593.JPG': 'sopa de marisco.webp', // Asopado
  'IMG_5595.JPG': 'milanesa pure.webp', // Nuggets
  'IMG_5598.JPG': 'parrilla.webp', // Guarniciones
  'IMG_5604.JPG': 'Casuela de marisco.webp', // Cazuela
  'IMG_5608.JPG': 'Casuela de marisco.webp', // Canoa
  'IMG_5609.JPG': 'varias parrillas.webp', // Parrilla mar y tierra
  'IMG_5611.JPG': 'arroz con marisco.webp', // Asopado mariscos
  'IMG_5613.JPG': 'pescado frito.webp', // Churrasco pescado
  'IMG_5617.JPG': 'pescado frito.webp', // Milanesa pescado
  'IMG_5622.JPG': 'pescado frito.webp', // Pescado vapor
  'IMG_5626.JPG': 'arroz con marisco.webp', // Arroz marinera
  'IMG_5627.JPG': 'paella.webp', // Paella
  'IMG_5629.JPG': 'arroz con marisco.webp', // Arroz caserito
  // Replace the pasta placeholders with pasta images
  // Carbonara is DSCF0071.JPG in pastas section
  // Since we replace globally, it's safer to use regex with specific line context, but let's just do a generic replace first
};

for (const [oldImg, newImg] of Object.entries(mapping)) {
  content = content.split(`/images/platos/${oldImg}`).join(`/platos-caserito/${newImg}`);
}

// Fallback for any remaining IMG / DSCF
content = content.replace(/\/images\/platos\/IMG_[0-9]+\.JPG/g, '/platos-caserito/parrilla.webp');
content = content.replace(/\/images\/platos\/DSCF[0-9]+\.JPG/g, '/platos-caserito/cafe con leche.webp');

// Explicit overrides for pastas
content = content.replace('name: "Carbonara", price: "14", image: "/platos-caserito/arepa,tajada,aguacate,chicharron,quesoasado+jugo.webp"', 'name: "Carbonara", price: "14", image: "/platos-caserito/pasta carbonara.webp"');
content = content.replace('name: "Pesto", price: "11", image: "/platos-caserito/4arepas con queso.webp"', 'name: "Pesto", price: "11", image: "/platos-caserito/pasta al pesto.webp"');
content = content.replace('name: "Frutos del mar", price: "22", image: "/platos-caserito/empanadas y arepas+jugo.webp"', 'name: "Frutos del mar", price: "22", image: "/platos-caserito/pasta con marisco.webp"');
content = content.replace('name: "Pasta de calabacín", description: "En salsa bologna (Bajo en calorías).", price: "16", image: "/platos-caserito/trio.webp"', 'name: "Pasta de calabacín", description: "En salsa bologna (Bajo en calorías).", price: "16", image: "/platos-caserito/pastabechamel con mariscos.webp"');

fs.writeFileSync(dataFile, content, 'utf8');
console.log('Updated menuData.ts successfully');
