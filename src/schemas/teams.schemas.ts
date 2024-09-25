import { z } from "zod";

export const createTeamSchema = z.object({
    name: z.string().min(3).max(50),
}).strict()
