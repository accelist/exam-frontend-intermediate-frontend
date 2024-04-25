import { z } from "zod";
/**
 * Login form validation schema
 */
export const CreateLoginFormSchema = z.object({
    email: z.string().nonempty({message: "Enter your account email"}).email(),
    password: z.string().nonempty({message: "Enter your account password"})
})

export type CreateLoginFormType = z.infer<typeof CreateLoginFormSchema>;