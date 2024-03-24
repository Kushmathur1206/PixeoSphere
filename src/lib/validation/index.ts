import { z } from "zod"

export const Signupvalidation = z.object({
    name: z.string().min(2, {message: 'Too short'}),
    username: z.string().min(2, {message:'Username too short'}),
    email: z.string().email({message:'Enetr a valid email'}),
    password: z.string().min(8, {message:'Password must be atleast 8 charecters'}),
  })

  export const Signinvalidation = z.object({
    email: z.string().email({message:'Enetr a valid email'}),
    password: z.string().min(8, {message:'Password must be atleast 8 charecters'}),
  })

  export const ProfileValidation = z.object({
    file: z.custom<File[]>(),
    name: z.string().min(2, { message: "Name must be at least 2 characters." }),
    username: z.string().min(2, { message: "Name must be at least 2 characters." }),
    email: z.string().email(),
    bio: z.string(),
  });

  export const Postvalidation = z.object({
    caption: z.string().min(0).max(2200),
    file: z.custom<File[]>(),
    location: z.string().min(0).max(2200),
    tags: z.string(),
  })
