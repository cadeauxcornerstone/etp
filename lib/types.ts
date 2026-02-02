// User Types
export type UserRole = "attendee" | "organizer" | "admin" | "scanner";

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  role: UserRole;
  isVerified: boolean;
  createdAt: Date;
  avatar?: string;
}

// Event Types
export type EventCategory =
  | "music"
  | "sports"
  | "arts"
  | "food"
  | "business"
  | "tech"
  | "community"
  | "nightlife";

export interface EventVenue {
  name: string;
  address: string;
  city: string;
  mapUrl?: string;
}

export interface TicketType {
  id: string;
  name: string;
  description: string;
  price: number;
  quantity: number;
  sold: number;
  maxPerOrder: number;
}

export interface Event {
  id: string;
  title: string;
  description: string;
  shortDescription: string;
  category: EventCategory;
  venue: EventVenue;
  date: Date;
  endDate?: Date;
  imageUrl: string;
  organizerId: string;
  organizerName: string;
  organizerLogo?: string;
  ticketTypes: TicketType[];
  isFeatured: boolean;
  isPublished: boolean;
  createdAt: Date;
}

// Ticket Types
export type TicketStatus = "valid" | "used" | "expired" | "cancelled";

export interface Ticket {
  id: string;
  eventId: string;
  event: Event;
  userId: string;
  ticketTypeId: string;
  ticketTypeName: string;
  purchaseDate: Date;
  qrCode: string;
  status: TicketStatus;
  price: number;
}

// Order Types
export interface OrderItem {
  ticketTypeId: string;
  ticketTypeName: string;
  quantity: number;
  price: number;
}

export interface Order {
  id: string;
  userId: string;
  eventId: string;
  items: OrderItem[];
  total: number;
  status: "pending" | "completed" | "failed" | "refunded";
  createdAt: Date;
}

// Analytics Types
export interface SalesData {
  date: string;
  revenue: number;
  tickets: number;
}

export interface EventAnalytics {
  totalRevenue: number;
  totalTicketsSold: number;
  totalAttendees: number;
  salesByDate: SalesData[];
  ticketTypeBreakdown: {
    name: string;
    sold: number;
    revenue: number;
  }[];
}

// Payout Types
export interface Payout {
  id: string;
  organizerId: string;
  amount: number;
  status: "pending" | "processing" | "completed" | "failed";
  requestedAt: Date;
  completedAt?: Date;
}

// Scan Types
export interface ScanResult {
  success: boolean;
  message: string;
  ticket?: Ticket;
  status: "valid" | "invalid" | "already_used" | "expired";
}
