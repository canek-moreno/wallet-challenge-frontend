import { z } from "zod";

export const loginResponseDto = z.object({ name: z.string().min(1) });

export const sessionResponseDto = z.object({ name: z.string().min(1), email: z.string() });
