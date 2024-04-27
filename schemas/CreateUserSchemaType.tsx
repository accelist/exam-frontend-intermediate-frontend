import { useAtom } from "jotai";
import {z}  from "zod";

export const CreateUserSchema = z.object({
    email: z.string(),
    birthdayDate: z.date(),
    gender: z.string(),
    address: z.string(),
    username: z.string(),
    password: z.string()
});

export type CreateUserSchemaType = z.infer<typeof CreateUserSchema>