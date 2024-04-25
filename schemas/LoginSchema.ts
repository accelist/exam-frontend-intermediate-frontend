import { z } from "zod";

export const LoginFormSchema = z.object({
    id: z.string().optional(),
    email: z.string().optional(),
    username: z.string().optional(),
    password: z.string().nonempty({ message: 'Password is required.' })
});


export type LoginFormType = z.infer<typeof LoginFormSchema>;