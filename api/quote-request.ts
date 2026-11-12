import type { IncomingMessage, ServerResponse } from 'http';
import { saveQuoteRequest, updateNotificationStatus } from '../src/server/db';
import { sendEmailNotification } from '../src/server/notifications/email';
import { sendWhatsAppNotification } from '../src/server/notifications/whatsapp';

export default async function handler(req: IncomingMessage & { body?: any }, res: ServerResponse) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    res.statusCode = 200;
    res.end();
    return;
  }

  if (req.method !== 'POST') {
    res.statusCode = 405;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ error: 'Método no permitido. Utiliza POST.' }));
    return;
  }

  try {
    // Parse body if not parsed
    let body = req.body;
    if (!body) {
      const chunks: any[] = [];
      for await (const chunk of req) {
        chunks.push(chunk);
      }
      const rawBody = Buffer.concat(chunks).toString('utf-8');
      body = rawBody ? JSON.parse(rawBody) : {};
    }

    const { nombre, telefono, email, vehiculo, servicio, mensaje, honeypot } = body;

    // Honeypot anti-spam
    if (honeypot) {
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify({
        success: true,
        message: '¡Solicitud enviada correctamente! Gracias por contactar a Forros Sky. Nuestro equipo se comunicará contigo pronto.',
      }));
      return;
    }

    if (!nombre || typeof nombre !== 'string' || nombre.trim().length < 2) {
      res.statusCode = 400;
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify({ error: 'El nombre completo es obligatorio (mínimo 2 caracteres).' }));
      return;
    }
    if (!telefono || typeof telefono !== 'string' || telefono.trim().length < 7) {
      res.statusCode = 400;
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify({ error: 'El número de teléfono o WhatsApp es obligatorio.' }));
      return;
    }
    if (!email || typeof email !== 'string' || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      res.statusCode = 400;
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify({ error: 'Por favor ingresa un correo electrónico válido.' }));
      return;
    }
    if (!vehiculo || typeof vehiculo !== 'string' || vehiculo.trim().length < 2) {
      res.statusCode = 400;
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify({ error: 'La información del vehículo (marca, modelo y año) es obligatoria.' }));
      return;
    }
    if (!servicio || typeof servicio !== 'string') {
      res.statusCode = 400;
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify({ error: 'El servicio principal de interés es obligatorio.' }));
      return;
    }

    // 1. Guardar en base de datos
    const storedRecord = saveQuoteRequest({
      nombre,
      telefono,
      email,
      vehiculo,
      servicio,
      mensaje,
    });

    // 2. Disparar notificaciones
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
      } catch (err) {
        console.error('[NOTIFICACIONES ERROR]', err);
      }
    })();

    res.statusCode = 201;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({
      success: true,
      id: storedRecord.id,
      message: '¡Solicitud enviada correctamente! Gracias por contactar a Forros Sky. Nuestro equipo se comunicará contigo pronto.',
    }));
  } catch (error: any) {
    console.error('[API VERCEL ERROR]', error);
    res.statusCode = 500;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({
      error: 'Ocurrió un error al procesar tu solicitud. Por favor intenta de nuevo o comunícate por WhatsApp al 302 214 5589.',
    }));
  }
}
