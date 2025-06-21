# VidaSana - Sistema de Gestión Médica

Sistema integral de gestión médica que conecta pacientes y médicos a través de una plataforma web con funcionalidades de seguimiento de salud, gestión de turnos y análisis de riesgos.

## 🚀 Características Principales

### 🔐 Autenticación y Autorización
- Sistema de autenticación JWT con roles diferenciados (PACIENTE/MEDICO).
- Registro y login seguro con encriptación de contraseñas.
- Control de acceso basado en roles con Spring Security.

### 🏥 Red Médica
- Gestión de relaciones médico-paciente usando Neo4j.
- Seguimiento automático de cantidad de turnos por relación médica.
- APIs REST para consultar conexiones médicas según rol.

### 📊 Seguimiento de Hábitos Diarios
- Registro de hábitos de sueño, alimentación y síntomas.
- Simulación de datos para pruebas y análisis.
- Historial completo por paciente.

### ⚕️ Gestión de Turnos
- Sistema completo de reserva y confirmación de turnos.
- Notificaciones automáticas por email.
- Recordatorios automáticos 24hs antes.

### 📈 Análisis de Riesgos
- Evaluación automática de riesgos de salud.
- Carga masiva de datos de prueba para análisis.

## 🛠️ Tecnologías Utilizadas

### Backend
- **Spring Boot 3.5.0** - Framework principal.
- **Java 17** - Lenguaje de programación.
- **Spring Security** - Autenticación y autorización.
- **JWT (JJWT)** - Tokens de autenticación.

### Bases de Datos
- **MongoDB** - Almacenamiento principal de datos.
- **Neo4j** - Base de datos de grafos para red médica.
- **Redis** - Cache y sesiones.

### Otras Herramientas
- **Lombok** - Reducción de código boilerplat.
- **Spring Mail** - Envío de emails.
- **Maven** - Gestión de dependencias.

## 📁 Estructura del Proyecto

```
src/main/java/vidasana/tpo/
├── auth/           # Autenticación y seguridad
├── habitos/        # Gestión de hábitos diarios
├── medicos/        # Gestión de médicos
├── pacientes/      # Gestión de pacientes
├── red/           # Red médica (Neo4j)
├── risk/          # Análisis de riesgos
├── turnos/        # Gestión de turnos
└── dashboard/     # Panel de control
```

## 🚀 Instalación y Configuración

### Prerrequisitos
- Java 17+
- Maven 3.6+
- MongoDB
- Neo4j
- Redis

### Configuración
1. Clona el repositorio
```bash
git clone https://github.com/Luciox214/vidasana.git
cd vidasana
```

2. Configura las bases de datos en `application.properties`

3. Ejecuta el proyecto
```bash
mvn spring-boot:run
```

## 📚 API Endpoints Principales

### 🔐 Autenticación (`/api/v1/auth`)
- **Registrar Paciente:** `POST /register/paciente`
- **Registrar Médico:** `POST /register/medico`
- **Iniciar Sesión:** `POST /login?email=...&password=...`
- **Cerrar Sesión:** `POST /logout` _(requiere token)_

---

### 🏥 Gestión de Turnos (`/api/v1/turnos`)
- **Solicitar Turno (paciente):** `POST /`
- **Ver Turnos (paciente):** `GET /`
- **Confirmar/Rechazar Turno (médico):** `PUT /{turnoId}/confirmar?confirmar=true`
- **Ver Turnos (médico):** `GET /medico`

---

### 🌐 Red Médica (`/api/v1/red`)
- **Listar Médicos (paciente):** `GET /paciente/medicos`
- **Listar Pacientes (médico):** `GET /medico/pacientes`

---

### 📊 Dashboard (`/api/v1/dashboard`)
- **Dashboard del Médico:** `GET /medico`



