import jwt from 'jsonwebtoken'

const SECRET = process.env.JWT_SECRET || 'your-secret-key'

export interface JWTPayload {
  userId: string
  email: string
  isAdmin: boolean
}

export function generateToken(payload: JWTPayload, expiresIn = '7d'): string {
  return jwt.sign(payload, SECRET, { expiresIn })
}

export function verifyToken(token: string): JWTPayload | null {
  try {
    return jwt.verify(token, SECRET) as JWTPayload
  } catch (error) {
    console.error('[v0] Token verification failed:', error)
    return null
  }
}

export function decodeToken(token: string): JWTPayload | null {
  try {
    return jwt.decode(token) as JWTPayload
  } catch (error) {
    console.error('[v0] Token decode failed:', error)
    return null
  }
}
