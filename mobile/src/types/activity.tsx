export type Activity = {
  id: string;
  title: string;
  description: string;
  type: string;
  image: string;
  participantCount: number;
  scheduledDate: string;
  createdAt: string;
  completedAt: string | null;
  private: boolean;
  address: string | null;
  creator: {
    id: string;
    name: string;
    avatar: string;
  };
};
