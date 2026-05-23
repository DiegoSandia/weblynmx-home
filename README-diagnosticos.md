# Formularios de Diagnóstico — WeblynMX

Dos formularios multi-step premium que envían respuestas por correo a **WeblynMx@gmail.com** usando [Resend](https://resend.com).

## Rutas

| Ruta | Descripción |
|---|---|
| `/diagnostico` | Hub — elige entre los dos formularios |
| `/diagnostico-marca` | Formulario de Diagnóstico de Marca (4 pasos) |
| `/diagnostico-conversion` | Formulario de Diagnóstico de Conversión (4 pasos) |
| `/api/diagnostico-marca` | API route — envía correo con respuestas de marca |
| `/api/diagnostico-conversion` | API route — envía correo con respuestas de conversión |

---

## 1. Instalación

```bash
cd home-next
npm install
```

---

## 2. Configurar Resend

### Crear cuenta
1. Ve a [resend.com](https://resend.com) y crea una cuenta gratuita.
2. En el dashboard ve a **API Keys → Create API Key**.
3. Copia la key (empieza con `re_`).

### Verificar dominio (recomendado para producción)
1. En Resend ve a **Domains → Add Domain**.
2. Agrega `weblynmx.com` y añade los registros DNS que te indican.
3. Una vez verificado, el `FROM_EMAIL` puede ser cualquier dirección `@weblynmx.com`.

> **Modo de prueba (sin dominio propio):** puedes usar `onboarding@resend.dev` como `FROM_EMAIL` temporalmente — solo enviará a tu email verificado en Resend.

---

## 3. Variables de entorno

### Local (desarrollo)

Crea el archivo `.env.local` en la raíz del proyecto:

```bash
cp .env.example .env.local
```

Edita `.env.local` con tus valores reales:

```env
RESEND_API_KEY=re_tuApiKeyReal
FROM_EMAIL=diagnostico@weblynmx.com
```

### Vercel (producción)

1. Entra a tu proyecto en [vercel.com](https://vercel.com).
2. Ve a **Settings → Environment Variables**.
3. Agrega las dos variables:
   - `RESEND_API_KEY` → tu API key de Resend
   - `FROM_EMAIL` → `diagnostico@weblynmx.com`
4. Asegúrate de seleccionar **Production**, **Preview** y **Development**.
5. Haz un nuevo deploy (o redeploy) para que las variables surtan efecto.

---

## 4. Probar en local

```bash
npm run dev
```

Abre [http://localhost:3000/diagnostico-marca](http://localhost:3000/diagnostico-marca) o [http://localhost:3000/diagnostico-conversion](http://localhost:3000/diagnostico-conversion).

Llena el formulario y envíalo. El correo llegará a `WeblynMx@gmail.com` con todas las respuestas organizadas por sección.

### Verificar que el correo llega
- Revisa la carpeta **Spam** la primera vez.
- En el dashboard de Resend puedes ver todos los envíos en **Emails → Logs**.

---

## 5. Manejo de errores

| Situación | Mensaje al usuario |
|---|---|
| Envío exitoso | "Diagnóstico enviado. Te responderemos en menos de 24 horas." + CTA a WhatsApp |
| Error en el servidor | "No pudimos enviar tu diagnóstico. Escríbenos por WhatsApp." |

---

## Stack

- **Next.js** (App Router)
- **Resend** para envío de correo transaccional
- **CSS variables** del sistema de diseño WeblynMX (sin Tailwind)
- **Vercel** para deploy
