import { atom } from "jotai";

/**
 * Define the product data type.
 */
export interface RegisterData {
    id: string;
    email: string;
    dateOfBirth: Date;
    gender: string;
    address: string;
    username: string;
    password: string;
}

/**
 * Define the product list atom.
 */
const registerListAtom = atom<RegisterData[]>([]);

export default registerListAtom;