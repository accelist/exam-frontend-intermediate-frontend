import { string, z } from "zod";

export const RegisterSchema = z.object({
    email: string().nonempty({message: 'Email Must Be Filled'}),
    userName: string().nonempty({message: 'Name Must Be Filled'}),
    password: string().nonempty({message: 'Password Must Be Filled'})
})

export type RegisterFormType = z.infer<typeof RegisterSchema>;