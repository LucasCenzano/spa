# 🚀 Guía de Despliegue - Vercel + Neon Database

Esta guía te llevará paso a paso para desplegar tu aplicación de spa en Vercel usando Neon como base de datos PostgreSQL.

## 📋 Requisitos Previos

- Cuenta en [Vercel](https://vercel.com)
- Cuenta en [Neon](https://neon.tech)
- Cuenta en [GitHub](https://github.com) (para conectar el repositorio)
- Tu código subido a un repositorio de GitHub

---

## 🗄️ Paso 1: Configurar Neon Database

### 1.1 Crear Proyecto en Neon

1. Ve a [console.neon.tech](https://console.neon.tech)
2. Haz clic en **"New Project"**
3. Configura tu proyecto:
   - **Name**: `spa-db` (o el nombre que prefieras)
   - **Region**: Selecciona la más cercana (ej: `US East (Ohio)`)
   - **Postgres Version**: 16 (recomendado)
4. Haz clic en **"Create Project"**

### 1.2 Obtener Connection Strings

Después de crear el proyecto, verás dos tipos de connection strings:

1. **Pooled connection** (para tu aplicación)
   ```
   postgresql://user:password@ep-xxxxx.us-east-2.aws.neon.tech/neondb?sslmode=require&pgbouncer=true
   ```

2. **Direct connection** (para migraciones)
   ```
   postgresql://user:password@ep-xxxxx.us-east-2.aws.neon.tech/neondb?sslmode=require
   ```

**⚠️ IMPORTANTE**: Guarda ambas URLs, las necesitarás en el siguiente paso.

---

## 📦 Paso 2: Preparar el Repositorio

### 2.1 Subir Código a GitHub

Si aún no has subido tu código a GitHub:

```bash
cd /Users/lucascenzano/Documents/SyL

# Inicializar git (si no está inicializado)
git init

# Añadir todos los archivos
git add .

# Hacer commit
git commit -m "Initial commit - Sistema de Spa"

# Crear repositorio en GitHub y conectarlo
# Ve a github.com y crea un nuevo repositorio
# Luego ejecuta:
git remote add origin https://github.com/tu-usuario/tu-repositorio.git
git branch -M main
git push -u origin main
```

### 2.2 Verificar Archivos de Configuración

Asegúrate de que estos archivos existan en tu repositorio:

✅ `/frontend/vercel.json`
✅ `/backend/vercel.json`
✅ `/backend/prisma/schema.prisma` (configurado para Neon)
✅ `.gitignore` (debe incluir `.env` y `.env.local`)

---

## 🎨 Paso 3: Desplegar Frontend en Vercel

### 3.1 Importar Proyecto Frontend

1. Ve a [vercel.com/dashboard](https://vercel.com/dashboard)
2. Haz clic en **"Add New..."** → **"Project"**
3. Selecciona tu repositorio de GitHub
4. En **"Configure Project"**:
   - **Framework Preset**: Next.js
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build` (por defecto)
   - **Output Directory**: `.next` (por defecto)
   - **Install Command**: `npm install` (por defecto)

### 3.2 Configurar Variables de Entorno del Frontend

En la sección **"Environment Variables"**, añade:

```env
# NextAuth
NEXTAUTH_URL=https://tu-proyecto.vercel.app
NEXTAUTH_SECRET=genera_un_secret_seguro_aqui

# API Backend (lo configuraremos después)
NEXT_PUBLIC_API_URL=https://tu-backend.vercel.app

# Google OAuth (si lo usas)
GOOGLE_CLIENT_ID=tu-google-client-id
GOOGLE_CLIENT_SECRET=tu-google-client-secret

# Apple OAuth (si lo usas)
APPLE_CLIENT_ID=tu-apple-client-id
APPLE_CLIENT_SECRET=tu-apple-client-secret

# App Configuration
NEXT_PUBLIC_APP_NAME=Spa de Lujo
```

**💡 Tip**: Para generar un `NEXTAUTH_SECRET` seguro:
```bash
openssl rand -base64 32
```

### 3.3 Desplegar Frontend

1. Haz clic en **"Deploy"**
2. Espera a que termine el build (2-3 minutos)
3. Una vez completado, obtendrás una URL como: `https://tu-proyecto.vercel.app`
4. **Guarda esta URL**, la necesitarás para configurar el backend

---

## ⚙️ Paso 4: Desplegar Backend en Vercel

### 4.1 Importar Proyecto Backend

1. En Vercel, haz clic en **"Add New..."** → **"Project"**
2. Selecciona el **mismo repositorio** de GitHub
3. En **"Configure Project"**:
   - **Framework Preset**: Other
   - **Root Directory**: `backend`
   - **Build Command**: `npm run vercel-build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`

### 4.2 Configurar Variables de Entorno del Backend

En la sección **"Environment Variables"**, añade:

```env
# Database (Neon) - IMPORTANTE: Usa las URLs que guardaste en el Paso 1
DATABASE_URL=postgresql://user:password@ep-xxxxx.aws.neon.tech/neondb?sslmode=require&pgbouncer=true
DIRECT_URL=postgresql://user:password@ep-xxxxx.aws.neon.tech/neondb?sslmode=require

# JWT Secrets
JWT_SECRET=genera_un_jwt_secret_super_seguro
JWT_EXPIRATION=7d
JWT_REFRESH_SECRET=genera_un_refresh_secret_diferente
JWT_REFRESH_EXPIRATION=30d

# OAuth - Google
GOOGLE_CLIENT_ID=tu-google-client-id
GOOGLE_CLIENT_SECRET=tu-google-client-secret
GOOGLE_CALLBACK_URL=https://tu-backend.vercel.app/auth/google/callback

# URLs
FRONTEND_URL=https://tu-proyecto.vercel.app
BACKEND_URL=https://tu-backend.vercel.app

# SendGrid (Email)
SENDGRID_API_KEY=tu-sendgrid-api-key
SENDGRID_FROM_EMAIL=noreply@tudominio.com
SENDGRID_FROM_NAME=Spa de Lujo

# Twilio (WhatsApp) - Opcional
TWILIO_ACCOUNT_SID=tu-twilio-sid
TWILIO_AUTH_TOKEN=tu-twilio-token
TWILIO_WHATSAPP_NUMBER=whatsapp:+14155238886
TWILIO_PHONE_NUMBER=+1234567890

# App Configuration
APP_PORT=4000
APP_ENV=production

# Rate Limiting
THROTTLE_TTL=60
THROTTLE_LIMIT=100
```

**⚠️ IMPORTANTE**: 
- Reemplaza `DATABASE_URL` y `DIRECT_URL` con tus URLs de Neon del Paso 1
- Genera secrets seguros para JWT usando `openssl rand -base64 32`
- Actualiza `FRONTEND_URL` con la URL de tu frontend del Paso 3

### 4.3 Desplegar Backend

1. Haz clic en **"Deploy"**
2. Espera a que termine el build (3-5 minutos)
3. **Durante el build, Prisma ejecutará las migraciones automáticamente**
4. Una vez completado, obtendrás una URL como: `https://tu-backend.vercel.app`

---

## 🔄 Paso 5: Actualizar Referencias Cruzadas

### 5.1 Actualizar Frontend con URL del Backend

1. Ve a tu proyecto frontend en Vercel
2. Ve a **Settings** → **Environment Variables**
3. Edita `NEXT_PUBLIC_API_URL` con la URL del backend: `https://tu-backend.vercel.app`
4. Haz clic en **"Save"**
5. Ve a **Deployments** y haz **"Redeploy"**

### 5.2 Actualizar Callbacks de OAuth

Si usas Google OAuth:

1. Ve a [Google Cloud Console](https://console.cloud.google.com)
2. Selecciona tu proyecto
3. Ve a **APIs & Services** → **Credentials**
4. Edita tu OAuth 2.0 Client ID
5. En **"Authorized redirect URIs"**, añade:
   ```
   https://tu-backend.vercel.app/auth/google/callback
   https://tu-proyecto.vercel.app/api/auth/callback/google
   ```
6. Guarda los cambios

---

## ✅ Paso 6: Verificar el Despliegue

### 6.1 Verificar Backend

1. Visita: `https://tu-backend.vercel.app/api/docs`
2. Deberías ver la documentación Swagger de tu API
3. Prueba un endpoint básico como `/health` o `/api`

### 6.2 Verificar Frontend

1. Visita: `https://tu-proyecto.vercel.app`
2. Deberías ver tu página de inicio del spa
3. Prueba la navegación entre páginas

### 6.3 Verificar Base de Datos

1. Ve a [console.neon.tech](https://console.neon.tech)
2. Selecciona tu proyecto
3. Ve a **"SQL Editor"**
4. Ejecuta:
   ```sql
   SELECT * FROM users LIMIT 5;
   ```
5. Verifica que las tablas se hayan creado correctamente

---

## 🔧 Comandos Útiles

### Ver logs en tiempo real
```bash
# Instalar Vercel CLI (opcional)
npm i -g vercel

# Ver logs del backend
vercel logs tu-backend.vercel.app --follow

# Ver logs del frontend
vercel logs tu-proyecto.vercel.app --follow
```

### Ejecutar migraciones manualmente

Si necesitas ejecutar migraciones después del despliegue:

```bash
# Clonar el proyecto localmente
git clone tu-repositorio
cd backend

# Configurar .env con tus URLs de Neon
echo "DATABASE_URL=tu-database-url" > .env
echo "DIRECT_URL=tu-direct-url" >> .env

# Ejecutar migraciones
npm install
npx prisma migrate deploy

# Ver el estado de las migraciones
npx prisma migrate status
```

---

## 🐛 Solución de Problemas Comunes

### Error: "P1001: Can't reach database server"

**Solución**: Verifica que:
- Las URLs de Neon sean correctas
- Incluyan `?sslmode=require`
- La URL pooled incluya `&pgbouncer=true`

### Error: "Module not found" en el build

**Solución**: 
```bash
# En tu proyecto local
cd frontend  # o backend
npm install
git add package-lock.json
git commit -m "Update dependencies"
git push
```

### Error: "NEXTAUTH_URL is not set"

**Solución**: 
1. Ve a Vercel → Settings → Environment Variables
2. Asegúrate de que `NEXTAUTH_URL` esté configurado correctamente
3. Redeploy el proyecto

### Las migraciones no se ejecutan

**Solución**:
1. Ve a Vercel → Settings → Environment Variables
2. Verifica que `DIRECT_URL` esté configurado
3. En Build Settings, asegúrate de que el comando sea: `npm run vercel-build`

---

## 🎉 ¡Listo!

Tu aplicación ahora está desplegada en:
- **Frontend**: `https://tu-proyecto.vercel.app`
- **Backend API**: `https://tu-backend.vercel.app`
- **API Docs**: `https://tu-backend.vercel.app/api/docs`
- **Base de datos**: Neon PostgreSQL

### Próximos Pasos

1. ✅ Configura un dominio personalizado en Vercel
2. ✅ Configura SendGrid para emails transaccionales
3. ✅ Configura Twilio para notificaciones WhatsApp
4. ✅ Añade analytics (Vercel Analytics)
5. ✅ Configura monitoreo de errores (Sentry)

---

## 📚 Recursos Adicionales

- [Documentación de Vercel](https://vercel.com/docs)
- [Documentación de Neon](https://neon.tech/docs)
- [Prisma con Neon](https://www.prisma.io/docs/guides/database/neon)
- [Next.js Deployment](https://nextjs.org/docs/deployment)
- [NestJS Deployment](https://docs.nestjs.com/faq/deployment)

---

¿Necesitas ayuda? Revisa los logs en Vercel o abre un issue en tu repositorio.
