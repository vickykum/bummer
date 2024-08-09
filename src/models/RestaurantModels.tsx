
export interface Restaurant {
    name: string;
    id?: string;
    address: Address;
    lat: number;
    lon: number;
    brand?: string;
    url?: string;
    website?: string;
    serviceType?: string;
    takeaway?: string;
    phone?: string;
    hours?: string;
    rating?: string;
    category?: string;
  }

export interface Address {
  housenumber?: string;
  housename?: string;
  street: string;
  city?: string;
  postcode?: string;
  country?: string;
  suburb?: string;
  state?: string;
  province?: string;
  floor?: string;
}