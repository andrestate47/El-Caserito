# El Caserito

## Descripción
El Caserito es una aplicación web front-end de alta gama para un restaurante, enfocada en ofrecer una experiencia digital inmersiva, moderna y "premium". Resuelve la necesidad de tener una carta digital interactiva, presentaciones visuales atractivas y un portal elegante de reservas mediante el uso de tecnologías modernas, animaciones avanzadas, objetos 3D y scroll fluido.

## Estado
- **Estado actual:** En desarrollo (Frontend puro).
- **Última actualización:** Julio 2026.
- **Próximos pasos:** Integrar un backend completo (API/Base de datos) para gestionar las reservas, conectar la base de datos de los menús dinámicamente y realizar la optimización final de producción y SEO.

## Tecnologías
- Next.js (16.2)
- React (19.2)
- Tailwind CSS 4
- TypeScript
- Three.js (@react-three/fiber, @react-three/drei)
- Framer Motion
- GSAP
- Lenis (Smooth scrolling)
- Lucide React

## Arquitectura
Actualmente, el proyecto está estructurado como una aplicación **Frontend pura**.
- **Frontend:** Construido con Next.js App Router, usando tanto Server como Client Components. Contiene una alta carga de animaciones (GSAP/Framer Motion) y experiencias 3D para lograr una apariencia de alta gama (Premium UI).
- **Backend:** No implementado en este repositorio. Funciona de manera estática con datos de prueba (Mock Data).
- **Base de datos:** No está conectada actualmente. Los datos de la carta provienen de archivos locales estáticos (`src/data/menuData.ts`).
- **APIs:** No se consumen ni exponen APIs de momento en este código.
- **Servicios externos / Automatizaciones:** El frontend está preparado conceptualmente para integrarse en un ecosistema mayor (ej. integraciones con WhatsApp, flujos con Robotina y automatizaciones con n8n) como cliente visual.

## Estructura de Carpetas

- `/public`: Archivos estáticos como imágenes, favicon y recursos públicos del sitio.
- `/src/app`: Archivos de rutas principales de la aplicación bajo el modelo "App Router" de Next.js. Contiene `page.tsx` (Landing page), `layout.tsx` (Layout principal) y subrutas como `/menu` y `/reservas`.
- `/src/components`: Contiene todos los componentes reutilizables de UI. Están organizados para separar la lógica de presentación y las animaciones (como `HeroExperience.tsx`, `InteractiveMenuSection.tsx`, `PageTransition.tsx`).
- `/src/context`: Carpeta destinada a manejar el estado global de la aplicación, como la visibilidad de modales o manejo del flujo de usuarios.
- `/src/data`: Datos estáticos de prueba (Mock Data). Contiene el archivo `menuData.ts` para renderizar los platos sin depender de una base de datos.

## Instalación

Pasos para ejecutar el proyecto en tu entorno local desde cero:

1. **Requisitos**: Tener instalado Node.js (versión 18+) y npm.
2. **Instalación de dependencias**:
   ```bash
   npm install
   ```
3. **Variables de entorno**: No se requieren variables de entorno iniciales para levantar el frontend estático actual.
4. **Ejecución (Modo Desarrollo)**:
   ```bash
   npm run dev
   ```
5. **Migraciones y Seed**: No aplican (este repositorio no cuenta con ORM ni base de datos integrada).
6. **Build para Producción**:
   ```bash
   npm run build
   npm start
   ```

## Variables de entorno

*Nota: Actualmente el repositorio frontend no contiene un `.env` funcional puesto que carece de conexiones externas.* A continuación, se presenta la estructura que se usaría en caso de integrar el backend completo:

```env
# Backend & DB (Ejemplos futuros)
DATABASE_URL=
JWT_SECRET=

# APIs externas
NEXT_PUBLIC_API_URL=
OPENAI_API_KEY=
WHATSAPP_TOKEN=
```

## Base de datos

Actualmente, **no existe** una base de datos relacional (como PostgreSQL) ni un ORM (como Prisma) operando dentro de este código base. 

Toda la información del sistema se estructura mediante JSON / Objetos estáticos en `src/data/menuData.ts`.
Si se migra a base de datos, los modelos propuestos de Prisma serían:
- `Dish` (Plato)
- `Category` (Categoría del menú)
- `Reservation` (Reserva)
- `User` (Usuario/Cliente)

## Flujo del sistema

1. El usuario accede a la ruta principal `/` y experimenta una pantalla de introducción o "Splash Screen" (`EnvelopeIntro`).
2. Ingresa a la Landing Page, navegando por el **Hero** (que cuenta con experiencias en 3D e interacciones ricas de cursor).
3. Puede explorar secciones promocionales animadas como `EditorialSliderSection` y `InteractiveMenuSection`.
4. El usuario puede navegar a `/menu` para ver la carta completa y categorizada de los platillos.
5. El usuario puede dirigirse a la ruta `/reservas` para interactuar con la vista de agenda o los botones de llamada a la acción (WhatsApp/Integraciones externas).
6. Durante todos los cambios de rutas, el componente `PageTransition` actúa para mostrar una transición fluida y visualmente atractiva sin recarga brusca.

## APIs

El código en este repositorio **no expone** endpoints actualmente, ya que no se ha implementado el backend `/api` en Next.js. Toda la interactividad actual es en el cliente (Client-side rendering o Static generation).

### Ejemplos de APIs futuras
Método: `GET` | Ruta: `/api/menu` | Respuesta: Retornará un JSON con las categorías de los platillos.
Método: `POST` | Ruta: `/api/reservations` | Respuesta: Confirmará la creación de una reserva.

## Funcionalidades

- **Intro Animada:** Pantalla de entrada ("Envelope") con animaciones que desbloquean la web.
- **Scroll Suave (Smooth Scrolling):** Desplazamiento de inercia gestionado mediante Lenis para una percepción web premium.
- **Micro-interacciones Avanzadas:** Uso intensivo de hovers, sliders inmersivos y notificaciones con el estilo "Dynamic Island / Notch".
- **Visualizador Editorial:** Presentación de la carta mediante sliders y secciones animadas al hacer scroll (`InteractiveMenuSection`).
- **Reserva de Mesas:** Módulos e interfaces gráficas listas para recibir las lógicas de agenda y reserva de clientes.
- **Animaciones 3D:** Renderizado de contenido WebGL básico pero impactante usando Three.js en el canvas interactivo.

## Lógica importante

- **Manejo de Scroll (Lenis):** El flujo entero de la página depende de cómo el usuario se desplaza, lo que activa triggers de animación creados en `GSAP` (`ScrollTrigger`).
- **Transiciones entre páginas:** En una aplicación Next.js normal las páginas "brincan". Aquí se utiliza lógica envolvente con `Framer Motion` y `PageTransition.tsx` para interceptar la navegación y mostrar cortinas animadas de carga.
- **Client Components vs Server Components:** A pesar de ser Next 16 (App Router), la gran mayoría de componentes visuales de este sitio requieren ser `"use client"` por la cantidad de hooks, referencias (`useRef`), Three.js y manipulaciones del DOM de GSAP.

## Automatizaciones

No existen automatizaciones dentro de este repositorio de frontend. Cualquier automatización (como envío de WhatsApp tras una reserva o mensajes automáticos a través de Robotina) debe ser gestionada por un servicio backend u orquestador (como n8n) externo.

## IA

El código fuente actual de la web **no utiliza IA**, LLMs, vector databases ni RAG. (Esto queda a cargo del "cerebro" o backend que atienda a través de la herramienta *Robotina* que el usuario gestiona en paralelo).

## Seguridad

- Al no poseer base de datos, registro de usuarios ni procesamiento de pagos, los riesgos de seguridad en este proyecto son limitados a ataques estáticos de frontend típicos. 
- No contiene sistemas de roles ni autenticación actualmente. Todo el contenido web es público.

## Dependencias

- **`next` / `react` / `react-dom`:** Core del marco de desarrollo (Frontend Framework).
- **`@react-three/fiber` / `@react-three/drei` / `three`:** Creación de escenas 3D WebGL con sintaxis de componentes React.
- **`gsap`:** Librería estándar de la industria para animaciones complejas, secuencias (timelines) y activadores de scroll.
- **`framer-motion`:** Librería de animaciones ideal para React, usada para gestionar layouts declarativos y transiciones de páginas.
- **`lenis`:** Motor de smooth-scroll ligero para reemplazar el scrolling por defecto de los navegadores por uno cinemático y premium.
- **`lucide-react`:** Colección limpia y moderna de íconos en formato SVG utilizados en la UI.
- **`tailwindcss` / `@tailwindcss/postcss`:** Framework de estilos utilitarios (versión 4) para crear toda la interfaz gráfica de forma rápida.

## Problemas conocidos

- **Rendimiento:** Las aplicaciones con mucho GSAP y Three.js pueden presentar pérdida de cuadros por segundo (FPS) en dispositivos móviles de gama baja o antiguos.
- **Falta de Persistencia:** Los datos no persisten, cualquier reserva o acción realizada no se guarda en ningún lugar.

## Ideas futuras

- Integrar un panel de administración (Dashboard/CMS) donde los dueños de *El Caserito* puedan actualizar platos y precios sin necesidad de tocar código.
- Completar la integración del botón de reserva o WhatsApp con el sistema de automatización de "Robotina" y la API de Evolution / n8n.
- Migrar `menuData.ts` a una base de datos externa como PostgreSQL en Supabase, Vercel o un VPS gestionado.

## Pendientes

- [ ] Integrar el formulario de reserva funcional.
- [ ] Conectar la base de datos (Ej. Prisma + Postgres).
- [ ] Implementar webhooks (API Routes en Next) para recibir y gestionar llamadas del frontend en el backend general.
- [ ] Pruebas de QA sobre rendimiento (Lighthouse) evaluando impacto del WebGL y Lenis.

## Comandos útiles

```bash
# Servidor de desarrollo
npm run dev

# Compilar para entorno de producción (Generará archivos estáticos y/o la app)
npm run build

# Levantar servidor de producción
npm start

# Chequear errores de código (ESLint)
npm run lint
```

## Recursos

- Next.js Documentation: https://nextjs.org/docs
- Tailwind CSS: https://tailwindcss.com/
- GSAP Docs: https://gsap.com/docs/v3/
- React Three Fiber: https://docs.pmnd.rs/react-three-fiber
- Lenis Scroll: https://github.com/darkroomengineering/lenis

## Resumen para IA

Este es un repositorio centrado exclusiva y estrictamente en un proyecto "Frontend" para el restaurante "El Caserito". Se ha desarrollado usando Next.js v16.2 y React 19 bajo la arquitectura App Router. Está enfocado al 100% en estética "Premium UI", utilizando tecnologías de animación de alta gama como GSAP, Framer Motion y Lenis para scroll fluido, además de incorporar modelado básico o canvas 3D con Three.js (@react-three/fiber).

**NO CONTIENE:** Base de datos (ni Prisma, ni Postgres), automatizaciones (ni n8n, ni Robotina internamente), LLMs integrados, autenticación ni APIs conectadas. Todos sus datos provienen del archivo local de configuración de mock: `src/data/menuData.ts`. 

Su propósito actual es fungir como "la cara visible" (Interfaz de Usuario) para presentar de manera elegante la propuesta editorial, la carta interactiva y los llamados a la acción para hacer reservas en el restaurante. Cualquier automatización con servicios externos, IA o gestores de mensajería (WhatsApp/Instagram) son asumidos por otros repositorios, microservicios u orquestadores que el cliente gestiona por separado.

## Palabras clave
#react
#node
#postgres
#docker
#automatizacion
#robotina
#whatsapp
#nextjs
#frontend
#threejs
#gsap
#lenis
