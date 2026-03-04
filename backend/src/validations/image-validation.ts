import { z } from "zod";

const imageValidation = z
  .object({
    buffer: z.instanceof(Buffer),
    mimetype: z.string(),
    size: z.number()
  })
  .refine(
    (file) =>
      ["image/jpeg", "image/png"].includes(file.mimetype),
    {
      message: "A imagem deve ser um arquivo PNG ou JPG"
    }
  )
  .refine(
    (file) => file.size <= 5 * 1024 * 1024,
    {
      message: "A imagem deve ter no máximo 5MB"
    }
  );

export default imageValidation;