# 📝 Changelog - Configuración Vercel + Neon

Registro de cambios realizados para configurar el proyecto con Vercel y Neon Database.

---

## 🆕 Archivos Creados

### Configuración de Vercel

| Archivo | Descripción |
|---------|-------------|
| `frontend/vercel.json` | Configuración de despliegue del frontend en Vercel |
| `backend/vercel.json` | Configuración de despliegue del backend en Vercel |
| `.vercelignore` | Archivos a excluir en el deployment |

### Documentación

| Archivo | Descripción |
|---------|-------------|
| `DEPLOYMENT.md` | Guía completa paso a paso para desplegar en Vercel + Neon |
| `VERCEL_SETUP.md` | Guía rápida de despliegue (checklist ejecutivo) |
| `ENV_VARIABLES_TEMPLATE.md` | Template de todas las variables de entorno necesarias |
| `CHANGELOG_VERCEL.md` | Este archivo - registro de cambios |

### Scripts

| Archivo | Descripción |
|---------|-------------|
| `scripts/deploy.sh` | Script de ayuda con comandos útiles para deployment |

---

## ✏️ Archivos Modificados

### Backend

**`backend/prisma/schema.prisma`**
- ✅ Añadido `directUrl = env("DIRECT_URL")` para connection pooling de Neon
- ✅ Añadido `relationMode = "prisma"` para compatibilidad

**`backend/.env.example`**
- ✅ Actualizado `DATABASE_URL` con ejemplo de Neon (pooled connection)
- ✅ Añadido `DIRECT_URL` para migraciones directas

**`backend/package.json`**
- ✅ Modificado script `build`: Ahora ejecuta `prisma generate` antes del build
- ✅ Añadido script `vercel-build`: Para ejecutar migraciones en Vercel
- ✅ Añadido script `prisma:migrate:deploy`: Para migraciones en producción

### Frontend

**`frontend/.env.example`**
- ✅ Añadidos comentarios con URLs de producción de ejemplo
- ✅ Añadidas instrucciones para Vercel

### Documentación Principal

**`README.md`**
- ✅ Actualizada sección "Infraestructura" para reflejar uso de Vercel + Neon
- ✅ Añadidas referencias a guías de instalación y despliegue
- ✅ Actualizado prerequisito de base de datos (local o Neon)

**`INSTALLATION.md`**
- ✅ Añadida Opción B: Neon Database para instalación en cloud
- ✅ Añadido banner con referencia a guía de despliegue
- ✅ Aclarado que PostgreSQL local es para desarrollo

---

## 🔧 Cambios Técnicos Principales

### 1. Configuración de Prisma para Neon

**Antes:**
```prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}
```

**Después:**
```prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
  directUrl = env("DIRECT_URL")
  relationMode = "prisma"
}
```

**Razón:** Neon requiere dos URLs diferentes:
- `DATABASE_URL`: Pooled connection para queries (mejor performance)
- `DIRECT_URL`: Direct connection para migraciones (sin pgbouncer)

### 2. Scripts de Build para Vercel

**Backend `package.json` - Nuevo script:**
```json
"vercel-build": "prisma generate && prisma migrate deploy && nest build"
```

**Razón:** Este script:
1. Genera el Prisma Client
2. Ejecuta las migraciones pendientes
3. Compila el proyecto NestJS

### 3. Configuración de Vercel

**Frontend (`frontend/vercel.json`):**
```json
{
  "buildCommand": "npm run build",
  "framework": "nextjs",
  "regions": ["iad1"]
}
```

**Backend (`backend/vercel.json`):**
```json
{
  "builds": [{
    "src": "dist/main.js",
    "use": "@vercel/node"
  }],
  "routes": [{
    "src": "/(.*)",
    "dest": "dist/main.js"
  }]
}
```

---

## 🌐 Arquitectura de Despliegue

```
┌─────────────────────────────────────────────────────┐
│                     USUARIOS                         │
└─────────────────────────────────────────────────────┘
                          │
                          ├──────────────┬─────────────┐
                          │              │             │
                          ▼              ▼             ▼
              ┌──────────────┐  ┌──────────────┐  ┌──────────────┐
              │   FRONTEND   │  │   BACKEND    │  │   CDN/EDGE   │
              │   (Vercel)   │  │   (Vercel)   │  │   (Vercel)   │
              │              │  │              │  │              │
              │  Next.js 14  │◄─┤  NestJS      │  │  Static      │
              │  App Router  │  │  + Prisma    │  │  Assets      │
              └──────────────┘  └──────────────┘  └──────────────┘
                                        │
                                        │ Pool + Direct
                                        ▼
                              ┌──────────────────┐
                              │  NEON DATABASE   │
                              │   PostgreSQL     │
                              │   (Serverless)   │
                              └──────────────────┘
                                        │
                                        │ Managed by
                                        ▼
                              ┌──────────────────┐
                              │     PRISMA       │
                              │   Migrations     │
                              └──────────────────┘
```

### Flujo de Deployment:

1. **Push a GitHub** → Código actualizado en repositorio
2. **Vercel Webhook** → Detecta cambios automáticamente
3. **Build Backend** → Ejecuta `vercel-build`:
   - Genera Prisma Client
   - Ejecuta migraciones en Neon (usando `DIRECT_URL`)
   - Compila NestJS
4. **Build Frontend** → Compila Next.js
5. **Deploy** → Aplicación desplegada en edge locations
6. **Runtime** → Backend usa `DATABASE_URL` (pooled) para queries

---

## 🔐 Variables de Entorno Configuradas

### Frontend (9 variables)
- `NEXTAUTH_URL`
- `NEXTAUTH_SECRET`
- `NEXT_PUBLIC_API_URL`
- `GOOGLE_CLIENT_ID`
- `GOOGLE_CLIENT_SECRET`
- `APPLE_CLIENT_ID` (opcional)
- `APPLE_CLIENT_SECRET` (opcional)
- `NEXT_PUBLIC_APP_NAME`

### Backend (20+ variables)
- Database: `DATABASE_URL`, `DIRECT_URL`
- JWT: `JWT_SECRET`, `JWT_EXPIRATION`, `JWT_REFRESH_SECRET`, `JWT_REFRESH_EXPIRATION`
- OAuth: `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`, `GOOGLE_CALLBACK_URL`
- URLs: `FRONTEND_URL`, `BACKEND_URL`
- Email: `SENDGRID_API_KEY`, `SENDGRID_FROM_EMAIL`, `SENDGRID_FROM_NAME`
- WhatsApp: `TWILIO_ACCOUNT_SID`, `TWILIO_AUTH_TOKEN`, `TWILIO_WHATSAPP_NUMBER`
- Config: `APP_PORT`, `APP_ENV`, `THROTTLE_TTL`, `THROTTLE_LIMIT`

---

## ✅ Beneficios de esta Configuración

### 🚀 Performance
- **Connection Pooling**: Neon's pgbouncer para mejor manejo de conexiones
- **Edge Network**: Vercel despliega en múltiples regiones
- **Serverless**: Escala automáticamente según demanda

### 💰 Costo
- **Free Tier Generoso**: Ambos servicios tienen planes gratuitos
- **Pay-as-you-go**: Solo pagas por lo que usas
- **Sin infraestructura**: No necesitas mantener servidores

### 🔧 Mantenimiento
- **Deploys Automáticos**: Cada push a main despliega automáticamente
- **Migraciones Automáticas**: Se ejecutan en cada deploy
- **Backups Automáticos**: Neon hace backups diarios

### 🛡️ Seguridad
- **HTTPS por defecto**: Certificados SSL automáticos
- **Environment Variables**: Secrets seguros en Vercel
- **Connection Pooling**: Protección contra connection exhaustion
- **Rate Limiting**: Configurado en el backend

---

## 📊 Comparación: Antes vs Después

| Aspecto | Antes | Después |
|---------|-------|---------|
| **Database** | PostgreSQL local | Neon (serverless) |
| **Backend Deploy** | Manual | Automático (Vercel) |
| **Frontend Deploy** | Manual | Automático (Vercel) |
| **Migraciones** | Manual (`prisma migrate dev`) | Automáticas en deploy |
| **Scaling** | Manual | Automático |
| **SSL/HTTPS** | Configurar manualmente | Automático |
| **Costo inicial** | Hardware/VPS | $0 (free tier) |
| **CI/CD** | Configurar pipeline | Built-in |

---

## 🎯 Próximos Pasos Recomendados

### Inmediatos (Después del Deploy)
1. ✅ Configurar dominio personalizado en Vercel
2. ✅ Configurar SendGrid para emails
3. ✅ Verificar que todas las migraciones se ejecutaron

### Corto Plazo
1. ⏳ Configurar Vercel Analytics
2. ⏳ Añadir monitoring (Sentry, LogRocket)
3. ⏳ Configurar Twilio para WhatsApp
4. ⏳ Implementar CI/CD tests

### Medio Plazo
1. ⏳ Configurar backup strategy
2. ⏳ Implementar feature flags
3. ⏳ Añadir A/B testing
4. ⏳ Optimizar performance (Lighthouse)

---

## 📚 Documentación Relacionada

| Documento | Propósito |
|-----------|-----------|
| [README.md](README.md) | Overview del proyecto |
| [INSTALLATION.md](INSTALLATION.md) | Instalación local para desarrollo |
| [DEPLOYMENT.md](DEPLOYMENT.md) | Guía completa de despliegue |
| [VERCEL_SETUP.md](VERCEL_SETUP.md) | Guía rápida de despliegue |
| [ENV_VARIABLES_TEMPLATE.md](ENV_VARIABLES_TEMPLATE.md) | Template de variables de entorno |
| [ARQUITECTURA.md](ARQUITECTURA.md) | Arquitectura técnica del sistema |

---

## 🐛 Problemas Conocidos y Soluciones

### 1. Error: "Can't reach database server"
**Causa**: URLs de Neon incorrectas o sin `sslmode=require`  
**Solución**: Verificar que ambas URLs incluyan `?sslmode=require`

### 2. Migraciones no se ejecutan en Vercel
**Causa**: Falta `DIRECT_URL` o build command incorrecto  
**Solución**: Asegurar que build command sea `npm run vercel-build`

### 3. Error 500 en producción pero funciona local
**Causa**: Variables de entorno faltantes  
**Solución**: Verificar todas las env vars en Vercel Dashboard

### 4. NextAuth error en callback
**Causa**: `NEXTAUTH_URL` no configurado correctamente  
**Solución**: Debe ser la URL exacta del frontend (sin trailing slash)

---

## 📞 Soporte

- **Vercel Docs**: https://vercel.com/docs
- **Neon Docs**: https://neon.tech/docs
- **Prisma + Neon**: https://www.prisma.io/docs/guides/database/neon
- **Issues**: Abre un issue en el repositorio

---

**Última actualización**: Configuración inicial - 25 de octubre, 2025  
**Versión**: 1.0.0  
**Autor**: Sistema automatizado de configuración
