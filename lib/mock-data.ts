import type { Event, Ticket, User, Order, Payout, EventAnalytics } from "./types";

// Mock Users
export const mockUsers: User[] = [
  {
    id: "user-1",
    firstName: "Jean",
    lastName: "Mugabo",
    email: "jean.mugabo@email.com",
    phone: "0788123456",
    role: "attendee",
    isVerified: true,
    createdAt: new Date("2024-01-15"),
  },
  {
    id: "org-1",
    firstName: "Marie",
    lastName: "Uwimana",
    email: "marie@eventspro.rw",
    phone: "0788654321",
    role: "organizer",
    isVerified: true,
    createdAt: new Date("2023-06-10"),
  },
];

// Mock Events
export const mockEvents: Event[] = [
  {
    id: "event-1",
    title: "Kigali Jazz Junction",
    description: "Experience the finest jazz performances in East Africa. Join us for an unforgettable evening of smooth melodies, soulful rhythms, and world-class musicians at the beautiful Kigali Convention Centre. This year's lineup features both local legends and international artists who will take you on a musical journey through the rich history of jazz.\n\nThe evening will include:\n- Live performances from 6 different artists\n- Networking sessions with fellow jazz enthusiasts\n- Premium food and beverage options\n- Meet and greet with performers",
    shortDescription: "An evening of world-class jazz performances featuring local and international artists.",
    category: "music",
    venue: {
      name: "Kigali Convention Centre",
      address: "KG 2 Roundabout",
      city: "Kigali",
      mapUrl: "https://maps.google.com/?q=Kigali+Convention+Centre",
    },
    date: new Date("2026-03-15T18:00:00"),
    endDate: new Date("2026-03-15T23:00:00"),
    imageUrl: "https://images.unsplash.com/photo-1511192336575-5a79af67a629?w=800&h=500&fit=crop",
    organizerId: "org-1",
    organizerName: "Events Pro Rwanda",
    ticketTypes: [
      {
        id: "tt-1-1",
        name: "General Admission",
        description: "Access to main event area",
        price: 15000,
        quantity: 500,
        sold: 342,
        maxPerOrder: 10,
      },
      {
        id: "tt-1-2",
        name: "VIP",
        description: "Premium seating, complimentary drinks, meet & greet",
        price: 50000,
        quantity: 100,
        sold: 67,
        maxPerOrder: 5,
      },
      {
        id: "tt-1-3",
        name: "VVIP Table",
        description: "Private table for 4, bottle service, backstage access",
        price: 200000,
        quantity: 20,
        sold: 12,
        maxPerOrder: 2,
      },
    ],
    isFeatured: true,
    isPublished: true,
    createdAt: new Date("2024-12-01"),
  },
  {
    id: "event-2",
    title: "Rwanda Tech Summit 2026",
    description: "The largest technology conference in Rwanda bringing together innovators, entrepreneurs, and tech leaders from across Africa and beyond. Discover the latest trends in AI, blockchain, fintech, and digital transformation.\n\nKey highlights:\n- 50+ speakers from leading tech companies\n- Startup pitch competition with RWF 10M prize\n- Hands-on workshops and coding sessions\n- Networking with investors and mentors",
    shortDescription: "Africa's premier tech conference featuring 50+ speakers and startup pitch competition.",
    category: "tech",
    venue: {
      name: "Radisson Blu Hotel",
      address: "KN 3 Avenue",
      city: "Kigali",
    },
    date: new Date("2026-04-20T08:00:00"),
    endDate: new Date("2026-04-21T18:00:00"),
    imageUrl: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=500&fit=crop",
    organizerId: "org-2",
    organizerName: "Rwanda ICT Chamber",
    ticketTypes: [
      {
        id: "tt-2-1",
        name: "Standard Pass",
        description: "Full conference access",
        price: 25000,
        quantity: 800,
        sold: 456,
        maxPerOrder: 10,
      },
      {
        id: "tt-2-2",
        name: "Premium Pass",
        description: "Conference + workshops + networking dinner",
        price: 75000,
        quantity: 200,
        sold: 134,
        maxPerOrder: 5,
      },
    ],
    isFeatured: true,
    isPublished: true,
    createdAt: new Date("2024-11-15"),
  },
  {
    id: "event-3",
    title: "Kigali Food Festival",
    description: "Celebrate Rwanda's rich culinary heritage and explore flavors from around the world. Over 50 food vendors, live cooking demonstrations, and entertainment for the whole family.\n\nWhat to expect:\n- Traditional Rwandan cuisine\n- International food stalls\n- Celebrity chef demonstrations\n- Kids zone with activities\n- Live music throughout the day",
    shortDescription: "A celebration of food featuring 50+ vendors and live cooking demonstrations.",
    category: "food",
    venue: {
      name: "Kigali Car Free Zone",
      address: "KN 4 Avenue",
      city: "Kigali",
    },
    date: new Date("2026-03-08T10:00:00"),
    endDate: new Date("2026-03-08T20:00:00"),
    imageUrl: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800&h=500&fit=crop",
    organizerId: "org-3",
    organizerName: "Kigali City Events",
    ticketTypes: [
      {
        id: "tt-3-1",
        name: "Day Pass",
        description: "All-day access to the festival",
        price: 5000,
        quantity: 2000,
        sold: 1245,
        maxPerOrder: 20,
      },
      {
        id: "tt-3-2",
        name: "Family Pack",
        description: "Entry for 2 adults and 2 children",
        price: 15000,
        quantity: 300,
        sold: 189,
        maxPerOrder: 5,
      },
    ],
    isFeatured: false,
    isPublished: true,
    createdAt: new Date("2024-12-10"),
  },
  {
    id: "event-4",
    title: "Amahoro Stadium Concert",
    description: "The biggest music event of the year! Join thousands of fans for an incredible night of performances from top African artists.\n\nLineup includes:\n- Diamond Platnumz\n- Meddy\n- The Ben\n- Knowless Butera\n- Bruce Melodie",
    shortDescription: "The biggest music concert featuring top African artists at Amahoro Stadium.",
    category: "music",
    venue: {
      name: "Amahoro National Stadium",
      address: "KG 5 Avenue",
      city: "Kigali",
    },
    date: new Date("2026-05-01T17:00:00"),
    endDate: new Date("2026-05-01T23:59:00"),
    imageUrl: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=800&h=500&fit=crop",
    organizerId: "org-1",
    organizerName: "Events Pro Rwanda",
    ticketTypes: [
      {
        id: "tt-4-1",
        name: "Regular",
        description: "Standing area access",
        price: 20000,
        quantity: 10000,
        sold: 4523,
        maxPerOrder: 10,
      },
      {
        id: "tt-4-2",
        name: "Premium",
        description: "Premium standing with better view",
        price: 50000,
        quantity: 2000,
        sold: 876,
        maxPerOrder: 8,
      },
      {
        id: "tt-4-3",
        name: "VIP Lounge",
        description: "Exclusive lounge access with open bar",
        price: 150000,
        quantity: 500,
        sold: 234,
        maxPerOrder: 4,
      },
    ],
    isFeatured: true,
    isPublished: true,
    createdAt: new Date("2025-01-05"),
  },
  {
    id: "event-5",
    title: "Rwanda Business Forum",
    description: "Connect with business leaders, investors, and entrepreneurs at Rwanda's premier business networking event. Learn about investment opportunities and economic growth in the region.",
    shortDescription: "Premier business networking event connecting leaders and investors.",
    category: "business",
    venue: {
      name: "Marriott Hotel Kigali",
      address: "KN 3 Avenue",
      city: "Kigali",
    },
    date: new Date("2026-03-25T09:00:00"),
    endDate: new Date("2026-03-25T17:00:00"),
    imageUrl: "https://images.unsplash.com/photo-1591115765373-5207764f72e7?w=800&h=500&fit=crop",
    organizerId: "org-4",
    organizerName: "Rwanda Development Board",
    ticketTypes: [
      {
        id: "tt-5-1",
        name: "Delegate Pass",
        description: "Full conference access and lunch",
        price: 100000,
        quantity: 300,
        sold: 187,
        maxPerOrder: 5,
      },
    ],
    isFeatured: false,
    isPublished: true,
    createdAt: new Date("2025-01-10"),
  },
  {
    id: "event-6",
    title: "Kigali Night Run",
    description: "Experience Kigali like never before with this unique 10km night run through the city's most scenic routes. Glow gear, live DJs at checkpoints, and an amazing after-party await!",
    shortDescription: "A unique 10km night run through Kigali with glow gear and after-party.",
    category: "sports",
    venue: {
      name: "Kigali City Tower",
      address: "Avenue du Commerce",
      city: "Kigali",
    },
    date: new Date("2026-04-12T19:00:00"),
    endDate: new Date("2026-04-12T23:00:00"),
    imageUrl: "https://images.unsplash.com/photo-1552674605-db6ffd4facb5?w=800&h=500&fit=crop",
    organizerId: "org-5",
    organizerName: "Rwanda Athletics Federation",
    ticketTypes: [
      {
        id: "tt-6-1",
        name: "Runner",
        description: "Race entry, t-shirt, medal, and after-party",
        price: 10000,
        quantity: 3000,
        sold: 2134,
        maxPerOrder: 5,
      },
      {
        id: "tt-6-2",
        name: "Spectator",
        description: "After-party access only",
        price: 5000,
        quantity: 1000,
        sold: 456,
        maxPerOrder: 10,
      },
    ],
    isFeatured: false,
    isPublished: true,
    createdAt: new Date("2025-01-20"),
  },
  {
    id: "event-7",
    title: "Art Kigali Exhibition",
    description: "Discover contemporary African art at this exclusive exhibition featuring works from Rwanda's most talented artists. Opening night includes wine reception and artist talks.",
    shortDescription: "Contemporary African art exhibition featuring Rwanda's finest artists.",
    category: "arts",
    venue: {
      name: "Inema Arts Center",
      address: "KG 563 Street",
      city: "Kigali",
    },
    date: new Date("2026-03-20T18:00:00"),
    endDate: new Date("2026-03-30T18:00:00"),
    imageUrl: "https://images.unsplash.com/photo-1536924940846-227afb31e2a5?w=800&h=500&fit=crop",
    organizerId: "org-6",
    organizerName: "Inema Arts Center",
    ticketTypes: [
      {
        id: "tt-7-1",
        name: "General Entry",
        description: "Exhibition access",
        price: 8000,
        quantity: 500,
        sold: 234,
        maxPerOrder: 10,
      },
      {
        id: "tt-7-2",
        name: "Opening Night",
        description: "Opening reception with wine and artist meet",
        price: 25000,
        quantity: 100,
        sold: 78,
        maxPerOrder: 4,
      },
    ],
    isFeatured: false,
    isPublished: true,
    createdAt: new Date("2025-02-01"),
  },
  {
    id: "event-8",
    title: "Kigali Rooftop Party",
    description: "Dance under the stars at Kigali's most exclusive rooftop venue. International DJs, craft cocktails, and breathtaking city views.",
    shortDescription: "Exclusive rooftop party with international DJs and stunning city views.",
    category: "nightlife",
    venue: {
      name: "The Hut Rooftop",
      address: "KN 5 Avenue",
      city: "Kigali",
    },
    date: new Date("2026-03-22T21:00:00"),
    endDate: new Date("2026-03-23T04:00:00"),
    imageUrl: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800&h=500&fit=crop",
    organizerId: "org-7",
    organizerName: "Kigali Nightlife",
    ticketTypes: [
      {
        id: "tt-8-1",
        name: "Early Bird",
        description: "Entry before 11 PM",
        price: 15000,
        quantity: 200,
        sold: 200,
        maxPerOrder: 4,
      },
      {
        id: "tt-8-2",
        name: "Regular",
        description: "Standard entry",
        price: 25000,
        quantity: 300,
        sold: 167,
        maxPerOrder: 4,
      },
      {
        id: "tt-8-3",
        name: "VIP Table",
        description: "Reserved table for 6, bottle included",
        price: 300000,
        quantity: 15,
        sold: 8,
        maxPerOrder: 2,
      },
    ],
    isFeatured: false,
    isPublished: true,
    createdAt: new Date("2025-02-10"),
  },
];

// Mock Tickets for current user
export const mockTickets: Ticket[] = [
  {
    id: "ticket-1",
    eventId: "event-1",
    event: mockEvents[0],
    userId: "user-1",
    ticketTypeId: "tt-1-2",
    ticketTypeName: "VIP",
    purchaseDate: new Date("2025-01-20"),
    qrCode: "TKT-KJJ-2026-VIP-001",
    status: "valid",
    price: 50000,
  },
  {
    id: "ticket-2",
    eventId: "event-3",
    event: mockEvents[2],
    userId: "user-1",
    ticketTypeId: "tt-3-2",
    ticketTypeName: "Family Pack",
    purchaseDate: new Date("2025-01-25"),
    qrCode: "TKT-KFF-2026-FAM-002",
    status: "valid",
    price: 15000,
  },
  {
    id: "ticket-3",
    eventId: "event-6",
    event: mockEvents[5],
    userId: "user-1",
    ticketTypeId: "tt-6-1",
    ticketTypeName: "Runner",
    purchaseDate: new Date("2025-01-15"),
    qrCode: "TKT-KNR-2026-RUN-003",
    status: "valid",
    price: 10000,
  },
];

// Mock Orders
export const mockOrders: Order[] = [
  {
    id: "order-1",
    userId: "user-1",
    eventId: "event-1",
    items: [
      {
        ticketTypeId: "tt-1-2",
        ticketTypeName: "VIP",
        quantity: 1,
        price: 50000,
      },
    ],
    total: 50000,
    status: "completed",
    createdAt: new Date("2025-01-20"),
  },
];

// Mock Payouts for organizers
export const mockPayouts: Payout[] = [
  {
    id: "payout-1",
    organizerId: "org-1",
    amount: 5000000,
    status: "completed",
    requestedAt: new Date("2025-01-01"),
    completedAt: new Date("2025-01-05"),
  },
  {
    id: "payout-2",
    organizerId: "org-1",
    amount: 3500000,
    status: "processing",
    requestedAt: new Date("2025-01-20"),
  },
  {
    id: "payout-3",
    organizerId: "org-1",
    amount: 2000000,
    status: "pending",
    requestedAt: new Date("2025-02-01"),
  },
];

// Mock Analytics
export const mockAnalytics: EventAnalytics = {
  totalRevenue: 21850000,
  totalTicketsSold: 421,
  totalAttendees: 385,
  salesByDate: [
    { date: "2025-01-15", revenue: 1500000, tickets: 45 },
    { date: "2025-01-16", revenue: 2200000, tickets: 67 },
    { date: "2025-01-17", revenue: 1800000, tickets: 52 },
    { date: "2025-01-18", revenue: 3100000, tickets: 89 },
    { date: "2025-01-19", revenue: 2500000, tickets: 72 },
    { date: "2025-01-20", revenue: 4200000, tickets: 96 },
  ],
  ticketTypeBreakdown: [
    { name: "General Admission", sold: 342, revenue: 5130000 },
    { name: "VIP", sold: 67, revenue: 3350000 },
    { name: "VVIP Table", sold: 12, revenue: 2400000 },
  ],
};

// Helper functions
export function formatRWF(amount: number): string {
  return new Intl.NumberFormat("en-RW", {
    style: "currency",
    currency: "RWF",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat("en-RW", {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(date);
}

export function formatTime(date: Date): string {
  return new Intl.DateTimeFormat("en-RW", {
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
}

export function formatDateTime(date: Date): string {
  return `${formatDate(date)} at ${formatTime(date)}`;
}

export function getCategoryLabel(category: string): string {
  const labels: Record<string, string> = {
    music: "Music",
    sports: "Sports",
    arts: "Arts & Culture",
    food: "Food & Drink",
    business: "Business",
    tech: "Technology",
    community: "Community",
    nightlife: "Nightlife",
  };
  return labels[category] || category;
}

export function getCategoryColor(category: string): string {
  const colors: Record<string, string> = {
    music: "bg-pink-500/20 text-pink-400",
    sports: "bg-green-500/20 text-green-400",
    arts: "bg-purple-500/20 text-purple-400",
    food: "bg-orange-500/20 text-orange-400",
    business: "bg-blue-500/20 text-blue-400",
    tech: "bg-cyan-500/20 text-cyan-400",
    community: "bg-yellow-500/20 text-yellow-400",
    nightlife: "bg-indigo-500/20 text-indigo-400",
  };
  return colors[category] || "bg-muted text-muted-foreground";
}
