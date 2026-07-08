import { cookies } from "next/headers"
import { decodeToken } from "./jwt"

export async function verifyAdmin() {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get("auth-token")?.value

    if (!token) {
      return null
    }

    const decoded = decodeToken(token)

    if (!decoded || !decoded.isAdmin) {
      return null
    }

    return decoded
  } catch (error) {
    console.error("[v0] Error verifying admin:", error)
    return null
  }
}

export async function verifyAuth() {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get("auth-token")?.value

    if (!token) {
      return null
    }

    const decoded = decodeToken(token)

    if (!decoded) {
      return null
    }

    return decoded
  } catch (error) {
    console.error("[v0] Error verifying auth:", error)
    return null
  }
}
