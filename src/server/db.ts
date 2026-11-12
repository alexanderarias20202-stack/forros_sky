import fs from 'fs';
import path from 'path';
import crypto from 'crypto';

export interface StoredQuoteRequest {
  id: string;
  nombre: string;
  telefono: string;
  email: string;
  vehiculo: string;
  servicio: string;
  mensaje: string;
  fechaCreacion: string;
  fechaFormateada: string;
  ip?: string;
  userAgent?: string;
  estadoEmail: 'pendiente' | 'enviado' | 'fallido' | 'no_configurado';
  detalleEmail?: string;
  estadoWhatsApp: 'pendiente' | 'enviado' | 'fallido' | 'no_configurado';
  detalleWhatsApp?: string;
}

const DATA_DIR = process.env.VERCEL ? path.join('/tmp', 'data') : path.resolve('data');
const DB_FILE = path.join(DATA_DIR, 'quote-requests.json');

// Ensure data directory and file exist
function initDB() {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    if (!fs.existsSync(DB_FILE)) {
      fs.writeFileSync(DB_FILE, JSON.stringify([], null, 2), 'utf8');
    }
  } catch (err) {
    console.warn('Could not initialize DB in current path, fallback to memory or tmp:', err);
  }
}

initDB();

/**
 * Read all requests from disk
 */
export function getAllQuoteRequests(): StoredQuoteRequest[] {
  try {
    initDB();
    const content = fs.readFileSync(DB_FILE, 'utf8');
    return JSON.parse(content || '[]');
  } catch (err) {
    console.error('Error reading quote requests database:', err);
    return [];
  }
}

/**
 * Save a new quote request.
 * Saves immediately to disk before notification processing so no customer lead is lost.
 */
export function saveQuoteRequest(data: {
  nombre: string;
  telefono: string;
  email: string;
  vehiculo: string;
  servicio: string;
  mensaje?: string;
  ip?: string;
  userAgent?: string;
}): StoredQuoteRequest {
  initDB();
  const requests = getAllQuoteRequests();

  const now = new Date();
  // Format in Colombian time (America/Bogota, UTC-5)
  const fechaFormateada = now.toLocaleString('es-CO', {
    timeZone: 'America/Bogota',
    dateStyle: 'full',
    timeStyle: 'medium',
  });

  const newRecord: StoredQuoteRequest = {
    id: `FS-${Date.now().toString(36).toUpperCase()}-${crypto.randomBytes(2).toString('hex').toUpperCase()}`,
    nombre: data.nombre.trim(),
    telefono: data.telefono.trim(),
    email: data.email.trim().toLowerCase(),
    vehiculo: data.vehiculo.trim(),
    servicio: data.servicio.trim(),
    mensaje: (data.mensaje || '').trim(),
    fechaCreacion: now.toISOString(),
    fechaFormateada,
    ip: data.ip,
    userAgent: data.userAgent,
    estadoEmail: 'pendiente',
    estadoWhatsApp: 'pendiente',
  };

  requests.unshift(newRecord);

  // Write atomically using temporary file
  const tmpFile = `${DB_FILE}.tmp`;
  fs.writeFileSync(tmpFile, JSON.stringify(requests, null, 2), 'utf8');
  fs.renameSync(tmpFile, DB_FILE);

  return newRecord;
}

/**
 * Update notification delivery status for a stored request
 */
export function updateNotificationStatus(
  id: string,
  updates: {
    estadoEmail?: StoredQuoteRequest['estadoEmail'];
    detalleEmail?: string;
    estadoWhatsApp?: StoredQuoteRequest['estadoWhatsApp'];
    detalleWhatsApp?: string;
  }
): StoredQuoteRequest | null {
  initDB();
  const requests = getAllQuoteRequests();
  const index = requests.findIndex((r) => r.id === id);

  if (index === -1) return null;

  requests[index] = {
    ...requests[index],
    ...updates,
  };

  const tmpFile = `${DB_FILE}.tmp`;
  fs.writeFileSync(tmpFile, JSON.stringify(requests, null, 2), 'utf8');
  fs.renameSync(tmpFile, DB_FILE);

  return requests[index];
}
