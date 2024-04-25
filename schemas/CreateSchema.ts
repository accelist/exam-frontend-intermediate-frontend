import { z } from "zod";

export const CreateFormSchema = z.object({
    id: z.string().optional(),
    description: z.string().nonempty({ message: 'description name is required.' })
        .max(50, { message: 'Product name must be less than 50 characters.' }),
    orderFrom: z.string().nonempty({ message: 'orderFrom is required.' }),
    orderTo: z.string().nonempty({ message: 'orderFrom is required.' }),
    quantity: z.number().min(1, { message: 'Product has to be between 1 and 99' })
    .max(99, { message: 'Product has to be between 1 and 99' }),
    orderedAt: z.date().refine(
        (date) => date !== null && !isNaN(date.getTime()),
        {
            message: 'Date should be filled',
        }
    )
});


export type CreateFormType = z.infer<typeof CreateFormSchema>;