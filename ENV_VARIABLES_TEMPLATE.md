# 🔐 Template de Variables de Entorno para Vercel

Este documento contiene todas las variables de entorno necesarias para configurar tu proyecto en Vercel.

---

## 🎨 FRONTEND - Variables de Entorno

Copia estas variables en: **Vercel Dashboard → Tu Proyecto Frontend → Settings → Environment Variables**

```env
# NextAuth
NEXTAUTH_URL=https://tu-proyecto.vercel.app
NEXTAUTH_SECRET=<genera con: openssl rand -base64 32>

# API Backend
NEXT_PUBLIC_API_URL=https://tu-backend.vercel.app

# Google OAuth
GOOGLE_CLIENT_ID=<tu-google-client-id>
GOOGLE_CLIENT_SECRET=<tu-google-client-secret>

# Apple OAuth (opcional)
APPLE_CLIENT_ID=<tu-apple-client-id>
APPLE_CLIENT_SECRET=<tu-apple-client-secret>

# App Configuration
NEXT_PUBLIC_APP_NAME=Spa de Lujo
```

### Cómo obtener las credenciales de Google OAuth:

1. Ve a [Google Cloud Console](https://console.cloud.google.com)
2. Crea un proyecto nuevo
3. Ve a APIs & Services → Credentials
4. Crea OAuth 2.0 Client ID
5. Tipo: Web application
6. Authorized redirect URIs:
   ```
   https://tu-proyecto.vercel.app/api/auth/callback/google
   https://tu-backend.vercel.app/auth/google/callback
   ```
7. Guarda Client ID y Client Secret

---

## ⚙️ BACKEND - Variables de Entorno

Copia estas variables en: **Vercel Dashboard → Tu Proyecto Backend → Settings → Environment Variables**

```env
# ===== DATABASE (NEON) =====
# Connection Pooling URL (para la aplicación)
DATABASE_URL=postgresql://<user>:<password>@<host>.neon.tech/neondb?sslmode=require&pgbouncer=true

# Direct Connection URL (para migraciones)
DIRECT_URL=postgresql://<user>:<password>@<host>.neon.tech/neondb?sslmode=require


# ===== JWT SECRETS =====
# Genera con: openssl rand -base64 32
JWT_SECRET=<tu-jwt-secret-super-seguro>
JWT_EXPIRATION=7d
JWT_REFRESH_SECRET=<tu-refresh-secret-diferente>
JWT_REFRESH_EXPIRATION=30d


# ===== OAUTH - GOOGLE =====
GOOGLE_CLIENT_ID=<tu-google-client-id>
GOOGLE_CLIENT_SECRET=<tu-google-client-secret>
GOOGLE_CALLBACK_URL=https://tu-backend.vercel.app/auth/google/callback


# ===== OAUTH - APPLE (opcional) =====
APPLE_CLIENT_ID=<tu-apple-client-id>
APPLE_CLIENT_SECRET=<tu-apple-client-secret>
APPLE_CALLBACK_URL=https://tu-backend.vercel.app/auth/apple/callback


# ===== URLs =====
FRONTEND_URL=https://tu-proyecto.vercel.app
BACKEND_URL=https://tu-backend.vercel.app


# ===== SENDGRID (EMAIL) =====
SENDGRID_API_KEY=<tu-sendgrid-api-key>
SENDGRID_FROM_EMAIL=noreply@tudominio.com
SENDGRID_FROM_NAME=Spa de Lujo


# ===== TWILIO (WHATSAPP) - Opcional =====
TWILIO_ACCOUNT_SID=<tu-twilio-account-sid>
TWILIO_AUTH_TOKEN=<tu-twilio-auth-token>
TWILIO_WHATSAPP_NUMBER=whatsapp:+14155238886
TWILIO_PHONE_NUMBER=+1234567890


# ===== APP CONFIGURATION =====
APP_PORT=4000
APP_ENV=production


# ===== RATE LIMITING =====
THROTTLE_TTL=60
THROTTLE_LIMIT=100


# ===== CLOUDINARY (opcional) =====
CLOUDINARY_CLOUD_NAME=<tu-cloud-name>
CLOUDINARY_API_KEY=<tu-api-key>
CLOUDINARY_API_SECRET=<tu-api-secret>
```

---

## 🔑 Cómo Obtener las Credenciales

### 🗄️ Neon Database

1. Ve a [console.neon.tech](https://console.neon.tech)
2. Crea un nuevo proyecto
3. En la página del proyecto, haz clic en "Connection Details"
4. Copia ambas connection strings:
   - **Pooled connection** → `DATABASE_URL`
   - **Direct connection** → `DIRECT_URL`

### 📧 SendGrid (Email)

1. Ve a [sendgrid.com](https://sendgrid.com)
2. Crea una cuenta (tienen plan gratuito)
3. Ve a Settings → API Keys
4. Crea un nuevo API Key con permisos de "Mail Send"
5. Guarda el API Key (solo se muestra una vez)

### 📱 Twilio (WhatsApp)

1. Ve a [twilio.com](https://twilio.com)
2. Crea una cuenta
3. Ve a Console → Account Info
4. Copia Account SID y Auth Token
5. Para WhatsApp Business API, necesitas configuración adicional

### 🔐 Generar Secrets Seguros

Para generar secrets para JWT y NextAuth:

```bash
# En tu terminal, ejecuta:
openssl rand -base64 32

# Esto generará algo como:
# Xv7P9kL2mN4qR8sT1wZ3yB5cD6eF7gH8
```

Genera uno diferente para cada secret que necesites.

---

## ✅ Checklist de Configuración

Marca cada paso cuando lo completes:

### Frontend
- [ ] `NEXTAUTH_URL` configurado
- [ ] `NEXTAUTH_SECRET` generado y configurado
- [ ] `NEXT_PUBLIC_API_URL` apuntando al backend
- [ ] `GOOGLE_CLIENT_ID` y `GOOGLE_CLIENT_SECRET` configurados
- [ ] Despliegue exitoso en Vercel
- [ ] URL del frontend guardada

### Backend
- [ ] `DATABASE_URL` de Neon configurado (pooled)
- [ ] `DIRECT_URL` de Neon configurado
- [ ] `JWT_SECRET` y `JWT_REFRESH_SECRET` generados
- [ ] `FRONTEND_URL` apuntando al frontend
- [ ] `GOOGLE_CALLBACK_URL` configurado
- [ ] Despliegue exitoso en Vercel
- [ ] Migraciones ejecutadas correctamente
- [ ] URL del backend guardada

### OAuth (Google)
- [ ] Proyecto creado en Google Cloud Console
- [ ] OAuth Client ID creado
- [ ] Redirect URIs configurados
- [ ] Credenciales copiadas a ambos proyectos

### Opcional
- [ ] SendGrid configurado (para emails)
- [ ] Twilio configurado (para WhatsApp)
- [ ] Cloudinary configurado (para imágenes)

---

## 🔗 Links Rápidos

- **Vercel Dashboard**: https://vercel.com/dashboard
- **Neon Console**: https://console.neon.tech
- **Google Cloud Console**: https://console.cloud.google.com
- **SendGrid**: https://app.sendgrid.com
- **Twilio Console**: https://console.twilio.com

---

## 💡 Tip: Guardar Variables Localmente

Para trabajar en desarrollo local, crea estos archivos (ya están en .gitignore):

```bash
# Frontend
cp frontend/.env.example frontend/.env.local
# Edita frontend/.env.local con valores de desarrollo

# Backend
cp backend/.env.example backend/.env
# Edita backend/.env con valores de desarrollo
```

**⚠️ NUNCA subas archivos .env al repositorio**

---

¿Necesitas ayuda? Consulta [DEPLOYMENT.md](DEPLOYMENT.md) para guía completa o [VERCEL_SETUP.md](VERCEL_SETUP.md) para guía rápida.
