# Sistema de Control de Entradas y Salidas para el Almacen Comercial Jennifer

**Sistema web para la administración de inventarios, ventas, créditos y operaciones comerciales.**

## Descripción

AMC Jenny 2.0 es una evolución del Sistema de Gestión Comercial Jennifer, desarrollado con el objetivo de mejorar la organización y estructura del código, manteniendo el enfoque en la administración de las operaciones de un establecimiento comercial.

El proyecto está orientado a la gestión de productos, inventarios, ventas al contado y al crédito, clientes, proveedores, compras, personal y seguimiento de abonos.

Esta versión incorpora una estructura más modular, organizando el desarrollo en controladores, modelos, servicios, rutas y middlewares para facilitar la separación de responsabilidades y el mantenimiento del sistema.

## Funcionalidades principales

- **Gestión de productos:** administración de información de productos.
- **Control de inventario:** seguimiento de las existencias.
- **Gestión de ventas:** registro de operaciones comerciales.
- **Ventas al crédito:** administración de operaciones crediticias.
- **Control de abonos:** registro y seguimiento de pagos.
- **Gestión de clientes:** administración de información de clientes.
- **Administración de proveedores:** registro y gestión de proveedores.
- **Control de compras:** gestión de compras realizadas.
- **Gestión de colaboradores:** administración de información del personal.
- **Autenticación:** control de acceso al sistema.
- **Reportes:** módulos destinados a la consulta y generación de información comercial.

## Tecnologías utilizadas

| Tecnología | Uso |
|---|---|
| JavaScript | Lenguaje de programación |
| Node.js | Entorno de ejecución del servidor |
| Express.js | Framework para el desarrollo web |
| EJS | Motor de plantillas |
| MySQL | Base de datos relacional |
| HTML y CSS | Estructura y estilos de la interfaz |
| Git y GitHub | Control de versiones |

## Estructura del proyecto

```text
AMC-JENNY-2.0/
├── config/          # Configuración de base de datos
├── controllers/     # Controladores del sistema
├── env/             # Configuración local del entorno
├── middlewares/     # Funciones intermedias
├── models/          # Modelos de datos
├── pdf/             # Recursos relacionados con documentos PDF
├── public/          # Archivos estáticos
├── routes/          # Rutas organizadas por módulo
├── services/        # Servicios y lógica de aplicación
├── views/           # Vistas EJS
├── app.js           # Configuración e inicio del servidor
├── router.js        # Enrutador principal
├── package.json     # Dependencias y scripts
└── package-lock.json
```

## Organización del sistema

Una de las principales características de esta versión es la organización del código en diferentes componentes:

- **Routes:** definición de las rutas y endpoints.
- **Controllers:** manejo de solicitudes y respuestas.
- **Services:** organización de operaciones y lógica de aplicación.
- **Models:** acceso y manejo de datos.
- **Middlewares:** procesamiento intermedio de solicitudes.

Esta estructura busca facilitar la comprensión del proyecto y su mantenimiento.

## Desarrollo y aprendizajes

Este proyecto representa una evolución de mi experiencia en el desarrollo de aplicaciones web y sistemas de gestión empresarial.

Durante su desarrollo trabajé con tecnologías backend, bases de datos relacionales y una estructura de código organizada por responsabilidades.

Entre los conocimientos aplicados destacan:

- Desarrollo de aplicaciones web con Node.js y Express.
- Organización de rutas, controladores, servicios y modelos.
- Integración de aplicaciones con bases de datos MySQL.
- Implementación de operaciones CRUD.
- Manejo de autenticación y sesiones.
- Organización y mantenimiento del código.

## Estado del proyecto

**Proyecto académico / versión de evolución técnica.**

El sistema representa una etapa de mejora y reorganización del proyecto original. Puede contener funcionalidades pendientes de revisión y oportunidades de mejora.

---

**Desarrollador:** Kenneth Silva

**Formación:** Ingeniería en Computación

**Repositorio:** [AMC-JENNY-2.0](https://github.com/Kenth060/AMC-JENNY-2.0)
