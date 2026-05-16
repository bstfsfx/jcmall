import Link from "next/link";
import { registerUser } from "@/app/actions/auth";

export default function RegisterPage() {
  return (
    <div className="flex items-center justify-center min-h-[70vh] bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-10 shadow-sm border border-gray-100">
        <div>
          <h2 className="text-center text-3xl font-serif text-foreground">
            Create an Account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Join JC Mall for a personalized shopping experience.
          </p>
        </div>
        
        <form className="mt-8 space-y-6" action={registerUser}>
          <div className="space-y-4">
            <div>
              <label htmlFor="name" className="sr-only">Full Name</label>
              <input
                id="name"
                name="name"
                type="text"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-foreground focus:outline-none focus:ring-foreground focus:border-foreground focus:z-10 sm:text-sm transition-colors"
                placeholder="Full Name"
              />
            </div>
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
                autoComplete="new-password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-foreground focus:outline-none focus:ring-foreground focus:border-foreground focus:z-10 sm:text-sm transition-colors"
                placeholder="Password"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium text-white bg-foreground hover:bg-[#333] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-foreground transition-colors"
            >
              CREATE ACCOUNT
            </button>
          </div>
        </form>
        
        <div className="text-center mt-6 text-sm text-gray-600">
          Already have an account?{" "}
          <Link href="/login" className="font-medium text-foreground hover:text-accent underline transition-colors">
            Sign In
          </Link>
        </div>
      </div>
    </div>
  );
}
