import { number, string, z } from "zod";

export const CreateSchema = z.object({
    description: string().nonempty({message:'Description Must Be Filled'}).max(100, {message:'Maximun 100 Characters'}),
    orderFrom: string().nonempty({message:'Order From Must Be Filled'}).min(1, {message:'Minimum 1 Characters'}),
    orderTo: string().nonempty({message:'Order To Must Be Filled'}).min(1, {message:'Minimum 1 Characters'}),
    orderedAt: string().datetime(),
    quantity: number().min(1, {message:'Minimum 1'}).max(100, {message:'Maximun 100'})
})

export type CreateFormType = z.infer<typeof CreateSchema>;