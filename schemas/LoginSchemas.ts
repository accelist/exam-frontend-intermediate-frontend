import { string, z } from "zod";

export const LoginSchema = z.object({
    userName: string().nonempty({message: 'Name Must Be Filled'}),
    password: string().nonempty({message: 'Password Must Be Filled'})
})

export type LoginFormType = z.infer<typeof LoginSchema>;