# Sistema de Control de Asistencia - Diego López

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-blue.svg)

<p align="center">
  <img src="./public/vite.svg" alt="Sistema de Asistencia" width="100"/>
</p>

## Tabla de Contenidos

- [Acerca del Proyecto](#acerca-del-proyecto)
- [Características](#características)
- [Demo](#demo)
- [Primeros Pasos](#primeros-pasos)
  - [Requisitos Previos](#requisitos-previos)
  - [Instalación](#instalación)
- [Desarrollo Local](#desarrollo-local)
- [Construcción para Producción](#construcción-para-producción)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Tecnologías Utilizadas](#tecnologías-utilizadas)
- [Funcionalidades](#funcionalidades)
- [Contribuciones](#contribuciones)
- [Licencia](#licencia)
- [Contacto](#contacto)

## Acerca del Proyecto

¡Bienvenido al **Sistema de Control de Asistencia de Diego López**! Este es un sistema web moderno desarrollado con React, TypeScript, Vite y Tailwind CSS. Diseñado para gestionar eficientemente el control de asistencia, horarios, estudiantes y vehículos en instituciones educativas.

El sistema proporciona una interfaz intuitiva y responsive que permite a los administradores monitorear y gestionar todos los aspectos relacionados con la asistencia estudiantil de manera centralizada.

## Características

- **Dashboard Interactivo:** Panel principal con métricas y estadísticas en tiempo real
- **Gestión de Estudiantes:** CRUD completo para administrar información estudiantil
- **Control de Asistencia:** Registro y seguimiento detallado de asistencias
- **Gestión de Horarios:** Programación y administración de horarios académicos
- **Control de Vehículos:** Gestión de transporte estudiantil
- **Diseño Responsive:** Optimizado para todos los dispositivos (móvil, tablet y escritorio)
- **Interfaz Moderna:** UI/UX intuitiva con componentes reutilizables
- **TypeScript:** Desarrollo tipado para mayor robustez y mantenibilidad
- **Arquitectura Limpia:** Estructura modular y escalable

## Demo

Visita la demo en vivo del sistema: [http://localhost:5173](http://localhost:5173)

## Primeros Pasos

Sigue estas instrucciones para configurar y ejecutar el proyecto localmente en tu máquina.

### Requisitos Previos

- Node.js (versión 16 o superior)
- npm o yarn
- Git

### Instalación

1. **Clonar el Repositorio**

```bash
# Clonar el repositorio
git clone <url-del-repositorio>
cd diego_lopez_attendance

# Instalar dependencias
npm install
```

## Desarrollo Local

```bash
# Iniciar servidor de desarrollo
npm run dev
```

Esto lanzará la aplicación en modo desarrollo en [http://localhost:5173](http://localhost:5173).

## Construcción para Producción

```bash
# Generar build de producción
npm run build

# Previsualizar build
npm run preview

# Linting del código
npm run lint
```

## Estructura del Proyecto

```
diego_lopez_attendance/
├── public/                # Archivos estáticos
│   └── vite.svg          # Logo del proyecto
├── src/
│   ├── components/       # Componentes reutilizables
│   │   ├── Header.tsx    # Cabecera de la aplicación
│   │   ├── Sidebar.tsx   # Barra lateral de navegación
│   │   ├── Footer.tsx    # Pie de página
│   │   └── Layout.tsx    # Layout principal
│   ├── pages/           # Páginas principales
│   │   ├── Dashboard.tsx # Panel principal
│   │   ├── Students.tsx  # Gestión de estudiantes
│   │   ├── Attendance.tsx# Control de asistencia
│   │   ├── Schedule.tsx  # Gestión de horarios
│   │   ├── Hours.tsx     # Control de horas
│   │   └── Vehicles.tsx  # Gestión de vehículos
│   ├── hooks/           # Custom hooks
│   │   └── useAppData.ts # Hook para datos de la aplicación
│   ├── types/           # Definiciones de tipos TypeScript
│   │   └── index.ts     # Tipos principales
│   ├── utils/           # Utilidades y helpers
│   │   └── index.ts     # Funciones utilitarias
│   ├── data/            # Datos mock y configuración
│   │   └── mockData.ts  # Datos de prueba
│   ├── App.tsx          # Componente principal
│   ├── main.tsx         # Punto de entrada
│   └── index.css        # Estilos globales
├── tailwind.config.js   # Configuración de Tailwind CSS
├── postcss.config.js    # Configuración de PostCSS
├── vite.config.ts       # Configuración de Vite
├── tsconfig.json        # Configuración de TypeScript
└── package.json         # Dependencias y scripts
```

## Tecnologías Utilizadas

- **React 18:** Biblioteca para construir interfaces de usuario
- **TypeScript:** Superset tipado de JavaScript para mayor robustez
- **Vite:** Herramienta de construcción rápida para desarrollo web
- **Tailwind CSS:** Framework CSS utilitario para diseño responsive
- **React Router:** Navegación entre páginas
- **Custom Hooks:** Para lógica reutilizable y gestión de estado
- **ESLint:** Linting y análisis estático de código

## Funcionalidades

### 📊 Dashboard
- Métricas principales del sistema
- Estadísticas de asistencia
- Indicadores de progreso
- Reportes visuales

### 👥 Gestión de Estudiantes
- Registro de nuevos estudiantes
- Edición de información estudiantil
- Búsqueda y filtrado
- Gestión de estados (activo/inactivo)

### ✅ Control de Asistencia
- Registro de asistencias diarias
- Historial de asistencias
- Reportes de ausentismo
- Filtros por fecha y estudiante

### 📅 Gestión de Horarios
- Programación de clases
- Asignación de horarios
- Gestión de conflictos
- Vista calendario

### 🚌 Control de Vehículos
- Registro de vehículos de transporte
- Asignación de rutas
- Control de capacidad
- Seguimiento de estudiantes por vehículo

## Contribuciones

¡Las contribuciones son bienvenidas! Sigue estos pasos para contribuir:

1. **Haz un Fork del repositorio**
2. **Crea una rama para tu característica**
   ```bash
   git checkout -b feature/NuevaCaracteristica
   ```
3. **Realiza tus cambios**
4. **Haz commit de tus cambios**
   ```bash
   git commit -m "Añadir nueva característica"
   ```
5. **Envía tus cambios**
   ```bash
   git push origin feature/NuevaCaracteristica
   ```
6. **Abre un Pull Request**

## Licencia

Este proyecto está licenciado bajo la Licencia MIT - ver el archivo LICENSE para más detalles.

## Contacto

Desarrollado por: **Paul Realpe (DevPaul)**

- Email: co.devpaul@gmail.com
- Sitio web: [https://devpaul.pro](https://devpaul.pro)
- Portfolio: [https://devpaul-ed0bb.web.app](https://devpaul-ed0bb.web.app)

¡No dudes en contactarme para cualquier consulta o colaboración!

---

**Sistema de Control de Asistencia - Diego López** © 2024 - Desarrollado con ❤️ por DevPaul
