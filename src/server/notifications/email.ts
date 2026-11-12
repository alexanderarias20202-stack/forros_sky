import { StoredQuoteRequest } from '../db';

interface EmailResult {
  success: boolean;
  status: 'enviado' | 'fallido' | 'no_configurado';
  detail: string;
}

export async function sendEmailNotification(request: StoredQuoteRequest): Promise<EmailResult> {
  const adminEmail = process.env.ADMIN_EMAIL || 'contacto@forrossky.com';
  const apiKey = process.env.EMAIL_API_KEY;
  const fromEmail = process.env.EMAIL_FROM || 'Forros Sky Web <onboarding@resend.dev>';

  if (!apiKey) {
    const msg = 'EMAIL_API_KEY no configurada en las variables de entorno. Notificación por correo omitida.';
    console.warn(`[NOTIFICACIÓN EMAIL] ${msg}`);
    return {
      success: false,
      status: 'no_configurado',
      detail: msg,
    };
  }

  const subject = `Nueva solicitud de cotización – Forros Sky (${request.vehiculo})`;

  const textContent = `
¡Has recibido una nueva solicitud de cotización desde la página web de Forros Sky!

DATOS DEL CLIENTE:
------------------------------------------
ID de Solicitud: ${request.id}
Nombre completo: ${request.nombre}
Teléfono / WhatsApp: ${request.telefono}
Correo electrónico: ${request.email}
Vehículo: ${request.vehiculo}
Servicio solicitado: ${request.servicio}
Detalles adicionales: ${request.mensaje || 'Ninguno'}
Fecha y hora de recepción: ${request.fechaFormateada}
------------------------------------------

Ingresa al panel o responde directamente al cliente:
WhatsApp: https://wa.me/${request.telefono.replace(/\D/g, '')}
  `.trim();

  const htmlContent = `
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="utf-8">
  <title>Nueva solicitud de cotización – Forros Sky</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f7f7f7; margin: 0; padding: 20px; color: #1a1a1a; }
    .container { max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 12px; overflow: hidden; border: 1px solid #e5e5e5; }
    .header { background: #0D0D0D; padding: 28px 24px; text-align: center; border-bottom: 3px solid #D92B2B; }
    .header h1 { color: #ffffff; margin: 0; font-size: 22px; font-weight: 800; letter-spacing: 1px; text-transform: uppercase; }
    .header p { color: #D92B2B; margin: 6px 0 0 0; font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 2px; }
    .content { padding: 30px 24px; }
    .alert-banner { background: #fff5f5; border-left: 4px solid #D92B2B; padding: 12px 16px; margin-bottom: 24px; border-radius: 4px; }
    .alert-banner p { margin: 0; font-size: 14px; font-weight: 600; color: #991b1b; }
    .section-title { font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; color: #737373; margin-bottom: 14px; }
    table { width: 100%; border-collapse: collapse; margin-bottom: 24px; }
    table td { padding: 12px 14px; border-bottom: 1px solid #f0f0f0; font-size: 14px; }
    table td.label { font-weight: 600; color: #525252; width: 35%; background: #fafafa; }
    table td.value { color: #0D0D0D; font-weight: 500; }
    .message-box { background: #fafafa; border: 1px solid #e5e5e5; border-radius: 8px; padding: 16px; margin-bottom: 24px; font-size: 14px; line-height: 1.6; color: #333; }
    .cta-container { text-align: center; margin-top: 28px; padding-top: 20px; border-top: 1px solid #f0f0f0; }
    .btn-whatsapp { display: inline-block; background: #25D366; color: #ffffff !important; text-decoration: none; padding: 12px 24px; border-radius: 8px; font-weight: 700; font-size: 14px; margin-right: 10px; }
    .btn-reply { display: inline-block; background: #0D0D0D; color: #ffffff !important; text-decoration: none; padding: 12px 24px; border-radius: 8px; font-weight: 700; font-size: 14px; }
    .footer { background: #fafafa; padding: 18px 24px; text-align: center; font-size: 12px; color: #737373; border-top: 1px solid #f0f0f0; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>FORROS SKY</h1>
      <p>Tapicería Automotriz & Protección · Barranquilla</p>
    </div>

    <div class="content">
      <div class="alert-banner">
        <p>🔔 ¡Has recibido una nueva solicitud de cotización desde la página web de Forros Sky!</p>
      </div>

      <div class="section-title">DATOS DEL CLIENTE</div>

      <table>
        <tr>
          <td class="label">ID Solicitud</td>
          <td class="value"><strong>${request.id}</strong></td>
        </tr>
        <tr>
          <td class="label">Nombre completo</td>
          <td class="value"><strong>${request.nombre}</strong></td>
        </tr>
        <tr>
          <td class="label">Teléfono / WhatsApp</td>
          <td class="value"><a href="tel:${request.telefono}" style="color: #D92B2B; font-weight: 600;">${request.telefono}</a></td>
        </tr>
        <tr>
          <td class="label">Correo electrónico</td>
          <td class="value"><a href="mailto:${request.email}" style="color: #0D0D0D;">${request.email}</a></td>
        </tr>
        <tr>
          <td class="label">Vehículo</td>
          <td class="value"><strong>${request.vehiculo}</strong></td>
        </tr>
        <tr>
          <td class="label">Servicio solicitado</td>
          <td class="value" style="color: #D92B2B; font-weight: 700;">${request.servicio}</td>
        </tr>
        <tr>
          <td class="label">Fecha y hora</td>
          <td class="value">${request.fechaFormateada}</td>
        </tr>
      </table>

      ${
        request.mensaje
          ? `
        <div class="section-title">DETALLES ADICIONALES</div>
        <div class="message-box">
          ${request.mensaje.replace(/\n/g, '<br>')}
        </div>
      `
          : ''
      }

      <div class="cta-container">
        <a href="https://wa.me/${request.telefono.replace(/\D/g, '')}?text=Hola%20${encodeURIComponent(request.nombre)},%20te%20escribimos%20de%20Forros%20Sky%20respecto%20a%20tu%20solicitud%20para%20${encodeURIComponent(request.vehiculo)}" class="btn-whatsapp" target="_blank">
          Contactar por WhatsApp
        </a>
        <a href="mailto:${request.email}?subject=Cotizaci%C3%B3n%20Forros%20Sky%20para%20${encodeURIComponent(request.vehiculo)}" class="btn-reply">
          Responder por Correo
        </a>
      </div>
    </div>

    <div class="footer">
      Mensaje automático generado desde la landing page oficial de <strong>Forros Sky</strong>.<br>
      Calle 74 # 43 - 28, Barrio El Prado, Barranquilla, Atlántico.
    </div>
  </div>
</body>
</html>
  `.trim();

  try {
    // Send using Resend API (standard, recommended transactional email provider)
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: fromEmail,
        to: [adminEmail],
        subject,
        text: textContent,
        html: htmlContent,
        reply_to: request.email,
      }),
    });

    const data = await response.json().catch(() => ({}));

    if (response.ok) {
      console.log(`[NOTIFICACIÓN EMAIL] Correo enviado exitosamente a ${adminEmail}. ID: ${data.id || 'ok'}`);
      return {
        success: true,
        status: 'enviado',
        detail: `Enviado a ${adminEmail} (ID: ${data.id || 'ok'})`,
      };
    } else {
      const errorMsg = data.message || `HTTP ${response.status}: ${JSON.stringify(data)}`;
      console.error(`[NOTIFICACIÓN EMAIL ERROR] Falló el envío de correo:`, errorMsg);
      return {
        success: false,
        status: 'fallido',
        detail: errorMsg,
      };
    }
  } catch (err: any) {
    const errorMsg = err?.message || 'Error de conexión al proveedor de correo';
    console.error(`[NOTIFICACIÓN EMAIL ERROR]`, err);
    return {
      success: false,
      status: 'fallido',
      detail: errorMsg,
    };
  }
}
