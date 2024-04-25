import { z } from "zod";

const minAge = 14;
const currentDate = new Date();
const minDate = new Date(currentDate.setFullYear(currentDate.getFullYear() - minAge));

export const RegisterFormSchema = z.object({
    id: z.string().optional(),
    email: z.string().nonempty({ message: 'Email name is required.' })
        .max(50, { message: 'Product name must be less than 50 characters.' }),
    dateOfBirth: z.date()
    .refine(
        (date) => date <= minDate,
        {
            message: `Anda harus berusia minimal ${minAge} tahun.`,
        }
    )
    .refine(
        (date) => date !== null && !isNaN(date.getTime()),
        {
            message: 'Tanggal lahir harus diisi dan harus valid.',
        }
    ),
    gender: z.string().nonempty({ message: 'Gender is required.' }),
    address: z.string().nonempty({ message: 'Address is required.' }),
    username: z.string().nonempty({ message: 'Username is required.' }),
    password: z.string().nonempty({ message: 'Password is required.' })
});


export type RegisterFormType = z.infer<typeof RegisterFormSchema>;