import { Activity } from "@/types/activity";
export const listActivityTypes = [
  {
    id: "1",
    name: "Running",
    image: "https://example.com/running.png",
  },
  {
    id: "2",
    name: "Swimming",
    image: "https://example.com/swimming.png",
  },
  {
    id: "3",
    name: "Cycling",
    image: "https://example.com/cycling.png",
  },
  {
    id: "4",
    name: "Running",
    image: "https://example.com/running.png",
  },
  {
    id: "5",
    name: "Swimming",
    image: "https://example.com/swimming.png",
  },
  {
    id: "6",
    name: "Cycling",
    image: "https://example.com/cycling.png",
  },
  {
    id: "7",
    name: "Running",
    image: "https://example.com/running.png",
  },
  {
    id: "8",
    name: "Swimming",
    image: "https://example.com/swimming.png",
  },
  {
    id: "9",
    name: "Cycling",
    image: "https://example.com/cycling.png",
  },
];

export const listActivities: Activity[] = [
  {
    id: "1",
    title: "Corrida na praia",
    description: "Atividade leve para melhorar resistência e condicionamento físico.",
    type: "Running",
    image:
      "https://images.unsplash.com/photo-1541534401786-2077eed87a74?auto=format&fit=crop&w=800&q=80",
    confirmationCode: "ACT-001",
    participantCount: 18,
    address: {
      latitude: "-23.5505",
      longitude: "-46.6333",
    },
    scheduledDate: new Date("2023-06-01T18:00:00"),
    createdAt: "2023-05-20T10:00:00Z",
    completedAt: new Date("2023-06-01T19:30:00"),
    private: true,
    creator: {
      id: "c1",
      name: "Ana Souza",
      avatar:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80",
    },
    userSubscriptionStatus: "confirmed",
  },
  {
    id: "2",
    title: "Natação em grupo",
    description: "Aula de natação para todos os níveis com foco em técnica e relaxamento.",
    type: "Swimming",
    image:
      "https://images.unsplash.com/photo-1437622368342-7a3d73a34c8f?auto=format&fit=crop&w=800&q=80",
    confirmationCode: "ACT-002",
    participantCount: 12,
    address: {
      latitude: "-23.5613",
      longitude: "-46.6564",
    },
    scheduledDate: new Date("2023-06-02T07:30:00"),
    createdAt: "2023-05-21T12:00:00Z",
    completedAt: new Date("2023-06-02T08:30:00"),
    private: true,
    creator: {
      id: "c2",
      name: "Bruno Lima",
      avatar:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80",
    },
    userSubscriptionStatus: "pending",
  },
  {
    id: "3",
    title: "Pedal urbano",
    description: "Passeio de bicicleta pelo centro da cidade com parada para hidratação.",
    type: "Cycling",
    image:
      "https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&w=800&q=80",
    confirmationCode: "ACT-003",
    participantCount: 23,
    address: {
      latitude: "-23.5400",
      longitude: "-46.6400",
    },
    scheduledDate: new Date("2023-06-03T16:00:00"),
    createdAt: "2023-05-22T09:00:00Z",
    completedAt: new Date("2023-06-03T17:45:00"),
    private: false,
    creator: {
      id: "c3",
      name: "Carla Mendes",
      avatar:
        "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=400&q=80",
    },
    userSubscriptionStatus: "confirmed",
  },
  {
    id: "4",
    title: "Caminhada matinal",
    description: "Trilha leve para alongamento, respiração e socialização.",
    type: "Walking",
    image:
      "https://images.unsplash.com/photo-1551632811-561732d1e306?auto=format&fit=crop&w=800&q=80",
    confirmationCode: "ACT-004",
    participantCount: 15,
    address: {
      latitude: "-23.5687",
      longitude: "-46.6488",
    },
    scheduledDate: new Date("2023-06-04T06:30:00"),
    createdAt: "2023-05-23T08:00:00Z",
    completedAt: new Date("2023-06-04T07:30:00"),
    private: false,
    creator: {
      id: "c4",
      name: "Diego Rocha",
      avatar:
        "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=400&q=80",
    },
    userSubscriptionStatus: "confirmed",
  },
  {
    id: "5",
    title: "Yoga ao ar livre",
    description: "Sessão de yoga com foco em flexibilidade e relaxamento muscular.",
    type: "Yoga",
    image:
      "https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=800&q=80",
    confirmationCode: "ACT-005",
    participantCount: 20,
    address: {
      latitude: "-23.5731",
      longitude: "-46.6390",
    },
    scheduledDate: new Date("2023-06-05T08:00:00"),
    createdAt: "2023-05-24T11:00:00Z",
    completedAt: new Date("2023-06-05T09:10:00"),
    private: false,
    creator: {
      id: "c5",
      name: "Evelyn Costa",
      avatar:
        "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80",
    },
    userSubscriptionStatus: "pending",
  },
  {
    id: "6",
    title: "Pilates funcional",
    description: "Treino focado em mobilidade, postura e fortalecimento do core.",
    type: "Pilates",
    image:
      "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=800&q=80",
    confirmationCode: "ACT-006",
    participantCount: 10,
    address: {
      latitude: "-23.5585",
      longitude: "-46.6511",
    },
    scheduledDate: new Date("2023-06-06T19:00:00"),
    createdAt: "2023-05-25T10:00:00Z",
    completedAt: new Date("2023-06-06T20:00:00"),
    private: false,
    creator: {
      id: "c6",
      name: "Fernanda Reis",
      avatar:
        "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=400&q=80",
    },
    userSubscriptionStatus: "confirmed",
  },
  {
    id: "7",
    title: "Basquete de rua",
    description: "Partida amistosa com foco em trabalho em equipe e ritmo.",
    type: "Basketball",
    image:
      "https://images.unsplash.com/photo-1547347298-4074fc3086f0?auto=format&fit=crop&w=800&q=80",
    confirmationCode: "ACT-007",
    participantCount: 8,
    address: {
      latitude: "-23.5649",
      longitude: "-46.6382",
    },
    scheduledDate: new Date("2023-06-07T18:30:00"),
    createdAt: "2023-05-26T07:00:00Z",
    completedAt: new Date("2023-06-07T19:45:00"),
    private: false,
    creator: {
      id: "c7",
      name: "Gabriel Nunes",
      avatar:
        "https://images.unsplash.com/photo-1504593811423-6dd665756598?auto=format&fit=crop&w=400&q=80",
    },
    userSubscriptionStatus: "confirmed",
  },
  {
    id: "8",
    title: "Treino de tênis",
    description: "Sessão de tênis com drills focados em saque e movimentação.",
    type: "Tennis",
    image:
      "https://images.unsplash.com/photo-1554068865-24cecd4e34b8?auto=format&fit=crop&w=800&q=80",
    confirmationCode: "ACT-008",
    participantCount: 6,
    address: {
      latitude: "-23.5450",
      longitude: "-46.6352",
    },
    scheduledDate: new Date("2023-06-08T17:00:00"),
    createdAt: "2023-05-27T15:00:00Z",
    completedAt: new Date("2023-06-08T18:10:00"),
    private: false,
    creator: {
      id: "c8",
      name: "Henrique Silva",
      avatar:
        "https://images.unsplash.com/photo-1504593811423-6dd665756598?auto=format&fit=crop&w=400&q=80",
    },
    userSubscriptionStatus: "pending",
  },
  {
    id: "9",
    title: "Boxe funcional",
    description: "Treino intenso com circuito de explosão, resistência e coordenação.",
    type: "Boxing",
    image:
      "https://images.unsplash.com/photo-1549719386-74dfcbf7dbef?auto=format&fit=crop&w=800&q=80",
    confirmationCode: "ACT-009",
    participantCount: 14,
    address: {
      latitude: "-23.5720",
      longitude: "-46.6608",
    },
    scheduledDate: new Date("2023-06-09T20:00:00"),
    createdAt: "2023-05-28T14:00:00Z",
    completedAt: new Date("2023-06-09T21:15:00"),
    private: false,
    creator: {
      id: "c9",
      name: "Isabela Torres",
      avatar:
        "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=400&q=80",
    },
    userSubscriptionStatus: "confirmed",
  },
];
