# ⚡ Guía Rápida de Despliegue en Vercel

Resumen ejecutivo para desplegar rápidamente tu aplicación de spa en Vercel con Neon.

## 🎯 Checklist Previo

Antes de comenzar, asegúrate de tener:

- [ ] Código subido a GitHub
- [ ] Cuenta en [Vercel](https://vercel.com)
- [ ] Cuenta en [Neon](https://neon.tech)
- [ ] Credenciales de Google OAuth (opcional)
- [ ] API Key de SendGrid (opcional)

---

## 📝 Paso 1: Crear Base de Datos en Neon (5 min)

1. Ve a [console.neon.tech](https://console.neon.tech)
2. Crea un nuevo proyecto → Selecciona región → Crea proyecto
3. **Guarda estas dos URLs** (las necesitarás después):
   - **Pooled**: `postgresql://...?pgbouncer=true`
   - **Direct**: `postgresql://...` (sin pgbouncer)

---

## 🎨 Paso 2: Desplegar Frontend (3 min)

1. Ve a [vercel.com/new](https://vercel.com/new)
2. Importa tu repositorio de GitHub
3. **Root Directory**: `frontend`
4. **Framework**: Next.js (auto-detectado)
5. Añade las **Environment Variables**:

```env
NEXTAUTH_URL=https://tu-proyecto.vercel.app
NEXTAUTH_SECRET=genera_uno_con_openssl_rand_base64_32
NEXT_PUBLIC_API_URL=https://tu-backend.vercel.app
GOOGLE_CLIENT_ID=tu-google-client-id
GOOGLE_CLIENT_SECRET=tu-google-client-secret
NEXT_PUBLIC_APP_NAME=Spa de Lujo
```

6. Haz clic en **Deploy** → Guarda la URL generada

---

## ⚙️ Paso 3: Desplegar Backend (5 min)

1. Ve a [vercel.com/new](https://vercel.com/new)
2. Importa el **mismo repositorio**
3. **Root Directory**: `backend`
4. **Build Command**: `npm run vercel-build`
5. Añade las **Environment Variables**:

```env
# Database (Pega las URLs de Neon del Paso 1)
DATABASE_URL=postgresql://...?pgbouncer=true
DIRECT_URL=postgresql://...

# JWT (Genera secrets con: openssl rand -base64 32)
JWT_SECRET=tu_jwt_secret_super_seguro
JWT_EXPIRATION=7d
JWT_REFRESH_SECRET=tu_refresh_secret_diferente
JWT_REFRESH_EXPIRATION=30d

# URLs (Pega la URL del frontend del Paso 2)
FRONTEND_URL=https://tu-proyecto.vercel.app
BACKEND_URL=https://tu-backend.vercel.app

# OAuth
GOOGLE_CLIENT_ID=tu-google-client-id
GOOGLE_CLIENT_SECRET=tu-google-client-secret
GOOGLE_CALLBACK_URL=https://tu-backend.vercel.app/auth/google/callback

# Email (Opcional)
SENDGRID_API_KEY=tu-sendgrid-api-key
SENDGRID_FROM_EMAIL=noreply@tudominio.com
SENDGRID_FROM_NAME=Spa de Lujo

# Config
APP_PORT=4000
APP_ENV=production
THROTTLE_TTL=60
THROTTLE_LIMIT=100
```

6. Haz clic en **Deploy** → Guarda la URL generada

---

## 🔄 Paso 4: Actualizar Referencias Cruzadas (2 min)

### Actualizar Frontend con URL del Backend

1. Ve a tu proyecto **frontend** en Vercel
2. Settings → Environment Variables
3. Edita `NEXT_PUBLIC_API_URL` → Pega la URL del backend
4. Guarda → Ve a Deployments → Redeploy

### Actualizar Google OAuth (si aplica)

1. Ve a [console.cloud.google.com](https://console.cloud.google.com)
2. APIs & Services → Credentials
3. Edita tu OAuth Client → Authorized redirect URIs → Añade:
   ```
   https://tu-backend.vercel.app/auth/google/callback
   https://tu-proyecto.vercel.app/api/auth/callback/google
   ```

---

## ✅ Paso 5: Verificar (1 min)

Visita estas URLs para confirmar que todo funciona:

- ✅ Frontend: `https://tu-proyecto.vercel.app`
- ✅ Backend Health: `https://tu-backend.vercel.app/api`
- ✅ API Docs: `https://tu-backend.vercel.app/api/docs`

---

## 🐛 Problemas Comunes

### ❌ Error: "Can't reach database"
**Solución**: Verifica que `DATABASE_URL` y `DIRECT_URL` sean correctas en las variables de entorno del backend.

### ❌ Error: "NEXTAUTH_URL is not set"
**Solución**: Ve a Settings → Environment Variables en tu frontend y añade `NEXTAUTH_URL`.

### ❌ Las migraciones no se ejecutan
**Solución**: Asegúrate de que el **Build Command** sea `npm run vercel-build` en el backend.

### ❌ Error 500 en el backend
**Solución**: Ve a tu proyecto backend en Vercel → Logs → Revisa los errores.

---

## 🎉 ¡Listo!

Tu aplicación está desplegada en:

- **🌐 Frontend**: `https://tu-proyecto.vercel.app`
- **⚙️ Backend**: `https://tu-backend.vercel.app`
- **📖 API Docs**: `https://tu-backend.vercel.app/api/docs`

### Comandos Útiles

```bash
# Ver logs del backend en tiempo real
vercel logs tu-backend.vercel.app --follow

# Ejecutar migraciones manualmente
cd backend
npx prisma migrate deploy
```

---

## 📚 Recursos

- [Guía Completa de Despliegue](DEPLOYMENT.md) - Documentación detallada
- [Guía de Instalación Local](INSTALLATION.md) - Para desarrollo local
- [Documentación de Neon](https://neon.tech/docs)
- [Documentación de Vercel](https://vercel.com/docs)

---

**¿Necesitas más ayuda?** Consulta la [Guía Completa de Despliegue](DEPLOYMENT.md) para troubleshooting avanzado.
