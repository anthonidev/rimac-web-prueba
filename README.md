# RIMAC Seguros - Cotizador de Seguros de Salud

Aplicación web para cotización de seguros de salud, desarrollada como parte del desafío técnico de RIMAC Seguros.

## Descripción

Aplicación web moderna que permite a los usuarios cotizar seguros de salud de manera rápida e intuitiva. El sistema cuenta con un formulario de cotización en la página principal y una sección de selección de planes con precios diferenciados según el destinatario (para mí o para alguien más).

### Características principales:

- Formulario de cotización con validación en tiempo real
- Selección de planes con descuentos diferenciados
- Resumen detallado del plan seleccionado
- Diseño responsive (mobile-first)
- Animaciones sutiles para mejorar la experiencia de usuario
- Carousel para visualización de planes en dispositivos móviles

## Tecnologías y Librerías

### Core

- **Next.js 16.0.0** - Framework React con App Router
- **React 19.2.0** - Biblioteca de interfaz de usuario
- **TypeScript 5.x** - Tipado estático

### Gestión de Estado y Formularios

- **Zustand 5.0.8** - Gestión de estado global
- **React Hook Form 7.65.0** - Manejo de formularios
- **Zod 4.1.12** - Validación de esquemas
- **@hookform/resolvers 5.2.2** - Integración React Hook Form + Zod

### Estilos y UI

- **Sass 1.93.2** - Preprocesador CSS con módulos
- **Framer Motion 12.23.24** - Animaciones
- **Embla Carousel 8.6.0** - Carousel para móviles

### HTTP y Servicios

- **Axios 1.12.2** - Cliente HTTP

### Testing

- **Jest 30.2.0** - Framework de testing
- **Testing Library** - Testing enfocado en el usuario

## Requisitos Previos

- **Node.js**: versión 20.x o superior
- **npm**: versión 10.x o superior, **O**
- **Bun**: versión 1.x o superior

## Instalación

### 1. Clonar el repositorio

```bash
git clone <url-del-repositorio>
cd rimac-web
```

### 2. Instalar dependencias

**Opción A: Usando npm**

```bash
npm install
```

**Opción B: Usando Bun**

```bash
bun install
```

## Ejecución del Proyecto

### Modo Desarrollo

1. **Configurar variable de entorno**

Crear un archivo `.env.local` en la raíz del proyecto:

```env
NEXT_PUBLIC_API_URL=https://rimac-front-end-challenge.netlify.app
```

⚠️ **Importante**: Esta variable es requerida para que la aplicación funcione correctamente.

2. **Iniciar servidor de desarrollo**

**Usando npm:**

```bash
npm run dev
```

**Usando Bun:**

```bash
bun dev
```

La aplicación estará disponible en [http://localhost:3000](http://localhost:3000)

## Notas Importantes

### Arquitectura del Proyecto

El proyecto utiliza una **arquitectura basada en features** donde cada funcionalidad de negocio (home, plans) contiene sus propios componentes, hooks, tipos y utilidades. Esto facilita la escalabilidad y el mantenimiento.

```
src/
├── app/                 # Next.js App Router (rutas)
├── features/            # Features del negocio (home, plans)
├── shared/              # Componentes y utilidades compartidas
├── services/            # Servicios externos (API)
├── store/               # Estado global (Zustand)
└── styles/              # Estilos globales y variables
```

**Metodología CSS:**

El proyecto implementa **BEM (Block Element Modifier)** para nomenclatura de clases CSS junto con **SCSS Modules**:

- **Block**: Componente independiente (`.hero`, `.card`, `.button`)
- **Element**: Parte del componente (`.hero__title`, `.card__header`)
- **Modifier**: Variación del componente (`.button--primary`, `.card--recommended`)

Ejemplo:

```scss
.hero {
  &__container {
  } // Element
  &__title {
  } // Element
  &__image {
    &--desktop {
    } // Modifier
    &--mobile {
    } // Modifier
  }
}
```

Esto combinado con CSS Modules garantiza scope local y evita conflictos de nombres.

### Responsive Design

Diseño **mobile-first** con breakpoints:

- **Mobile**: < 768px (carousel para planes)
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px (grid de 3 columnas)

### Testing

```bash
# Ejecutar tests
npm test

# Tests en modo watch
npm run test:watch

# Reporte de cobertura
npm run test:coverage
```

### Accesibilidad

- Atributos ARIA en componentes interactivos
- Labels asociados a inputs
- Textos alternativos en imágenes

---

**Desarrollado como parte del desafío técnico de RIMAC Seguros**
