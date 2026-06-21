import { z } from "zod";

export const UpdateActivityValidation = z.object({
  title: z.string().nullish(),
  description: z.string().nullish(),
  typeId: z.string().uuid().nullish(),
  address: z.string().regex(
    /^-?\d+(\.\d+)?,-?\d+(\.\d+)?$/,
    "Endereço deve estar no formato latitude|longitude"
  ).nullish(),
  scheduledDate: z.coerce.date().nullish(),
  private: z.coerce.boolean().nullish()
});