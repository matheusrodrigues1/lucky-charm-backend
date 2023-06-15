import express, { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

console.log(PrismaClient);
import cors from 'cors';

const prisma = new PrismaClient();
const app = express();
const port = process.env.PORT || 3000;

app.use(cors());

app.get('/numero-jogo-do-bicho', async (req: Request, res: Response) => {
  try {
    const numeros = await prisma.jogoDoBicho.findMany();

    if (numeros.length === 0) {
      res.json({ numero: null, nome: null } as unknown as any);
      return;
    }

    const numeroAleatorio = Math.floor(Math.random() * numeros.length);
    const numero = numeros[numeroAleatorio].numero;
    const nome = numeros[numeroAleatorio].nome;

    res.json({ numero, nome });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Ocorreu um erro no servidor' });
  }
});

async function seedDatabase() {
  try {
    await prisma.jogoDoBicho.createMany({
      data: [
        { numero: 1, nome: 'Avestruz' },
        { numero: 2, nome: 'Águia' },
        { numero: 3, nome: 'Burro' },
        { numero: 4, nome: 'Borboleta' },
        { numero: 5, nome: 'Cachorro' },
        { numero: 6, nome: 'Cabra' },
        { numero: 7, nome: 'Carneiro' },
        { numero: 8, nome: 'Camelo' },
        { numero: 9, nome: 'Cobra' },
        { numero: 10, nome: 'Coelho' },
        { numero: 11, nome: 'Cavalo' },
        { numero: 12, nome: 'Elefante' },
        { numero: 13, nome: 'Galo' },
        { numero: 14, nome: 'Gato' },
        { numero: 15, nome: 'Jacaré' },
        { numero: 16, nome: 'Leão' },
        { numero: 17, nome: 'Macaco' },
        { numero: 18, nome: 'Porco' },
        { numero: 19, nome: 'Pavão' },
        { numero: 20, nome: 'Peru' },
        { numero: 21, nome: 'Touro' },
        { numero: 22, nome: 'Tigre' },
        { numero: 23, nome: 'Urso' },
        { numero: 24, nome: 'Veado' },
        { numero: 25, nome: 'Vaca' },
      ],
      skipDuplicates: true,
    });

    console.log('Dados inseridos no banco de dados com sucesso!');
  } catch (error) {
    console.error('Erro ao inserir dados no banco de dados:', error);
  } finally {
    await prisma.$disconnect();
  }
}

seedDatabase().catch(console.error);

app.listen(port, () => {
  console.log('Servidor em execução na porta 3000');
})