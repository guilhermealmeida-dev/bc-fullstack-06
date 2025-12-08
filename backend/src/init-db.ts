import { prisma } from "./prisma/prisma-client";

async function main() {
  console.log("Iniciando seed do banco...");

  //
  // 1) Criar usuários
  //
  await prisma.user.createMany({
    data: [
      {
        name: "Guilherme Silva",
        email: "guilherme1@example.com",
        cpf: "11111111111",
        password: "senha123",
        avatar: "https://picsum.photos/200?u=1"
      },
      {
        name: "Mariana Souza",
        email: "mariana@example.com",
        cpf: "22222222222",
        password: "senha123",
        avatar: "https://picsum.photos/200?u=2"
      },
      {
        name: "Carlos Pereira",
        email: "carlos@example.com",
        cpf: "33333333333",
        password: "senha123",
        avatar: "https://picsum.photos/200?u=3"
      }
    ]
  });

  const userList = await prisma.user.findMany();
  console.log("Usuários criados:", userList.length);

  //
  // 2) Criar 5 tipos de atividades
  //
  const activityTypesData = [
    {
      name: "Esportes",
      description: "Atividades físicas ao ar livre ou em academias",
      image: "https://picsum.photos/300?e=sports"
    },
    {
      name: "Estudos",
      description: "Atividades de aprendizado e estudo",
      image: "https://picsum.photos/300?e=study"
    },
    {
      name: "Trabalho",
      description: "Reuniões, tarefas e eventos corporativos",
      image: "https://picsum.photos/300?e=work"
    },
    {
      name: "Lazer",
      description: "Atividades recreativas, jogos e diversão",
      image: "https://picsum.photos/300?e=fun"
    },
    {
      name: "Voluntariado",
      description: "Atividades para ajudar a comunidade",
      image: "https://picsum.photos/300?e=volunteer"
    }
  ];

  await prisma.activityType.createMany({
    data: activityTypesData
  });

  const types = await prisma.activityType.findMany();
  console.log("Tipos de atividade criados:", types.length);

  //
  // Modelos de títulos por tipo
  //
  const titleTemplates: Record<string, string[]> = {
    Esportes: [
      "Treino funcional",
      "Corrida ao ar livre",
      "Partida amistosa",
      "Alongamento guiado"
    ],
    Estudos: [
      "Sessão de leitura",
      "Revisão de conteúdo",
      "Estudos guiados",
      "Estudo em grupo"
    ],
    Trabalho: [
      "Reunião de planejamento",
      "Revisão de projeto",
      "Brainstorm corporativo",
      "Workshop interno"
    ],
    Lazer: [
      "Sessão de cinema",
      "Jogo de tabuleiro",
      "Tarde de relaxamento",
      "Maratona de séries"
    ],
    Voluntariado: [
      "Mutirão comunitário",
      "Ação social",
      "Doação coletiva",
      "Ajuda comunitária"
    ]
  };

  //
  // 3) Criar 10 atividades por usuário
  //
  for (const user of userList) {
    for (let i = 1; i <= 10; i++) {
      const activityType = types[Math.floor(Math.random() * types.length)];

      // Escolher um título específico do tipo
      const templates = titleTemplates[activityType.name] ?? ["Atividade"];
      const randomTitle = templates[Math.floor(Math.random() * templates.length)];

      const fullTitle = `${activityType.name} – ${randomTitle} com ${user.name.split(" ")[0]}`;

      const activity = await prisma.activity.create({
        data: {
          title: fullTitle,
          description: `Atividade do tipo ${activityType.name} criada por ${user.name}.`,
          typeId: activityType.id,
          confirmationCode: Math.random().toString(36).substring(2, 10),
          image: "https://picsum.photos/400?random=" + Math.random(),
          sheduledDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * i),
          createdAt: new Date(),
          private: false,
          creatorId: user.id,
          activityAddresse: {
            create: {
              latitude: -23.5 + Math.random(),
              longitude: -46.6 + Math.random()
            }
          }
        }
      });

      console.log(`Atividade criada para ${user.name}: ${activity.title}`);
    }
  }

  console.log("Seed finalizado com sucesso!");
}

main().catch(e => {
  console.error(e);
  process.exit(1);
});
