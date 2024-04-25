import { z } from "zod";


export const RegisterUserSchema = z.object({
    //Email tidak boleh duplikasi
    email: z.string().nonempty({message: 'Email harus diisi'}).email({message: "Email anda tidak valid"}),

    //Minimal 14 tahun
    birthDate: z.date().min(new Date("2010-01-01"), {message: 'Umur minimal 14 tahun'}),

    //Gender , laki-laki , perempuan , other
    gender: z.enum(["M" , "P" , "Other"]),

    //Maksimal 255 karakter
    address: z.string().max(255, {message: "Alamat maksimal 255 karakter"}),

    //maksimal 20 karakter
    username: z.string().nonempty({message: 'Username harus diisi'}).max(20, {message: "Username maksimal 20 karakter"}),

    //minimal 8 karakter dan maksimal 64 karakter
    password: z.string().min(8 , {message: "Password minimal 8 karakter"}).max(64, {message: "Password maksimal 64 karakter"}),
})

export type RegisterUserType = z.infer<typeof RegisterUserSchema>;