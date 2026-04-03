import {z} from "zod";

export const registerSchema = z.object({
    username: z.string().max(255).lowercase().trim(),
    email: z.string().email().max(255).lowercase().trim(),
    password: z.string().min(8, "Password much be of min 8 letters.").max(255),
});

export const loginSchema = z.object({
    email: z.string().email().max(255).lowercase().trim(),
    password: z.string().min(8, "Password much be of min 8 letters.").max(255),
})