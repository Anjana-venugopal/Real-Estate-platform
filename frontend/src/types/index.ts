export interface User {
  id: string;
  name: string;
  email: string;
}

export interface Property {
  _id: string;
  title: string;
  propertyType: 'Flat' | 'Villa' | 'Plot' | 'Commercial';
  listingType: 'For Sale' | 'For Rent';
  location: string;
  price: number;
  areaSqFt: number;
  bedrooms: number;
  bathrooms: number;
  description: string;
  contactPhone: string;
  googleMapsLink?: string;
  amenities: string[];
  images: string[];
  owner: string | User;
}