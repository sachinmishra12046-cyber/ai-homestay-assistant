import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function LoginPage() {
  return (
    <>
      <Navbar />

      <main className="min-h-[80vh] flex items-center justify-center bg-gray-100 px-4">
        <div className="w-full max-w-md bg-white rounded-xl shadow-md p-8">

          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold">
              Welcome TO AI Homestay
            </h1>

            <p className="text-gray-500 mt-2">
              Sign in to continue to your account and explore the best homestay recommendations tailored for you.
            </p>
          </div>

          <div className="space-y-4">
            <input
              type="email"
              placeholder="Email Address"
              className="w-full border rounded-lg p-3"
            />

            <input
              type="password"
              placeholder="Password"
              className="w-full border rounded-lg p-3"
            />

            <div className="flex justify-between text-sm">
              <label>
                <input type="checkbox" className="mr-2" />
                Remember me
              </label>

              <a href="#" className="text-blue-600">
                Forgot Password?
              </a>
            </div>

            <button className="w-full bg-black text-white p-3 rounded-lg">
              Sign In
            </button>
          </div>

          <p className="text-center text-sm text-gray-500 mt-6">
            Don't have an account?
            <span className="font-semibold ml-1">
              Sign Up
            </span>
          </p>
        </div>
      </main>

      <Footer />
    </>
  );
}