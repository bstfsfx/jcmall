import Link from "next/link";
import { signIn } from "@/auth";

export default function LoginPage() {
  return (
    <div className="flex items-center justify-center min-h-[70vh] bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-10 shadow-sm border border-gray-100">
        <div>
          <h2 className="text-center text-3xl font-serif text-foreground">
            Sign In to JC Mall
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Welcome back to your premium experience.
          </p>
        </div>
        
        <form className="mt-8 space-y-6" action={async (formData) => {
          'use server';
          await signIn("credentials", formData);
        }}>
          <input type="hidden" name="redirectTo" value="/account" />
          <div className="space-y-4">
            <div>
              <label htmlFor="email-address" className="sr-only">Email address</label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-foreground focus:outline-none focus:ring-foreground focus:border-foreground focus:z-10 sm:text-sm transition-colors"
                placeholder="Email address"
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">Password</label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-foreground focus:outline-none focus:ring-foreground focus:border-foreground focus:z-10 sm:text-sm transition-colors"
                placeholder="Password"
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 text-foreground focus:ring-foreground border-gray-300 rounded"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                Remember me
              </label>
            </div>

            <div className="text-sm">
              <a href="#" className="font-medium text-foreground hover:text-accent transition-colors">
                Forgot your password?
              </a>
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium text-white bg-foreground hover:bg-[#333] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-foreground transition-colors"
            >
              SIGN IN
            </button>
          </div>
        </form>
        
        <div className="text-center mt-6 text-sm text-gray-600">
          Don't have an account?{" "}
          <Link href="/register" className="font-medium text-foreground hover:text-accent underline transition-colors">
            Create an account
          </Link>
        </div>
      </div>
    </div>
  );
}
