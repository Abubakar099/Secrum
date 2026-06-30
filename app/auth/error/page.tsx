import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import Link from 'next/link'

export default function AuthErrorPage() {
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Authentication Error</CardTitle>
            <CardDescription>
              Something went wrong during authentication
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-4">
              <p className="text-sm text-gray-600">
                There was an error processing your authentication request. Please try again.
              </p>
              <div className="flex gap-2">
                <Link
                  href="/auth/login"
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 text-center"
                >
                  Back to Login
                </Link>
                <Link
                  href="/auth/sign-up"
                  className="flex-1 px-4 py-2 border border-blue-600 text-blue-600 rounded hover:bg-blue-50 text-center"
                >
                  Sign Up
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
