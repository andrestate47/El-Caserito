export interface MenuItem {
  name: string;
  description?: string;
  price: string;
  image?: string;
}

export interface MenuSubcategory {
  title: string;
  items: MenuItem[];
}

export interface MenuCategory {
  title: string;
  description: string;
  subcategories: MenuSubcategory[];
}

// Map generic placeholders based on category types
const imgDesayuno = "/images/arepa.webp";
const imgEnsalada = "/images/ensalada.webp";
const imgCarne = "/images/carne.webp";
const imgMar = "/images/restaurante.webp"; // Placeholder
const imgBebida = "/images/cafe.webp";
const imgPostre = "/images/restaurante.webp"; // Placeholder

export const menuData: Record<string, MenuCategory> = {
  "desayunos": {
    title: "Desayunos",
    description: "Comienza tu día con el auténtico sabor de casa, preparados al momento con ingredientes frescos.",
    subcategories: [
      {
        title: "Clásicos",
        items: [
          { name: "Americano", description: "Huevos al gusto, queso amarillo, tocineta, pan o arepitas.", price: "9", image: "/platos-caserito/huevos,tocino,arepas,jamon,queso.webp" },
          { name: "Criollo", description: "Carne mechada, huevos, caraotas, tajadas, quesito rallado y arepitas.", price: "10,5", image: "/images/platos/Pabelloncriollo.png" },
          { name: "Caserito", description: "Chicharrón de pescado, queso plancha, aguacate, tajadas y arepitas.", price: "10,5", image: "/platos-caserito/arepa,tajada,aguacate,chicharron,quesoasado+jugo.webp" },
          { name: "Los Potros", description: "Cochino en vara, aguacate, queso de mano y arepitas.", price: "10,5", image: "/platos-caserito/parrilla.webp" },
          { name: "Omelet al Gusto", description: "Acompañado de Arepitas o pan.", price: "7,5", image: "/platos-caserito/empanadas y arepas+jugo.webp" },
        ]
      },
      {
        title: "Especialidades",
        items: [
          { name: "Arepitas de mi Abuela", description: "Dúo de arepitas dulces rellenas de quesito blanco semiduro.", price: "5", image: "/platos-caserito/4arepas con queso.webp" },
          { name: "Trío de Empanaditas", description: "Carne mechada, queso, pollito o pescado.", price: "7", image: "/platos-caserito/empanadas3.webp" },
          { name: "Arepita de cochino rellena", description: "120gr de cochino con arepa asada.", price: "3,5", image: "/platos-caserito/empanadas2.webp" },
        ]
      },
      {
        title: "Bajo en Calorías",
        items: [
          { name: "Desayuno Fit", description: "Huevos a la plancha, aguacate, tocineta, pan integral o arepitas ﬁt.", price: "10,5", image: "/platos-caserito/cafe con leche.webp" },
          { name: "Plato Frutal", description: "Ensalada de frutas del día con yogurt y granola.", price: "8", image: "/platos-caserito/cafe con leche.webp" },
        ]
      }
    ]
  },
  "entradas-y-ensaladas": {
    title: "Entradas y Ensaladas",
    description: "Para compartir o empezar ligero, opciones frescas y llenas de sabor.",
    subcategories: [
      {
        title: "Entradas",
        items: [
          { name: "Tequeños (Ración)", price: "12", image: "/platos-caserito/empanadas.webp" },
          { name: "Carpaccio de Lomito", price: "14", image: "/platos-caserito/parrilla.webp" },
          { name: "Camarones al Ajillo", price: "12", image: "/platos-caserito/mariscos rebosados.webp" },
          { name: "Ceviche de Pescado", price: "12", image: "/platos-caserito/Casuela de marisco.webp" },
          { name: "Ceviche de Mariscos", price: "15", image: "/images/platos/cevichelangostinos.png" },
          { name: "Chicharrón de Pescado", price: "18", image: "/images/platos/ChicharronDePescado.png" },
          { name: "Langostinos al gusto", price: "16", image: "/images/platos/LangostinosAlAjillo.png" },
          { name: "Pisillo de la casa", price: "11", image: "/images/platos/Pisillo de la casa.png" },
        ]
      },
      {
        title: "Ensaladitas",
        items: [
          { name: "Caserito", price: "16", image: "/platos-caserito/ensalada cesar.webp" },
          { name: "Caprese", price: "18", image: "/platos-caserito/ensalada cesar.webp" },
          { name: "César Tradicional", price: "14", image: "/images/platos/CesarTradicional.png" },
          { name: "César con pollo", price: "20", image: "/images/platos/CesarConPollo.jpg" },
          { name: "César con camarón", price: "15", image: "/images/platos/CesarConCamarones.png" },
        ]
      }
    ]
  },
  "carnes-y-aves": {
    title: "Carnes y Aves",
    description: "Cortes de primera y preparaciones clásicas para los amantes de la buena carne y el pollo.",
    subcategories: [
      {
        title: "Carnes",
        items: [
          { name: "Lomito Caserito", description: "Medallones con camarones al ajillo.", price: "16", image: "/images/platos/LomitoEspecialCaserito.png" },
          { name: "Lomito al gusto", price: "18", image: "/platos-caserito/parrilla.webp" },
          { name: "Churrasco de solomo", price: "17", image: "/platos-caserito/varias parrillas.webp" },
          { name: "Punta en paila", price: "15", image: "/images/platos/PuntaEnPailaConPasta.png" },
        ]
      },
      {
        title: "Aves",
        items: [
          { name: "Pechuga de pollo a la plancha", price: "14", image: "/platos-caserito/milanesa pure.webp" },
          { name: "Milanesa a la parmesana", price: "25", image: "/images/platos/MilanesaALaParmesana.png" },
          { name: "Salteado de pollo", price: "18", image: "/platos-caserito/parrilla.webp" },
          { name: "Asopado de pollo", price: "18", image: "/platos-caserito/sopa de marisco.webp" },
          { name: "Nuggets de pollo", price: "14", image: "/platos-caserito/milanesa pure.webp" },
        ]
      },
      {
        title: "Contornos",
        items: [
          { name: "Guarniciones", description: "Arroz, tajadas, puré de papas, frijolitos.", price: "-", image: "/platos-caserito/parrilla.webp" },
        ]
      }
    ]
  },
  "del-mar": {
    title: "Del Mar",
    description: "Nuestros pescados y mariscos, frescos y preparados a tu gusto.",
    subcategories: [
      {
        title: "Frutos del mar",
        items: [
          { name: "Cazuela del Mar", price: "22", image: "/platos-caserito/Casuela de marisco.webp" },
          { name: "Canoa del mar", price: "22", image: "/platos-caserito/Casuela de marisco.webp" },
          { name: "Parrilla mar y tierra", price: "24", image: "/images/platos/MaryTierra.png" },
          { name: "Asopado de mariscos", price: "20", image: "/images/platos/AsopadodeMariscos.png" },
        ]
      },
      {
        title: "Pescados",
        items: [
          { name: "Churrasco de pescado al gusto", description: "Plancha, ajillo, menier.", price: "18", image: "/images/platos/ChurrascoDePescadoAlAjillo.png" },
          { name: "Milanesa de pescado con camarones", price: "25", image: "/platos-caserito/pescado frito.webp" },
          { name: "Pescado al vapor con vegetales", description: "Opción baja en calorías.", price: "22", image: "/platos-caserito/pescado frito.webp" },
        ]
      }
    ]
  },
  "arroz-y-pastas": {
    title: "Arroz y Pastas",
    description: "Recetas ricas, abundantes y con nuestra sazón secreta.",
    subcategories: [
      {
        title: "Arrocito",
        items: [
          { name: "Arroz marinera", price: "22", image: "/platos-caserito/arroz con marisco.webp" },
          { name: "Paella", price: "22", image: "/platos-caserito/paella.webp" },
          { name: "Arroz Caserito", price: "15", image: "/platos-caserito/arroz con marisco.webp" },
        ]
      },
      {
        title: "Pastas",
        items: [
          { name: "Caserito", price: "16", image: "/platos-caserito/huevos,tocino,arepas,jamon,queso.webp" },
          { name: "Bologna", price: "18", image: "/images/platos/Bologna.png" },
          { name: "Carbonara", price: "14", image: "/platos-caserito/pasta carbonara.webp" },
          { name: "Carbonara con pollo", price: "20", image: "/images/platos/CarbonaraConPollo.png" },
          { name: "Frutos del mar", price: "22", image: "/images/platos/Pasta marinera en salsa roja.png" },
          { name: "Pesto", price: "11", image: "/platos-caserito/pasta al pesto.webp" },
          { name: "Pasta de calabacín", description: "En salsa bologna (Bajo en calorías).", price: "16", image: "/platos-caserito/pastabechamel con mariscos.webp" },
        ]
      }
    ]
  },
  "bebidas-y-drinks": {
    title: "Bebidas y Drinks",
    description: "Desde un cafecito perfecto hasta cocteles para brindar.",
    subcategories: [
      {
        title: "Cafecitos",
        items: [
          { name: "Café Americano", price: "1 / 2", image: "/images/platos/cafe_americano.png" },
          { name: "Expresso", description: "Corto o Largo", price: "1,5 / 3", image: "/images/platos/cafe_expresso.png" },
          { name: "Guayoyo", price: "0,8 / 1,8", image: "/images/platos/cafe_guayoyo.png" },
          { name: "Marrón o con leche", price: "2", image: "/images/platos/cafe_con_leche.png" },
          { name: "Mocaccino", price: "3", image: "/images/platos/cafe_mocaccino.png" },
          { name: "Capuccino", price: "4", image: "/images/platos/CaféCapiccino.png" },
          { name: "Latte / Vainilla", price: "3,5", image: "/images/platos/cafe_latte.png" },
          { name: "Cortaito leche y leche", price: "3,5", image: "/images/platos/cafe_cortadito.png" },
          { name: "Frapuccino", price: "4", image: "/images/platos/cafe_frapuccino.png" },
        ]
      },
      {
        title: "Bebidas",
        items: [
          { name: "Jugos Naturales", price: "4", image: "/platos-caserito/sopa de marisco.webp" },
          { name: "Jugos Verdes", price: "5", image: "/platos-caserito/ensalada cesar.webp" },
          { name: "Toddy", price: "6", image: "/platos-caserito/ensalada cesar.webp" },
          { name: "Refrescos", description: "Lata o Retornable", price: "3 / 2,5", image: "/platos-caserito/ensalada cesar.webp" },
          { name: "Malta", price: "3", image: "/platos-caserito/ensalada cesar.webp" },
          { name: "Agua Gasiﬁcada", description: "355 ml o 600 ml", price: "2 / 2,5", image: "/platos-caserito/ensalada cesar.webp" },
          { name: "Agua Mineral", price: "4", image: "/platos-caserito/ensalada cesar.webp" },
          { name: "Infusiones", description: "Frías o Calientes", price: "3,5", image: "/platos-caserito/Pure carne camarones .webp" },
        ]
      },
      {
        title: "Drinks",
        items: [
          { name: "Mojitos", price: "5", image: "/platos-caserito/coctel_mojito_premium.png" },
          { name: "Margarita", price: "6", image: "/platos-caserito/varias parrillas.webp" },
          { name: "Piña Colada", price: "8", image: "/platos-caserito/parrilla.webp" },
          { name: "Moscow Mule", price: "10", image: "/platos-caserito/milanesa pure.webp" },
          { name: "Aperol Spritz", price: "8", image: "/platos-caserito/milanesa pure.webp" },
          { name: "Cuba libre", price: "8", image: "/platos-caserito/parrilla.webp" },
          { name: "Cerveza", price: "1,5", image: "/images/platos/drink_cerveza.png" },
          { name: "Jarra Tinto de Verano", price: "30", image: "/platos-caserito/milanesa pure.webp" },
          { name: "Vino Tinto / Blanco", description: "Copa o Botella", price: "5 / 25", image: "/platos-caserito/parrilla.webp" },
          { name: "Wisky 12 años", description: "Trago o Servicio", price: "7 / 60", image: "/platos-caserito/Casuela de marisco.webp" },
        ]
      }
    ]
  },
  "postres": {
    title: "Postres",
    description: "El toque dulce ideal para cerrar con broche de oro.",
    subcategories: [
      {
        title: "Nuestros Dulces",
        items: [
          { name: "Marquesas", description: "Chocolate / Limón", price: "6,5", image: "/images/platos/Marquesa.png" },
          { name: "Torta 3 Leches", price: "6,5", image: "/platos-caserito/varias parrillas.webp" },
          { name: "Brownie con helado", price: "8", image: "/platos-caserito/arroz con marisco.webp" },
        ]
      }
    ]
  }
};
