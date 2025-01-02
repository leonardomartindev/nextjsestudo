"use server";
import bcrypt from "bcrypt";
import prisma from "@/src/lib/db";
import { createSession } from "@/src/lib/session";
import { redirect } from "next/navigation";
import { LoginFormSchema } from "@/src/lib/definitions";

export async function login(state: any, formData: FormData) {
  const validationResult = LoginFormSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });
  if (!validationResult.success) {
    return {
      errors: validationResult.error.flatten().fieldErrors,
    };
  }

  const { email, password } = validationResult.data

  const user = await prisma.user.findUnique({where: {email}})

  if(!user) {
    return {
        errors: { email: 'Usuário ou senha inválidos'}
    };
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if(!isPasswordValid) {
    return {
        errors: { password: 'Usuário ou senha inválidos.'}
    }
  }

  await createSession(String(user.id), user.userRole === 'admin' ? 'admin' : 'user');
  redirect('/dashboard')

}
