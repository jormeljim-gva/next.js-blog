# Next.js Blog

Blog desarrollado con **[Next.js](https://nextjs.org/)**, el framework de React para producción. Este documento explica qué es Next.js, por qué se usa en este proyecto y cómo está organizado.

---

## 📚 Índice

1. [¿Qué es Next.js?](#-qué-es-nextjs)
2. [¿Por qué Next.js para un blog?](#-por-qué-nextjs-para-un-blog)
3. [Conceptos clave](#-conceptos-clave)
4. [Estructura del proyecto](#-estructura-del-proyecto)
5. [Puesta en marcha](#-puesta-en-marcha)
6. [Scripts disponibles](#-scripts-disponibles)
7. [Despliegue](#-despliegue)
8. [Recursos](#-recursos)

---

## ❓ ¿Qué es Next.js?

Next.js es un framework de código abierto creado por **Vercel** que se construye sobre **React**. React se encarga de la interfaz; Next.js añade todo lo necesario para llevar una aplicación a producción:

- Enrutado integrado (sin librerías externas).
- Renderizado en servidor y generación estática.
- Optimización automática de imágenes, fuentes y scripts.
- API routes / Route Handlers para crear endpoints de backend.
- Soporte de TypeScript, CSS Modules y Tailwind listo para usar.

---

## 🎯 ¿Por qué Next.js para un blog?

| Necesidad del blog | Cómo lo resuelve Next.js |
|---|---|
| Buen posicionamiento en buscadores (SEO) | El HTML llega ya renderizado, y la API de *Metadata* gestiona títulos, descripciones y Open Graph |
| Carga rápida | Generación estática (SSG), *code splitting* automático y caché |
| Muchas páginas similares (un post = una página) | Rutas dinámicas como `[slug]` |
| Imágenes pesadas | Componente `<Image>` con redimensionado y *lazy loading* |
| Contenido que cambia de vez en cuando | ISR: regenerar páginas sin reconstruir todo el sitio |

---

## 🧩 Conceptos clave

### 1. Enrutado basado en archivos

Las carpetas dentro de `app/` (App Router) o `pages/` (Pages Router) **son** las rutas:

```
app/page.tsx              →  /
app/about/page.tsx        →  /about
app/blog/page.tsx         →  /blog
app/blog/[slug]/page.tsx  →  /blog/mi-primer-post
```

Los corchetes `[slug]` indican una **ruta dinámica**: una sola plantilla sirve para todos los posts.

> <!-- AJUSTAR: indica si el proyecto usa App Router (`app/`) o Pages Router (`pages/`) -->

### 2. Estrategias de renderizado

| Estrategia | Cuándo se genera el HTML | Uso típico en un blog |
|---|---|---|
| **SSG** (Static Site Generation) | En el *build* | Posts y páginas estáticas |
| **SSR** (Server-Side Rendering) | En cada petición | Contenido personalizado o muy dinámico |
| **ISR** (Incremental Static Regeneration) | En el *build* y se revalida cada cierto tiempo | Listado de posts que se actualiza |
| **CSR** (Client-Side Rendering) | En el navegador | Comentarios, buscadores, widgets |

Ejemplo de ruta dinámica con generación estática (App Router):

```tsx
// app/blog/[slug]/page.tsx
import { getAllPosts, getPostBySlug } from "@/lib/posts";

// Define qué posts se generan en el build
export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  return (
    <article>
      <h1>{post.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: post.content }} />
    </article>
  );
}
```

### 3. Server Components y Client Components

En el App Router, los componentes son **Server Components por defecto**: se ejecutan en el servidor y no envían JavaScript al navegador. Solo los que necesitan interactividad (estado, eventos) se marcan con `"use client"`.

### 4. SEO con Metadata

```tsx
export const metadata = {
  title: "Mi Blog",
  description: "Artículos sobre desarrollo web",
};
```

### 5. Optimización de imágenes

```tsx
import Image from "next/image";

<Image src="/portada.jpg" alt="Portada del post" width={800} height={400} />
```

### 6. Navegación sin recarga

```tsx
import Link from "next/link";

<Link href="/blog">Ver todos los posts</Link>
```

---

## 🗂️ Estructura del proyecto

```
next.js-blog/
├── app/                 # Rutas, layouts y páginas (App Router)
│   ├── layout.tsx       # Layout raíz (cabecera, pie, fuentes)
│   ├── page.tsx         # Página de inicio
│   └── blog/
│       ├── page.tsx     # Listado de posts
│       └── [slug]/
│           └── page.tsx # Detalle de un post
├── components/          # Componentes reutilizables
├── lib/                 # Funciones auxiliares (lectura de posts, utilidades)
├── posts/               # Contenido del blog (Markdown/MDX)
├── public/              # Archivos estáticos (imágenes, favicon)
├── next.config.js       # Configuración de Next.js
├── package.json
└── README.md
```

---

## 🚀 Puesta en marcha

### Requisitos

- [Node.js](https://nodejs.org/) (versión LTS recomendada)
- npm, yarn, pnpm o bun

### Instalación

```bash
# 1. Clonar el repositorio
git clone https://github.com/jormeljim-gva/next.js-blog.git
cd next.js-blog

# 2. Instalar dependencias
npm install

# 3. Arrancar el servidor de desarrollo
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) en el navegador. Los cambios se reflejan al instante (*Fast Refresh*).

---

## 🛠️ Scripts disponibles

| Comando | Descripción |
|---|---|
| `npm run dev` | Servidor de desarrollo con recarga en caliente |
| `npm run build` | Compila la aplicación para producción |
| `npm run start` | Arranca la versión compilada |
| `npm run lint` | Revisa el código con ESLint |

---

## ☁️ Despliegue

La forma más sencilla es **[Vercel](https://vercel.com/)**:

1. Sube el proyecto a GitHub.
2. Importa el repositorio en Vercel.
3. Vercel detecta Next.js y despliega automáticamente en cada `push`.

También puede desplegarse en Netlify, Cloudflare Pages, AWS, Docker o cualquier servidor con Node.js. Si el sitio es 100% estático, puede usar `output: "export"` en `next.config.js` y alojarse en GitHub Pages.

---

## 🔗 Recursos

- [Documentación oficial de Next.js](https://nextjs.org/docs)
- [Tutorial interactivo "Learn Next.js"](https://nextjs.org/learn)
- [Documentación de React](https://react.dev/)
- [Repositorio de Next.js en GitHub](https://github.com/vercel/next.js)

---
