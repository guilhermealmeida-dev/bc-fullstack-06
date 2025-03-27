import { z } from "zod";

const imageValidation = z.object({
    buffer: z.instanceof(Buffer), // Verifica que o arquivo é um Buffer
    mimetype: z.string(), // Verifica que o mimetype é uma string
  }).refine((file) => {
    const mimeType = file.mimetype;
    return mimeType === "image/jpeg" || mimeType === "image/png"; // Verifica se é JPG ou PNG
  }, "A imagem deve ser um arquivo PNG ou JPG");
export default imageValidation;