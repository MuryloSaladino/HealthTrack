import { IFormInput } from "@/components/Form/types";
import { z } from "zod";

export const fields:IFormInput[] = [
    { 
        fieldName: "email",
        label: "email",
        zodSchema: z.string().email() 
    },
    { 
        fieldName: "password", 
        label: "password",
        type: "password",
        zodSchema:  z
            .string()
            .min(8, "At least 8 characters")
            .regex(/(?=.*?[A-Z])/, "At least one uppercase letter")
            .regex(/(?=.*?[a-z])/, "At least one lowercase letter")
            .regex(/(?=.*?[0-9])/, "At least one number")
            .regex(/(?=.*?[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).*$/, "At least one special character"),
    },
    {
        fieldName: "confirm",
        label: "confirm password",
        type: "password",
        zodSchema:  z.string(),
    },
    {
        fieldName: "birthdate",
        label: "birthdate",
        type: "date",
    },
    {
        fieldName: "firstName",
        label: "first name",
        zodSchema: z.string().min(3),
    },
    {
        fieldName: "lastName",
        label: "last name",
        zodSchema: z.string().min(3),
    },
]

export const registerSchema = z.object({
    email: z
        .string()
        .email("Choose a valid email format"),
    password: z
        .string()
        .min(8, "At least 8 characters")
        .regex(/(?=.*?[A-Z])/, "At least one uppercase letter")
        .regex(/(?=.*?[a-z])/, "At least one lowercase letter")
        .regex(/(?=.*?[0-9])/, "At least one number")
        .regex(/(?=.*?[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).*$/, { message: "At least one special character" }),
    confirm: z
        .string(),
    details: z.object({
        firstName: z
            .string()
            .min(2, "At least 2 characters"),
        lastName: z 
            .string()
            .min(2, "At least 2 characters"),
        birthdate: z
            .string(),
        profilePicture: z
            .string()
            .nullable()
            .optional()
    }),
}).refine(({ password, confirm }) => password === confirm, {
    message: "Password doesn't match",
    path: ["confirm"],
})

export type IRegisterPayload = z.infer<typeof registerSchema>;
