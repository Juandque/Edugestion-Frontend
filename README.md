# EduGestión - Web Frontend

Interfaz administrativa construida para una experiencia de usuario fluida y reactiva.

## Tecnologías
- **React 18 + TypeScript**
- **Tailwind CSS** (Estilos modernos y minimalistas)
- **React Hot Toast** (Notificaciones en tiempo real)
- **Nginx** (Servidor de producción dentro de Docker)

## Características
- **CRUD Completo:** Gestión de alumnos y materias.
- **Modales Reutilizables:** Misma interfaz para creación y edición.
- **Consumo de API:** Configurado mediante Axios con interceptores de error.

## Pasos para desplegar
- **Requisitos:** Debe tener docker y docker-compose instalados
- **Variables de entorno:** Use el archivo .env.template, transformelo en archivo .env, si cambia el valor de alguna variable tengalo en cuenta.
- **Levantar la interfaz:** `docker-compose up -d --build`
- **Back-end**El Sistema back-end debe estar funcionando, puede encontrarlo aqui: https://github.com/Juandque/Edugestion-Backend/tree/main
