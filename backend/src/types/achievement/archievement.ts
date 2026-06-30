export enum OptionsAchievements {
  ACCOUNT_CREATED = "Novato",//ok
  FIRST_INSCRIPTION = "Iniciante",
  FIRST_ACTIVITY_CREATED = "Pioneiro",//ok
  FIRST_COMPLETED_ACTIVITY = "Conquistador",//ok
  FIRST_APPROVAL = "Avaliador",
  FIRST_CHECKIN = "Explorador" //ok
}

export type Archievement = {
  id?: string;
  name: OptionsAchievements | string;
  criterion: string;
};