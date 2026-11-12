import { StoredQuoteRequest } from '../db';

interface WhatsAppResult {
  success: boolean;
  status: 'enviado' | 'fallido' | 'no_configurado';
  detail: string;
  messageId?: string;
}

export async function sendWhatsAppNotification(request: StoredQuoteRequest): Promise<WhatsAppResult> {
  const token = process.env.META_WHATSAPP_TOKEN;
  const phoneNumberId = process.env.META_PHONE_NUMBER_ID;
  const recipientRaw = process.env.ADMIN_WHATSAPP || '573022145589';
  const templateName = process.env.META_WHATSAPP_TEMPLATE_NAME;

  // Clean recipient number (digits only, e.g. 573022145589)
  const recipient = recipientRaw.replace(/\D/g, '');

  if (!token || !phoneNumberId) {
    const msg = 'META_WHATSAPP_TOKEN o META_PHONE_NUMBER_ID no configurados en .env. Notificación de WhatsApp omitida.';
    console.warn(`[NOTIFICACIÓN WHATSAPP] ${msg}`);
    return {
      success: false,
      status: 'no_configurado',
      detail: msg,
    };
  }

  // Exact message format requested by the user
  const messageBody = `🔔 ¡NUEVA SOLICITUD DE COTIZACIÓN!

FORROS SKY
Un nuevo cliente ha solicitado información desde nuestra página web.

👤 Nombre: ${request.nombre}
📱 Teléfono: ${request.telefono}
📧 Correo: ${request.email}
🚗 Vehículo: ${request.vehiculo}
🛠️ Servicio: ${request.servicio}
📝 Detalles: ${request.mensaje || 'Ninguno'}
📅 Fecha: ${request.fechaFormateada}

¡Es momento de contactar a este cliente!`;

  try {
    const endpoint = `https://graph.facebook.com/v19.0/${phoneNumberId}/messages`;

    // If template name is provided, use template message type
    let payload: Record<string, any>;

    if (templateName) {
      payload = {
        messaging_product: 'whatsapp',
        to: recipient,
        type: 'template',
        template: {
          name: templateName,
          language: { code: 'es' },
          components: [
            {
              type: 'body',
              parameters: [
                { type: 'text', text: request.nombre },
                { type: 'text', text: request.telefono },
                { type: 'text', text: request.vehiculo },
                { type: 'text', text: request.servicio },
                { type: 'text', text: request.fechaFormateada },
              ],
            },
          ],
        },
      };
    } else {
      // Standard text message format (supported for business-to-admin communications or test numbers)
      payload = {
        messaging_product: 'whatsapp',
        recipient_type: 'individual',
        to: recipient,
        type: 'text',
        text: {
          preview_url: false,
          body: messageBody,
        },
      };
    }

    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    const data = await response.json().catch(() => ({}));

    if (response.ok && data.messages && data.messages.length > 0) {
      const msgId = data.messages[0].id;
      console.log(`[NOTIFICACIÓN WHATSAPP] Notificación enviada con éxito a ${recipient}. Message ID: ${msgId}`);
      return {
        success: true,
        status: 'enviado',
        detail: `Enviado a +${recipient} (ID: ${msgId})`,
        messageId: msgId,
      };
    } else {
      const errorMsg = data?.error?.message || `HTTP ${response.status}: ${JSON.stringify(data)}`;
      console.error(`[NOTIFICACIÓN WHATSAPP ERROR] Falló el envío de WhatsApp:`, errorMsg);
      return {
        success: false,
        status: 'fallido',
        detail: `Error Meta API: ${errorMsg}`,
      };
    }
  } catch (err: any) {
    const errorMsg = err?.message || 'Error de conexión a Meta WhatsApp Cloud API';
    console.error(`[NOTIFICACIÓN WHATSAPP ERROR]`, err);
    return {
      success: false,
      status: 'fallido',
      detail: errorMsg,
    };
  }
}
