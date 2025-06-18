# Proyecto Nuclear Front

Este proyecto es una aplicación web desarrollada en **Next.js** para la gestión y visualización de recursos TIC, aulas y auditorías en una institución educativa. Está diseñado para ofrecer una experiencia de usuario moderna, eficiente y responsiva, facilitando la administración de inventarios, asignación de aulas y seguimiento de cambios (auditoría).

---

## Tabla de Contenidos

- [Características](#características)
- [Arquitectura del Proyecto](#arquitectura-del-proyecto)
- [Estructura de Carpetas](#estructura-de-carpetas)
- [Instalación](#instalación)
- [Uso](#uso)
- [Scripts Disponibles](#scripts-disponibles)
- [Variables de Entorno](#variables-de-entorno)
- [Internacionalización (i18n)](#internacionalización-i18n)
- [Gestión de Estado y Hooks](#gestión-de-estado-y-hooks)
- [Estilos y Temas](#estilos-y-temas)
- [Buenas Prácticas y Patrones](#buenas-prácticas-y-patrones)
- [Despliegue](#despliegue)
- [Créditos y Reconocimientos](#créditos-y-reconocimientos)
- [Licencia](#licencia)

---

## Características

- **Gestión de recursos TIC:** Visualización y administración de proyectores, aires acondicionados, etc.
- **Gestión de aulas:** Consulta y asignación de aulas por número, capacidad, sede y tipo.
- **Auditoría:** Historial de cambios y registros clave en la plataforma.
- **Búsqueda y filtrado dinámico:** En recursos y aulas.
- **Interfaz intuitiva y responsiva:** Optimizada para diferentes dispositivos.
- **Internacionalización:** Soporte multilenguaje.
- **Integración con API REST:** Separación clara entre frontend y backend.
- **Componentización avanzada:** Reutilización de componentes para formularios, tarjetas, cabeceras, etc.

---

## Arquitectura del Proyecto

- **Frontend:** Next.js (React)
- **Lenguajes:** JavaScript (99%), CSS (1%)
- **Componentización:** Separación de lógica y presentación, uso intensivo de props, hooks y composición.
- **Datos:** Simulados/locales en archivos JS (puede integrarse con un backend real).
- **Internacionalización:** React-i18next.

---

## Estructura de Carpetas

```
src/
  app/
    aulas/                # Visualización y gestión de aulas
    recursos/             # Visualización y gestión de recursos TIC
    auditoria/            # Visualización del historial de auditoría
    components/           # Componentes reutilizables
      Classroom/          # Componentes para aulas
      resources/          # Componentes para recursos TIC
      common/             # Navbar, formularios, alerts, auditoría, etc.
    config/               # Configuración de APIs y constantes globales
    data/                 # Datos simulados (recursos, aulas, auditoría)
    services/             # Lógica de negocio (ej. aulasService.js)
    i18n.js               # Configuración de internacionalización
  public/                 # Recursos estáticos (imágenes, logos, etc.)
README.md
package.json
```

---

## Instalación

1. **Clona el repositorio:**
   ```bash
   git clone https://github.com/EliptikWu/proyectonuclearfront.git
   cd proyectonuclearfront
   ```

2. **Instala dependencias:**
   ```bash
   npm install
   # o
   yarn install
   # o
   pnpm install
   # o
   bun install
   ```

---

## Uso

1. **Levanta el servidor de desarrollo:**

   ```bash
   npm run dev
   # o
   yarn dev
   # o
   pnpm dev
   # o
   bun dev
   ```

2. **Abre [http://localhost:3000](http://localhost:3000) en tu navegador.**

3. **Navega por las páginas principales:**
   - `/aulas/visualizar` — Visualización y búsqueda de aulas.
   - `/recursos/visualizar` — Visualización y búsqueda de recursos TIC.
   - `/auditoria` — Visualización del historial de auditoría.
   - Formularios para crear/editar recursos y aulas.

---

## Scripts Disponibles

- `dev`: Inicia el servidor en modo desarrollo.
- `build`: Compila la aplicación para producción.
- `start`: Sirve la versión de producción.
- `lint`: Ejecuta el linter para mantener la calidad del código.

---

## Variables de Entorno

Configura las variables de entorno en un archivo `.env.local` si es necesario, por ejemplo para endpoints de la API.

---

## Internacionalización (i18n)

- Configuración con **react-i18next**.
- Archivos de traducción por idioma.
- Soporta textos dinámicos y estáticos en la interfaz.

---

## Gestión de Estado y Hooks

- Estado local con **React Hooks** (`useState`, `useEffect`).
- Paso de funciones y datos por props para comunicación entre componentes.
- Filtros y formularios con estado controlado.

---

## Estilos y Temas

- Estilos personalizados usando clases de utilidades (Tailwind CSS o CSS propio).
- Uso de variables CSS para temas (ej. colores institucionales).
- Componentes responsivos y adaptativos.

---

## Buenas Prácticas y Patrones

- **Componentización:** Cada entidad (aula, recurso, auditoría) tiene sus propios componentes de presentación y lógica.
- **Patrón lista-tarjeta:** Visualización de listas de entidades con tarjetas individuales.
- **Patrón container/presentational:** Separación de lógica y presentación.
- **Validación:** Formularios validados antes de enviar datos.
- **Delegación de eventos:** Callbacks pasados como props.
- **Mapeos de datos:** Adaptadores y helpers para transformar datos antes de mostrarlos.

---

## Despliegue

La forma más sencilla de desplegar es usando [Vercel](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme):

1. Haz login en Vercel y conecta tu repo.
2. Sigue el asistente para desplegar la app.
3. Consulta la [documentación de Next.js sobre despliegue](https://nextjs.org/docs/app/building-your-application/deploying) para detalles avanzados.

---

## Créditos y Reconocimientos

- Basado en [Next.js](https://nextjs.org).
- Inspirado por proyectos educativos para la gestión de recursos institucionales.
- Gracias a todos los contribuidores y testers.

---

## Licencia

Este proyecto está bajo licencia MIT. Consulta el archivo `LICENSE` para más detalles.

---
