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

## 📘 API Endpoints

## 🔐 Autenticación  
Ruta base: `/api/v1/auth`

### 📥 Registro de Paciente  
**POST** `/api/v1/auth/register/paciente`  
**Headers:**  
`Content-Type: application/json`  

**Body:**  
```json
{
  "nombre": "Juan",
  "apellido": "Pérez",
  "email": "juan.perez@email.com",
  "password": "password123",
  "dni": "12345678",
  "fechaNacimiento": "1990-05-15"
}
```

---

### 📥 Registro de Médico  
**POST** `/api/v1/auth/register/medico`  
**Headers:**  
`Content-Type: application/json`  

**Body:**  
```json
{
  "nombre": "María",
  "apellido": "García",
  "email": "maria.garcia@hospital.com",
  "password": "password123",
  "especialidad": "Cardiología"
}
```

---

### 🔑 Inicio de Sesión  
**POST** `/api/v1/auth/login?email=usuario@email.com&password=password123`

---

### 🔓 Cierre de Sesión  
**POST** `/api/v1/auth/logout`  
**Headers:**  
`Authorization: Bearer <token>`  

---

## 🏥 Gestión de Turnos  
Ruta base: `/api/v1/turnos`

### 📅 Solicitar Turno (Pacientes)  
**POST** `/api/v1/turnos`  
**Headers:**  
`Authorization: Bearer <paciente-token>`  
`Content-Type: application/json`  

**Body:**  
```json
{
  "medicoId": "675a1b2c3d4e5f6789012345",
  "fecha": "2024-01-15T10:00:00",
  "estado": "PENDIENTE",
  "recordatorioEnviado": false
}
```

---

### 📋 Ver Turnos del Paciente  
**GET** `/api/v1/turnos`  
**Headers:**  
`Authorization: Bearer <paciente-token>`

---

### ✅ Confirmar o Rechazar Turno (Médicos)  
**PUT** `/api/v1/turnos/{turnoId}/confirmar?confirmar=true`  
**Headers:**  
`Authorization: Bearer <medico-token>`

---

### 📋 Ver Turnos del Médico  
**GET** `/api/v1/turnos/medico`  
**Headers:**  
`Authorization: Bearer <medico-token>`

---

## 🌐 Red Médica  
Ruta base: `/api/v1/red`

### 🩺 Listar Médicos (para Pacientes)  
**GET** `/api/v1/red/paciente/medicos`  
**Headers:**  
`Authorization: Bearer <paciente-token>`  

---

### 🧍‍♂️ Listar Pacientes (para Médicos)  
**GET** `/api/v1/red/medico/pacientes`  
**Headers:**  
`Authorization: Bearer <medico-token>`  

---

## 📊 Dashboard  
Ruta base: `/api/v1/dashboard`

### 📈 Dashboard del Médico  
**GET** `/api/v1/dashboard/medico`  
**Headers:**  
`Authorization: Bearer <medico-token>`  

**Respuesta:**
```json
{
  "medicoId": "675a1b2c3d4e5f6789012345",
  "nombre": "Dr. García",
  "totalPacientes": 45,
  "pacientesRiesgoAlto": 3,
  "riesgoPromedio": "MEDIO",
  "promedioIMC": 24.5,
  "sintomasFrecuentes": ["dolor de cabeza", "fatiga"],
  "pacientes": [...],
  "otrosMedicosRelacionados": [...]
}
```

## 🔒 Seguridad

El sistema implementa múltiples capas de seguridad:
- Tokens JWT con expiración de 1 hora.
- Filtros de autenticación personalizados. 
- Control de acceso basado en roles con `@PreAuthorize`.
- Encriptación de contraseñas con BCrypt.
