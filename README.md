# Sistema Integral de E-commerce y Gestión de Spa

Sistema completo de gestión y reservas para spa de lujo con frontend para clientes y backend de administración.

## 🚀 Características Principales

### Cliente (Frontend)
- Portal e-commerce de reservas
- Sistema de autenticación OAuth2 (Google, Apple, Email)
- Gestión de perfil y historial de reservas
- Sistema de referidos con código único
- Reviews y calificaciones
- Gift Cards digitales
- Wallet digital
- Notificaciones automáticas (WhatsApp + Email)

### Administración (Backend)
- Panel de empleados con calendario personal
- Dashboard de gerente con métricas completas
- CRM centralizado de clientes
- Gestión de inventario y recursos
- Módulo financiero completo
- Sistema de aprobación de reseñas
- Auditoría de cambios
- Reportes avanzados

## 📁 Estructura del Proyecto

```
spa-system/
├── frontend/          # Next.js + Tailwind CSS + shadcn/ui
├── backend/           # NestJS + PostgreSQL + Prisma
├── shared/            # Tipos y utilidades compartidas
└── docs/             # Documentación adicional
```

## 🛠️ Stack Tecnológico

### Frontend
- **Framework**: Next.js 14 (App Router)
- **Estilos**: Tailwind CSS
- **Componentes**: shadcn/ui
- **Iconos**: Lucide React
- **Autenticación**: NextAuth.js
- **Estado**: Zustand
- **Formularios**: React Hook Form + Zod

### Backend
- **Framework**: NestJS
- **Base de Datos**: PostgreSQL
- **ORM**: Prisma
- **Autenticación**: Passport + JWT
- **Validación**: class-validator
- **Documentación**: Swagger/OpenAPI

### Infraestructura
- **Deploy Frontend**: Vercel
- **Deploy Backend**: Vercel
- **Base de Datos**: Neon PostgreSQL (serverless)
- **Storage**: AWS S3 / Cloudinary
- **Email**: SendGrid
- **WhatsApp**: Twilio WhatsApp Business API

## 🚀 Inicio Rápido

> **📖 Para instalación local completa**, consulta [INSTALLATION.md](INSTALLATION.md)  
> **🚀 Para despliegue en producción (Vercel + Neon)**, consulta [DEPLOYMENT.md](DEPLOYMENT.md)

### Prerequisitos
- Node.js 18+
- PostgreSQL 14+ (local) o cuenta en [Neon](https://neon.tech)
- npm o yarn

### Instalación

1. **Clonar el repositorio**
```bash
git clone <repository-url>
cd spa-system
```

2. **Instalar dependencias del frontend**
```bash
cd frontend
npm install
```

3. **Instalar dependencias del backend**
```bash
cd ../backend
npm install
```

4. **Configurar variables de entorno**
```bash
# Frontend
cp frontend/.env.example frontend/.env.local

# Backend
cp backend/.env.example backend/.env
```

5. **Configurar base de datos**
```bash
cd backend
npx prisma migrate dev
npx prisma db seed
```

6. **Ejecutar en desarrollo**

Terminal 1 - Frontend:
```bash
cd frontend
npm run dev
```

Terminal 2 - Backend:
```bash
cd backend
npm run start:dev
```

## 🌐 URLs de Desarrollo

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:4000
- **API Docs**: http://localhost:4000/api/docs

## 📝 Variables de Entorno

### Frontend (.env.local)
```env
NEXT_PUBLIC_API_URL=http://localhost:4000
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
```

### Backend (.env)
```env
DATABASE_URL=postgresql://user:password@localhost:5432/spa_db
JWT_SECRET=your-jwt-secret
JWT_EXPIRATION=7d
SENDGRID_API_KEY=your-sendgrid-key
TWILIO_ACCOUNT_SID=your-twilio-sid
TWILIO_AUTH_TOKEN=your-twilio-token
TWILIO_WHATSAPP_NUMBER=whatsapp:+14155238886
```

## 🎯 Roadmap

- [x] Arquitectura base
- [x] Sistema de autenticación
- [ ] Módulo de reservas
- [ ] Sistema de pagos
- [ ] CRM completo
- [ ] Panel de administración
- [ ] Integraciones externas
- [ ] Sistema de reportes
- [ ] Multi-sucursal

## 📖 Documentación Adicional

Ver carpeta `/docs` para documentación detallada sobre:
- Arquitectura del sistema
- API Endpoints
- Modelos de base de datos
- Flujos de usuario
- Guías de deployment

## 🤝 Contribución

Por favor lee CONTRIBUTING.md para detalles sobre el proceso de desarrollo.

## 📄 Licencia

Este proyecto es privado y confidencial.

## 💬 Soporte

Para soporte técnico, contacta al equipo de desarrollo.
