export type Scope = "nacional" | "internacional";

export type Category = "praia" | "familia" | "feriados" | "resorts" | "a-dois";

export type TravelPackage = {
  slug: string;
  title: string;
  destinationSlug?: string;
  scope: Scope;
  categories: Category[];
  /** ISO date (yyyy-mm-dd) */
  startDate: string;
  endDate: string;
  nights: number;
  departureCity: string;
  summary?: string;
  included: string[];
  hotel?: string;
  hotelDescription?: string;
  priceFrom?: number;
  priceNote?: string;
  paymentConditions?: string;
  importantInfo: string[];
  images: string[];
  featured: boolean;
};

export type Experience = {
  title: string;
  text: string;
  image?: string;
};

export type Destination = {
  slug: string;
  name: string;
  scope: Scope;
  subtitle: string;
  image: string;
  categories: Category[];
  why?: string;
  highlights: string[];
  bestTime?: string;
  experiences: Experience[];
};

export type Testimonial = {
  name: string;
  destination: string;
  text: string;
  image?: string;
};

export type SiteSettings = {
  whatsapp: string;
  phone?: string;
  vipGroupUrl?: string;
  email?: string;
  instagram?: string;
  facebook?: string;
  tiktok?: string;
  address?: string;
  hours?: string;
  cnpj?: string;
  cadastur?: string;
};
