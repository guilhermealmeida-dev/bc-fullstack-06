import { Archievement, OptionsAchievements } from "../types/achievement/archievement";
import { prisma } from "./prisma-client";


// Lista de achievements
const achievements: Archievement[] = [
  { name: OptionsAchievements.FIRST_INSCRIPTION, criterion: "Criar sua primeira conta" },
  { name: OptionsAchievements.FIRST_ACTIVITY_CREATED, criterion: "Criar sua primeira atividade" },
  { name: OptionsAchievements.FIRST_COMPLETED_ACTIVITY, criterion: "Concluir sua primeira atividade" },
  { name: OptionsAchievements.FIRST_APPROVAL, criterion: "Aprovar alguém pela primeira vez" },
  { name: OptionsAchievements.FIRST_CHECKIN, criterion: "Realizar o primeiro check-in em uma atividade" },
];

// Seeder
export async function seedAchievements() {
  for (const achievement of achievements) {
    const existing = await prisma.archievement.findUnique({
      where: { name: achievement.name },
    });

    if (!existing) {
      await prisma.archievement.create({
        data: {
          name: achievement.name,
          criterion: achievement.criterion,
        },
      });
      console.log(`Achievement criado: ${achievement.name}`);
    }
  }
}
