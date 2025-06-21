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

## 📚 API Endpoints

### Autenticación
- `POST /api/v1/auth/register/paciente` - Registro de pacientes
- `POST /api/v1/auth/register/medico` - Registro de médicos  
- `POST /api/v1/auth/login` - Inicio de sesión
- `POST /api/v1/auth/logout` - Cierre de sesión

### Red Médica
- `GET /api/v1/red/paciente/medicos` - Médicos del paciente (requiere ROLE_PACIENTE)
- `GET /api/v1/red/medico/pacientes` - Pacientes del médico (requiere ROLE_MEDICO)

### Gestión de Pacientes
- `POST /api/v1/pacientes/habitos` - Registrar hábitos diarios
- `GET /api/v1/pacientes/habitos` - Consultar hábitos
- `PUT /api/v1/pacientes/historia` - Actualizar historia clínica
- `GET /api/v1/pacientes/riesgo` - Calcular riesgo de salud

## 🔒 Seguridad

El sistema implementa múltiples capas de seguridad:
- Tokens JWT con expiración de 1 hora.
- Filtros de autenticación personalizados. 
- Control de acceso basado en roles con `@PreAuthorize`.
- Encriptación de contraseñas con BCrypt.
