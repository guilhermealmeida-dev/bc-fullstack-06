import { Address } from "./address";

export type Activity = {
  id: string;
  title: string;
  description: string;
  type: string;
  image: string;
  confirmationCode: string;
  participantCount: number;
  address: Address;
  scheduledDate: Date;
  createdAt: string;
  completedAt: Date;
  private: boolean;
  creator: Creator;
  userSubscriptionStatus: string;
};

type Creator = {
  id: string;
  name: string;
  avatar: string;
};
