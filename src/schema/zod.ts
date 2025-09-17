import { object, string, number } from "zod"
import {z} from "zod"

export const signInSchema = object({
    email: string({ error: "Email is required" })
        .min(1, "Email is required")
        .email("Invalid email"),
    password: string({ error: "Password is required" })
        .min(1, "Password is required")
        .min(6, "Password must be more than 8 characters")
        .max(32, "Password must be less than 32 characters"),
})

export const actorsSchema = object({
    name: string().min(1, "Name is required"),
    category: z.enum([
        "DRAMA",
        "HORROR",
        "THRILLER",
        "COMEDY"
    ]),
    year: number({error: "Invalid"})
        .min(0, "Year is required")
})
