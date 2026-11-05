export type ServiceCategory = 'todos' | 'interior' | 'proteccion' | 'mecanica';

export interface ServiceItem {
  id: string;
  name: string;
  category: 'interior' | 'proteccion' | 'mecanica';
  categoryLabel: string;
  shortDesc: string;
  fullDesc: string;
  benefits: string[];
  materials: string[];
  estimatedTime: string;
  image?: string;
  popular?: boolean;
}

export interface VehicleType {
  id: string;
  name: string;
  iconName: string;
  desc: string;
}

export interface TestimonialItem {
  id: string;
  clientName: string;
  vehicle: string;
  service: string;
  comment: string;
  rating: number;
  date: string;
  location: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: string;
  vehicle: string;
  image: string;
  description: string;
  tag: string;
}

export interface ContactFormData {
  nombre: string;
  telefono: string;
  email: string;
  vehiculo: string;
  servicio: string;
  mensaje: string;
}
