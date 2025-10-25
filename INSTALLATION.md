# Guía de Instalación - Sistema Integral de Spa

Esta guía te ayudará a configurar y ejecutar el sistema completo de gestión de spa.

## 📋 Prerequisitos

- **Node.js**: v18 o superior
- **npm**: v9 o superior
- **Git**: Para clonar el repositorio
- **Base de Datos**: PostgreSQL v14+ (local) o cuenta en [Neon](https://neon.tech) (cloud)

## 🚀 Instalación Paso a Paso

> **💡 ¿Quieres desplegar en producción con Vercel + Neon?**  
> Ve directamente a la [Guía de Despliegue](DEPLOYMENT.md) para instrucciones completas.

### 1. Configurar la Base de Datos

Elige una de las siguientes opciones:

#### Opción A: PostgreSQL Local (Desarrollo)

```bash
# Conectarse a PostgreSQL
psql -U postgres

# Crear la base de datos
CREATE DATABASE spa_db;

# Crear usuario (opcional)
CREATE USER spa_user WITH PASSWORD 'tu_password_segura';
GRANT ALL PRIVILEGES ON DATABASE spa_db TO spa_user;

# Salir
\q
```

#### Opción B: Neon Database (Cloud - Recomendado para Producción)

1. Crea una cuenta en [neon.tech](https://neon.tech)
2. Crea un nuevo proyecto
3. Copia las connection strings (pooled y direct)
4. Úsalas en el archivo `.env` del backend

Ver más detalles en [DEPLOYMENT.md](DEPLOYMENT.md)

### 2. Instalar Dependencias

#### Instalar dependencias raíz
```bash
cd /Users/lucascenzano/Documents/SyL
npm install
```

#### Instalar dependencias del frontend
```bash
cd frontend
npm install
```

#### Instalar dependencias del backend
```bash
cd ../backend
npm install
```

### 3. Configurar Variables de Entorno

#### Frontend
```bash
cd frontend
cp .env.example .env.local
```

Edita `frontend/.env.local` con tus valores:
```env
NEXT_PUBLIC_API_URL=http://localhost:4000
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=genera-un-secret-aleatorio-aqui
GOOGLE_CLIENT_ID=tu-google-client-id
GOOGLE_CLIENT_SECRET=tu-google-client-secret
```

#### Backend
```bash
cd ../backend
cp .env.example .env
```

Edita `backend/.env` con tus valores:
```env
DATABASE_URL="postgresql://spa_user:tu_password_segura@localhost:5432/spa_db?schema=public"
JWT_SECRET=genera-un-secret-jwt-muy-seguro-aqui
JWT_EXPIRATION=7d
SENDGRID_API_KEY=tu-api-key-de-sendgrid
TWILIO_ACCOUNT_SID=tu-twilio-sid
TWILIO_AUTH_TOKEN=tu-twilio-token
FRONTEND_URL=http://localhost:3000
```

### 4. Generar Secretos Seguros

Puedes generar secretos seguros con estos comandos:

```bash
# Para NEXTAUTH_SECRET
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"

# Para JWT_SECRET
node -e "console.log(require('crypto').randomBytes(64).toString('base64'))"
```

### 5. Configurar Prisma y la Base de Datos

```bash
cd backend

# Generar el cliente de Prisma
npx prisma generate

# Ejecutar migraciones
npx prisma migrate dev --name init

# (Opcional) Poblar con datos de ejemplo
npx prisma db seed
```

### 6. Ejecutar el Sistema

#### Opción 1: Ejecutar todo desde la raíz
```bash
cd /Users/lucascenzano/Documents/SyL
npm run dev
```

#### Opción 2: Ejecutar por separado

Terminal 1 - Backend:
```bash
cd backend
npm run start:dev
```

Terminal 2 - Frontend:
```bash
cd frontend
npm run dev
```

## 🌐 Acceder al Sistema

Una vez iniciado, podrás acceder a:

- **Frontend (Cliente)**: http://localhost:3000
- **API Backend**: http://localhost:4000
- **Documentación API**: http://localhost:4000/api/docs
- **Prisma Studio**: `npx prisma studio` en carpeta backend

## 🔑 Configuración de OAuth (Google)

### Obtener credenciales de Google

1. Ve a [Google Cloud Console](https://console.cloud.google.com/)
2. Crea un nuevo proyecto o selecciona uno existente
3. Habilita "Google+ API"
4. Ve a "Credenciales" → "Crear credenciales" → "ID de cliente de OAuth 2.0"
5. Configura:
   - Tipo de aplicación: Aplicación web
   - URIs de redireccionamiento autorizados:
     - `http://localhost:4000/auth/google/callback`
     - `http://localhost:3000/api/auth/callback/google`
6. Copia el Client ID y Client Secret a tus archivos `.env`

## 📧 Configuración de SendGrid (Email)

1. Regístrate en [SendGrid](https://sendgrid.com/)
2. Ve a Settings → API Keys → Create API Key
3. Dale permisos de "Full Access"
4. Copia la API Key a tu `.env`
5. Verifica tu dominio de email

## 📱 Configuración de Twilio (WhatsApp)

1. Regístrate en [Twilio](https://www.twilio.com/)
2. Activa WhatsApp Business API
3. Copia Account SID y Auth Token a tu `.env`
4. Configura el número de WhatsApp

## 🗄️ Gestión de Base de Datos

### Ver la base de datos visualmente
```bash
cd backend
npx prisma studio
```

### Crear una nueva migración
```bash
cd backend
npx prisma migrate dev --name nombre_de_migracion
```

### Resetear la base de datos (CUIDADO: Borra todos los datos)
```bash
cd backend
npx prisma migrate reset
```

## 🔧 Solución de Problemas

### Error: "Cannot find module"
```bash
# Reinstalar dependencias
rm -rf node_modules package-lock.json
npm install
```

### Error de conexión a PostgreSQL
- Verifica que PostgreSQL esté corriendo: `pg_isready`
- Verifica el DATABASE_URL en `.env`
- Asegúrate de que el usuario tiene permisos

### Puerto ya en uso
```bash
# Cambiar puerto en .env
# Frontend: NEXT_PUBLIC_API_URL
# Backend: APP_PORT
```

### Error en Prisma
```bash
# Regenerar cliente
cd backend
npx prisma generate

# Volver a ejecutar migraciones
npx prisma migrate dev
```

## 📝 Scripts Útiles

### Frontend
- `npm run dev` - Modo desarrollo
- `npm run build` - Build de producción
- `npm run start` - Servidor de producción
- `npm run lint` - Linter

### Backend
- `npm run start:dev` - Modo desarrollo con hot reload
- `npm run build` - Build de producción
- `npm run start:prod` - Servidor de producción
- `npm run test` - Ejecutar tests

## 🚀 Deploy a Producción

### Frontend (Vercel)
1. Conecta tu repositorio a Vercel
2. Configura las variables de entorno
3. Deploy automático en cada push

### Backend (Railway/Render)
1. Conecta tu repositorio
2. Configura variables de entorno
3. Agrega PostgreSQL como servicio
4. Deploy automático

## 📚 Recursos Adicionales

- [Next.js Documentation](https://nextjs.org/docs)
- [NestJS Documentation](https://docs.nestjs.com)
- [Prisma Documentation](https://www.prisma.io/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)

## 🆘 Soporte

Si encuentras problemas, revisa:
1. Logs del servidor (`npm run start:dev`)
2. Consola del navegador (F12)
3. Documentación de API en `/api/docs`

## ✅ Checklist de Instalación

- [ ] PostgreSQL instalado y corriendo
- [ ] Base de datos creada
- [ ] Dependencias instaladas (raíz, frontend, backend)
- [ ] Variables de entorno configuradas
- [ ] Prisma configurado y migrado
- [ ] Backend corriendo en puerto 4000
- [ ] Frontend corriendo en puerto 3000
- [ ] Puedes acceder a ambos servicios
- [ ] OAuth configurado (opcional)
- [ ] SendGrid configurado (opcional)
- [ ] Twilio configurado (opcional)

¡Felicidades! Tu sistema de gestión de spa está listo para usar. 🎉
