import {z} from "zod";

export const reviewSchema = z.object({
    rating: z.number().min(1).max(5).optional(),
    comment: z.string().max(255).trim().optional(),
}).refine(
    (data) => data.rating !== undefined || data.comment !== undefined,
    {
        message: "Either rating or comment must be provided",
    }
);