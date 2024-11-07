export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-teal-200 to-cyan-300 text-gray-800">
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/50 to-transparent opacity-20 pointer-events-none animate-[fade-in_3s_ease-in-out_infinite]"></div>

      <h1 className="relative text-5xl font-bold drop-shadow-lg animate-pulse">
        Hello World
      </h1>
    </div>
  );
}
