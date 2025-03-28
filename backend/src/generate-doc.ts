import fs from 'fs';
import path from 'path';

//Função para combinar arquivos json da documentação da api
export const combineSwaggerFiles = () => {
  try {
    const swaggerFile = JSON.parse(fs.readFileSync(path.join(__dirname, 'docs', 'main.json'), 'utf8'));
    const componentsFile = JSON.parse(fs.readFileSync(path.join(__dirname, 'docs', 'components.json'), 'utf8'));

    const readJsonFilesFromDirectory = (dirPath: string) => {
      let filesData: any = {}; 

      const files = fs.readdirSync(dirPath);

      files.forEach((file) => {
        const filePath = path.join(dirPath, file);

        if (file.endsWith('.json')) {
          const fileContent = JSON.parse(fs.readFileSync(filePath, 'utf8'));

          filesData = { ...filesData, ...fileContent };
        }
      });

      return filesData;
    };

    const pathsDirectory = path.join(__dirname, 'docs', 'paths');
    const pathsFile = readJsonFilesFromDirectory(pathsDirectory);

    swaggerFile.paths = { ...swaggerFile.paths, ...pathsFile };
    swaggerFile.components = { ...swaggerFile.components, ...componentsFile };

    const outputPath = path.join(__dirname, 'docs', 'swagger.json');
    fs.writeFileSync(outputPath, JSON.stringify(swaggerFile, null, 2));

    console.log('Arquivo combinado gerado com sucesso em', outputPath);
  } catch (error) {
    console.error('Erro ao combinar os arquivos:', error);
  }
};

combineSwaggerFiles();
