import { atom } from "jotai";

const registeredEmailsAtom = atom<string[]>([]);

export default registeredEmailsAtom;