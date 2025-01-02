'use server'
import bcryp from 'bcrypt'
import { SignupFormSchema } from '../../lib/definitions'
import prisma from '@/src/lib/db'
import { createSession } from '@/src/lib/session'
import { redirect } from 'next/navigation'

export async function signup(state, formData: FormData) {
    const validationResult = SignupFormSchema.safeParse({
        name: formData.get('name'),
        email: formData.get('email'),
        password: formData.get('password'),
        
    })
    if (!validationResult.success) {
        return {
            errors: validationResult.error.flatten().fieldErrors
        }
    }

    const { name, email, password } = validationResult.data

    const hashedPassword = await bcryp.hash(password, 10)

    await prisma.user.create({
        data: {
            name,
            email,
            password: hashedPassword,
            userRole: "user"
        }
    })

    const user = await prisma.user.findUnique({where: {email}})

    await createSession(String(user.id), 'user')
    redirect('/dashboard')
    

}