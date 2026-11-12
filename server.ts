import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import { saveQuoteRequest, updateNotificationStatus, getAllQuoteRequests } from './src/server/db';
import { sendEmailNotification } from './src/server/notifications/email';
import { sendWhatsAppNotification } from './src/server/notifications/whatsapp';

dotenv.config();

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;
const isProduction = process.env.NODE_ENV === 'production';

app.use(express.json());

// In-memory rate limiting: max 10 submissions per 5 minutes per IP
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();

function rateLimiter(req: express.Request, res: express.Response, next: express.NextFunction) {
  const ip = (req.headers['x-forwarded-for'] as string)?.split(',')[0] || req.socket.remoteAddress || 'unknown';
  const now = Date.now();
  const entry = rateLimitMap.get(ip);

  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + 5 * 60 * 1000 });
    return next();
  }

  if (entry.count >= 10) {
    return res.status(429).json({
      error: 'Has enviado demasiadas solicitudes. Por favor espera unos minutos o comunícate directamente por WhatsApp al 302 214 5589.',
    });
  }

  entry.count += 1;
  next();
}

// Health check endpoint
app.get('/api/health', (_req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    service: 'Forros Sky API & Lead Reception System',
  });
});

// Admin endpoint to view saved requests (optionally secured via ADMIN_SECRET_KEY)
app.get('/api/quote-requests', (req, res) => {
  const secret = process.env.ADMIN_SECRET_KEY;
  if (secret) {
    const authHeader = req.headers['authorization'];
    const queryKey = req.query.key;
    if (authHeader !== `Bearer ${secret}` && queryKey !== secret) {
      return res.status(401).json({ error: 'Acceso no autorizado' });
    }
  }

  const requests = getAllQuoteRequests();
  res.json({
    total: requests.length,
    requests,
  });
});

// Lead submission endpoint
app.post('/api/quote-request', rateLimiter, async (req, res) => {
  try {
    const { nombre, telefono, email, vehiculo, servicio, mensaje, honeypot } = req.body;

    // Honeypot spam trap: if filled by a bot, quietly return success without storing
    if (honeypot) {
      console.warn('[SPAM FILTRADO] Honeypot activado, solicitud descartada silenciosamente');
      return res.status(200).json({
        success: true,
        message: '¡Solicitud enviada correctamente! Gracias por contactar a Forros Sky. Nuestro equipo se comunicará contigo pronto.',
      });
    }

    // Required fields validation
    if (!nombre || typeof nombre !== 'string' || nombre.trim().length < 2) {
      return res.status(400).json({ error: 'El nombre completo es obligatorio (mínimo 2 caracteres).' });
    }
    if (!telefono || typeof telefono !== 'string' || telefono.trim().length < 7) {
      return res.status(400).json({ error: 'El número de teléfono o WhatsApp es obligatorio.' });
    }
    if (!email || typeof email !== 'string' || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      return res.status(400).json({ error: 'Por favor ingresa un correo electrónico válido.' });
    }
    if (!vehiculo || typeof vehiculo !== 'string' || vehiculo.trim().length < 2) {
      return res.status(400).json({ error: 'La información del vehículo (marca, modelo y año) es obligatoria.' });
    }
    if (!servicio || typeof servicio !== 'string') {
      return res.status(400).json({ error: 'El servicio principal de interés es obligatorio.' });
    }

    const clientIp = (req.headers['x-forwarded-for'] as string)?.split(',')[0] || req.socket.remoteAddress;
    const userAgent = req.headers['user-agent'];

    // 1. PERSIST TO DISK FIRST - guarantees no lead is lost
    const storedRecord = saveQuoteRequest({
      nombre,
      telefono,
      email,
      vehiculo,
      servicio,
      mensaje,
      ip: clientIp,
      userAgent,
    });

    console.log(`[NUEVA SOLICITUD GUARDADA] ID: ${storedRecord.id} | Cliente: ${storedRecord.nombre} | Vehículo: ${storedRecord.vehiculo} | Servicio: ${storedRecord.servicio}`);

    // 2. DISPATCH NOTIFICATIONS IN BACKGROUND (Email & WhatsApp)
    (async () => {
      try {
        const [emailRes, waRes] = await Promise.allSettled([
          sendEmailNotification(storedRecord),
          sendWhatsAppNotification(storedRecord),
        ]);

        const emailResult = emailRes.status === 'fulfilled'
          ? emailRes.value
          : { status: 'fallido' as const, detail: 'Error inesperado al enviar correo' };

        const waResult = waRes.status === 'fulfilled'
          ? waRes.value
          : { status: 'fallido' as const, detail: 'Error inesperado al enviar WhatsApp' };

        updateNotificationStatus(storedRecord.id, {
          estadoEmail: emailResult.status,
          detalleEmail: emailResult.detail,
          estadoWhatsApp: waResult.status,
          detalleWhatsApp: waResult.detail,
        });
      } catch (notifErr) {
        console.error('[NOTIFICACIONES ERROR]', notifErr);
      }
    })();

    // 3. RESPOND IMMEDIATELY TO CLIENT WITH SUCCESS MESSAGE
    return res.status(201).json({
      success: true,
      id: storedRecord.id,
      message: '¡Solicitud enviada correctamente! Gracias por contactar a Forros Sky. Nuestro equipo se comunicará contigo pronto.',
    });
  } catch (error: any) {
    console.error('[ERROR PROCESANDO SOLICITUD]', error);
    return res.status(500).json({
      error: 'Ocurrió un error al procesar tu solicitud. Por favor intenta de nuevo o comunícate directamente por WhatsApp al 302 214 5589.',
    });
  }
});

// Setup dev Vite server or production static serving
async function startServer() {
  if (!isProduction) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve('dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[FORROS SKY SERVER] Servidor ejecutándose en http://0.0.0.0:${PORT}`);
  });
}

startServer();
