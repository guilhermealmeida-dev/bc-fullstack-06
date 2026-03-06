export enum OptionsAchievements {
  FIRST_INSCRIPTION = "Iniciante",
  FIRST_ACTIVITY_CREATED = "Pioneiro",
  FIRST_COMPLETED_ACTIVITY = "Conquistador",
  FIRST_APPROVAL = "Avaliador",
  FIRST_CHECKIN = "Explorador"
}

export type Archievement = {
  id?: string;
  name: OptionsAchievements | string;
  criterion: string;
};