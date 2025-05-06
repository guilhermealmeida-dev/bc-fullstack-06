import { Achievement } from "./achievement";

export type User = {
  id: string | undefined;
  name: string | undefined;
  email: string | undefined;
  avatar: string | undefined;
  level: number | undefined;
  xp: number | undefined;
  token: string | undefined;
  achievements: Achievement[];
};
