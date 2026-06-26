import { Archievement, OptionsAchievements } from "../types/achievement/archievement";
import { prisma } from "./prisma-client";

// SeedAchievements
async function seedAchievements() {
  const achievements: Archievement[] = [
    { 
      name: OptionsAchievements.FIRST_INSCRIPTION, 
      criterion: "Criar sua primeira conta" 
    },
    { 
      name: OptionsAchievements.FIRST_ACTIVITY_CREATED, 
      criterion: "Criar sua primeira atividade" 
    },
    { 
      name: OptionsAchievements.FIRST_COMPLETED_ACTIVITY, 
      criterion: "Concluir sua primeira atividade" 
    },
    { 
      name: OptionsAchievements.FIRST_APPROVAL, 
      criterion: "Aprovar alguém pela primeira vez" 
    },
    { 
      name: OptionsAchievements.FIRST_CHECKIN, 
      criterion: "Realizar o primeiro check-in em uma atividade" 
    },
  ];

  try {
    for (const achievement of achievements) {
      const existing = await prisma.archievement.findUnique({
        where: {
          name: achievement.name,
        },
      });

      if (!existing) {
        await prisma.archievement.create({
          data: achievement,
        });

        console.log(`Achievement criado: ${achievement.name}`);
      } else {
        console.log(`Achievement já existe: ${achievement.name}`);
      }
    }
  } catch (error) {
    console.log("Erro ao realizar seed de achievements", error);
  }
}


// SeedActivityTypes
async function seedActivityTypes() {
  const activityTypes = [
    {
      name: "Esportes",
      description: "Atividades físicas ao ar livre ou em academias",
      image: "https://picsum.photos/300?e=sports",
    },
    {
      name: "Estudos",
      description: "Atividades de aprendizado e estudo",
      image: "https://picsum.photos/300?e=study",
    },
    {
      name: "Trabalho",
      description: "Reuniões, tarefas e eventos corporativos",
      image: "https://picsum.photos/300?e=work",
    },
    {
      name: "Lazer",
      description: "Atividades recreativas, jogos e diversão",
      image: "https://picsum.photos/300?e=fun",
    },
    {
      name: "Voluntariado",
      description: "Atividades para ajudar a comunidade",
      image: "https://picsum.photos/300?e=volunteer",
    },
  ];

  try {
    for (const type of activityTypes) {
      const existing = await prisma.activityType.findUnique({
        where: {
          name: type.name,
        },
      });

      if (!existing) {
        await prisma.activityType.create({
          data: type,
        });

        console.log(`Tipo de atividade criado: ${type.name}`);
      } else {
        console.log(`Tipo de atividade já existe: ${type.name}`);
      }
    }
  } catch (error) {
    console.log("Erro ao realizar seed de tipos de atividades", error);
  }
}

export async function seedDB() {
  await seedAchievements();
  await seedActivityTypes();
}
