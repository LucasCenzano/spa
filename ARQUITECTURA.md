# Arquitectura del Sistema - Spa Management

## 📐 Visión General

Este sistema está diseñado como una aplicación monorepo que combina un frontend moderno con Next.js y un backend robusto con NestJS, utilizando PostgreSQL como base de datos.

```
┌─────────────────────────────────────────────────────────────┐
│                     CLIENTE (Browser)                        │
│                                                              │
│  ┌──────────────────────────────────────────────────────┐  │
│  │           Next.js Frontend (Port 3000)               │  │
│  │  ┌────────────┐  ┌────────────┐  ┌──────────────┐  │  │
│  │  │   Pages    │  │ Components │  │   Hooks      │  │  │
│  │  │  (Routes)  │  │   (UI)     │  │  (Logic)     │  │  │
│  │  └────────────┘  └────────────┘  └──────────────┘  │  │
│  │         │              │                 │          │  │
│  │         └──────────────┴─────────────────┘          │  │
│  │                        │                             │  │
│  │                   API Client                         │  │
│  └────────────────────────┼───────────────────────────────┘
│                            │                             │
└────────────────────────────┼─────────────────────────────┘
                             │ HTTP/REST
                             │
┌────────────────────────────▼─────────────────────────────┐
│              NestJS Backend (Port 4000)                   │
│  ┌──────────────────────────────────────────────────┐   │
│  │                 Controllers                       │   │
│  │  ┌─────┐ ┌─────┐ ┌─────┐ ┌─────┐ ┌─────┐       │   │
│  │  │Auth │ │User │ │Book │ │Serv │ │Admin│  ...  │   │
│  │  └──┬──┘ └──┬──┘ └──┬──┘ └──┬──┘ └──┬──┘       │   │
│  └─────┼───────┼───────┼───────┼───────┼───────────┘   │
│        │       │       │       │       │                │
│  ┌─────▼───────▼───────▼───────▼───────▼───────────┐   │
│  │                   Services                        │   │
│  │           (Business Logic Layer)                  │   │
│  └─────┬──────────────────────────────────┬─────────┘   │
│        │                                   │             │
│  ┌─────▼──────────┐              ┌────────▼─────────┐   │
│  │ Prisma Service │              │ External APIs    │   │
│  │  (ORM Layer)   │              │ (SendGrid/Twilio)│   │
│  └─────┬──────────┘              └──────────────────┘   │
│        │                                                 │
└────────┼─────────────────────────────────────────────────┘
         │
┌────────▼──────────┐
│   PostgreSQL      │
│    Database       │
└───────────────────┘
```

## 🏗️ Estructura del Proyecto

```
spa-system/
├── frontend/                    # Next.js Application
│   ├── src/
│   │   ├── app/                # App Router (Next.js 14)
│   │   │   ├── (auth)/        # Rutas de autenticación
│   │   │   ├── (admin)/       # Panel de administración
│   │   │   ├── servicios/     # Catálogo de servicios
│   │   │   ├── reservas/      # Sistema de reservas
│   │   │   └── perfil/        # Perfil de usuario
│   │   ├── components/         # Componentes React
│   │   │   ├── ui/            # Componentes base (shadcn/ui)
│   │   │   ├── layout/        # Layout components
│   │   │   ├── home/          # Componentes de home
│   │   │   └── forms/         # Formularios
│   │   ├── lib/               # Utilidades y helpers
│   │   ├── hooks/             # Custom React hooks
│   │   ├── types/             # TypeScript types
│   │   └── styles/            # Estilos globales
│   └── public/                # Assets estáticos
│
├── backend/                    # NestJS Application
│   ├── src/
│   │   ├── main.ts            # Entry point
│   │   ├── app.module.ts      # Root module
│   │   ├── prisma/            # Prisma service
│   │   ├── auth/              # Autenticación
│   │   │   ├── strategies/   # JWT, Google OAuth
│   │   │   ├── guards/       # Auth guards
│   │   │   └── dto/          # Data transfer objects
│   │   ├── users/             # Gestión de usuarios
│   │   ├── services/          # Servicios del spa
│   │   ├── bookings/          # Sistema de reservas
│   │   ├── reviews/           # Reseñas y calificaciones
│   │   ├── employees/         # Gestión de empleados
│   │   ├── admin/             # Panel de administración
│   │   ├── notifications/     # Email y WhatsApp
│   │   ├── gift-cards/        # Gift cards digitales
│   │   ├── promotions/        # Sistema de promociones
│   │   ├── inventory/         # Control de inventario
│   │   └── analytics/         # Reportes y métricas
│   └── prisma/
│       ├── schema.prisma      # Database schema
│       ├── migrations/        # DB migrations
│       └── seed.ts           # Datos de ejemplo
│
└── shared/                     # Código compartido
    ├── types/                 # TypeScript types compartidos
    └── constants/             # Constantes compartidas
```

## 🔄 Flujo de Datos

### 1. Autenticación (OAuth2 + JWT)

```
Cliente → Google OAuth → Backend → JWT Token → Cliente
   │                         │
   └─────────────────────────┴──> Todas las requests futuras incluyen JWT
```

### 2. Crear Reserva

```
1. Cliente selecciona servicio y horario
2. Frontend valida disponibilidad (API call)
3. Cliente completa formulario
4. Backend valida y crea reserva
5. Backend envía notificaciones (Email + WhatsApp)
6. Frontend muestra confirmación
```

### 3. Sistema de Referidos

```
Usuario A (Referidor)
   │
   ├─> Genera código único (ABC123)
   │
   └─> Comparte código
              │
Usuario B ────┴──> Registra con código
              │
              ├──> Sistema valida código
              │
              └──> Otorga beneficios a ambos
```

## 🗄️ Modelo de Base de Datos

### Entidades Principales

```
Users (Clientes, Empleados, Managers)
  ├─> EmployeeProfile (si es empleado)
  ├─> Bookings (reservas realizadas)
  ├─> Reviews (reseñas escritas)
  ├─> GiftCards (compradas)
  └─> WalletTransactions (historial de wallet)

Services (Servicios del spa)
  ├─> ServiceAddOns (complementos)
  └─> Bookings (reservas de este servicio)

Bookings (Reservas)
  ├─> User (cliente)
  ├─> Service (servicio reservado)
  ├─> Employee (terapeuta asignado)
  └─> Review (reseña asociada)

Reviews (Reseñas)
  ├─> User (autor)
  ├─> Booking (reserva asociada)
  └─> Status (pending/approved/rejected)
```

### Relaciones Clave

- **User → Bookings**: One-to-Many (un usuario puede tener múltiples reservas)
- **Service → Bookings**: One-to-Many (un servicio puede tener múltiples reservas)
- **Booking → Review**: One-to-One (una reserva puede tener una reseña)
- **User → User**: Self-referencing (sistema de referidos)

## 🔐 Seguridad

### Autenticación

```typescript
// JWT Strategy
1. Cliente hace login
2. Backend valida credenciales
3. Backend genera JWT (access + refresh tokens)
4. Cliente almacena tokens (httpOnly cookies)
5. Todas las requests incluyen token en header
```

### Autorización (RBAC)

```
Roles:
├─ CLIENT: Acceso básico (reservar, ver perfil)
├─ EMPLOYEE: + Gestionar calendario personal
├─ MANAGER: + Administración completa
└─ ADMIN: + Configuración del sistema

Guards:
├─ JwtAuthGuard: Verifica que el usuario esté autenticado
├─ RolesGuard: Verifica que el usuario tenga el rol necesario
└─ OwnershipGuard: Verifica que el recurso pertenezca al usuario
```

## 🔌 APIs Externas

### SendGrid (Email)
- Confirmaciones de reserva
- Recordatorios
- Newsletters
- Recuperación de contraseña

### Twilio (WhatsApp)
- Notificaciones instantáneas
- Recordatorios 24h antes
- Confirmaciones de pago

### Google OAuth
- Login social
- Registro simplificado

## 📊 Optimizaciones

### Frontend

```typescript
// React Query para caché
const { data: services } = useQuery('services', fetchServices, {
  staleTime: 5 * 60 * 1000, // 5 minutos
  cacheTime: 10 * 60 * 1000, // 10 minutos
});

// Lazy loading de componentes
const AdminPanel = dynamic(() => import('./AdminPanel'));

// Image optimization
<Image src="/spa.jpg" width={800} height={600} priority />
```

### Backend

```typescript
// Database indexing
@@index([email])
@@index([date, status])

// Query optimization
include: { user: true, service: true } // Eager loading

// Caching
@CacheKey('services')
@CacheTTL(300) // 5 minutos
```

## 🚀 Escalabilidad

### Horizontal Scaling

```
Load Balancer
    │
    ├──> Frontend Instance 1 (Vercel Edge)
    ├──> Frontend Instance 2
    └──> Frontend Instance N
    
    ├──> Backend Instance 1 (Railway)
    ├──> Backend Instance 2
    └──> Backend Instance N
         │
         └──> PostgreSQL (Primary + Read Replicas)
```

### Vertical Scaling

- Database connection pooling (Prisma)
- Redis para caché (futuro)
- CDN para assets estáticos
- Background jobs para tareas pesadas

## 📈 Monitoreo y Logging

```typescript
// Logging structure
{
  timestamp: '2024-01-01T10:00:00Z',
  level: 'info',
  module: 'BookingsService',
  action: 'create',
  userId: 'uuid',
  metadata: { /* ... */ }
}

// Métricas clave
- Tiempo de respuesta API
- Tasa de errores
- Uso de recursos (CPU, RAM)
- Reservas por día
- Ingresos totales
```

## 🧪 Testing Strategy

```
Unit Tests: Servicios y utilidades individuales
Integration Tests: Flujos completos (crear reserva, login)
E2E Tests: Playwright para flujos críticos de usuario
```

## 📱 Responsive Design

```
Mobile-first approach
├─ Mobile: < 768px (Stack vertical, menú hamburguesa)
├─ Tablet: 768px - 1024px (Grid 2 columnas)
└─ Desktop: > 1024px (Grid 3-4 columnas, sidebar)
```

## 🔄 CI/CD Pipeline

```
GitHub Push
    │
    ├──> Run Tests
    │
    ├──> Build Frontend (Vercel)
    │
    ├──> Build Backend (Railway)
    │
    └──> Deploy to Production
```

Esta arquitectura está diseñada para ser mantenible, escalable y fácil de extender con nuevas funcionalidades.
