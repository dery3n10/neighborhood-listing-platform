export interface Property {
  id: string;
  title: string;
  streetAddress: string;
  city: string;
  state: string;
  zipCode: string;
  price: number;
  bedrooms: number;
  bathrooms: number;
  squareFootage: number;
  imageSrc: string;
  imageAlt: string;
  detailsUrl: string;
}

export interface Sponsor {
  id: string;
  businessName: string;
  imageSrc: string;
  imageAlt: string;
  websiteUrl: string;
}