import 'server-only'
import { SignJWT, jwtVerify } from 'jose'
import { SessionPayload } from './definitions'
import { cookies } from 'next/headers'

const secretKey = process.env.SECRET
const encodeKey = new TextEncoder().encode(secretKey)

export async function encrypt(payload: SessionPayload){
    return new SignJWT(payload)
        .setProtectedHeader({alg: 'HS256'})
        .setIssuedAt()
        .setExpirationTime('7d')
        .sign(encodeKey)
}

export async function decrypt(session: string | undefined = '') {

    if (!session) {
        return null;
    }

    try {
        const { payload } = await jwtVerify(session, encodeKey, {
            algorithms: ['HS256'],
        })
        return payload as SessionPayload
    } catch (error) {
        console.log('Failed to verify session')
    }
}

export async function createSession(userId: string,  userRole: 'user' | 'admin') {
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
    const session = await encrypt({userId, expiresAt, userRole})
    const cookieStore = await cookies()

    cookieStore.set('session', session, {
        httpOnly: true, 
        secure: true,
        expires: expiresAt,
        sameSite: 'lax',
        path: '/',
    })
}

export async function deleteSession() {
  const cookieStore = await cookies()
  cookieStore.delete('session')
}