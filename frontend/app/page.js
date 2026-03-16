export default function Home() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-green-50 to-green-100">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-green-700 mb-4">
          Welcome to AgriCore
        </h1>
        
        <div className="flex gap-4 justify-center">
          <a 
            href="/signup" 
            className="px-6 py-3 bg-green-700 text-white rounded-lg font-semibold hover:bg-green-800 transition"
          >
            Get Started
          </a>
          <a 
            href="/login" 
            className="px-6 py-3 bg-white text-green-700 border-2 border-green-700 rounded-lg font-semibold hover:bg-green-50 transition"
          >
            Sign In
          </a>
        </div>
      </div>
    </div>
  )
}