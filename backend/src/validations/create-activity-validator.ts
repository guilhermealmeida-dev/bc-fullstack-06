import { z } from "zod";

export const createActivityValidation = z.object({
  title: z.string(),
  description: z.string(),
  typeId: z.string().uuid(),
  address: z.string().regex(
    /^-?\d+(\.\d+)?,-?\d+(\.\d+)?$/,
    "Endereço deve estar no formato latitude|longitude"
  ),
  scheduledDate: z.coerce.date(),
  private: z.coerce.boolean()
});