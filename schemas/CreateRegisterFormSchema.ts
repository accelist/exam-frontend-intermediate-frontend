import { z } from "zod";
/**
 * Registration validation schema
 */
export const CreateRegisterFormSchema = z.object({
    email: z.string().email().optional(),
    dateOfBirth: z.string().refine((value)=>{
        const birthDate = new Date(value);
        const currentDate = new Date();
        const minAge = new Date(currentDate.getFullYear() - 14, currentDate.getMonth(), currentDate.getDate());
        return birthDate <= minAge;
    }, {message: "You must be at least 14 years old to register"}).optional(),
    gender: z.string().optional(),
    address: z.string().max(255).optional(),
    username: z.string().max(20).optional(),
    password: z.string().min(8).max(64).optional(),
})

export type CreateRegisterFormType = z.infer<typeof CreateRegisterFormSchema>;