import { SignOutButton } from "@clerk/nextjs";

export default function SignOutPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 to-slate-800 px-4">
      <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 max-w-md w-full text-center space-y-6">
        {/* Icon */}
        <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto">
          <svg
            className="w-8 h-8 text-blue-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
            />
          </svg>
        </div>

        {/* Heading */}
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-slate-900 mb-2">
            Sign Out
          </h1>
          <p className="text-slate-500 text-sm">
            Are you sure you want to sign out from your account?
          </p>
        </div>

        {/* Sign Out Button */}
        <SignOutButton redirectUrl="/">
          <button className="w-full bg-blue-600 text-white font-bold py-3 px-6 rounded-xl hover:bg-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl">
            Confirm Sign Out
          </button>
        </SignOutButton>

        {/* Go Back Button */}
        <a
          href="/admin"
          className="w-full bg-slate-100 text-slate-700 font-bold py-3 px-6 rounded-xl hover:bg-slate-200 transition-all duration-300 block"
        >
          Go Back to Admin
        </a>

        {/* Footer Text */}
        <p className="text-xs text-slate-400 mt-6">
          You will be redirected to the home page after signing out.
        </p>
      </div>
    </div>
  );
}
