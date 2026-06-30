import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import Link from 'next/link'

export default function SignUpSuccessPage() {
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Check your email</CardTitle>
            <CardDescription>
              We&apos;ve sent you a confirmation link
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-4">
              <p className="text-sm text-gray-600">
                Please check your email inbox and click the confirmation link to verify your account. 
                Once confirmed, you&apos;ll be able to access your account.
              </p>
              <p className="text-sm text-gray-600">
                Didn&apos;t receive an email? Check your spam folder or try signing up again.
              </p>
              <Link
                href="/auth/login"
                className="inline-block mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 text-center"
              >
                Back to Login
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
