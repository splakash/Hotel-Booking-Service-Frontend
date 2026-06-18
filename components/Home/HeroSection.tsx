export default function HeroSection() {
  return (
    <div className="relative h-[400px] bg-gradient-to-r from-primary-600 to-primary-800">
      <div className="absolute inset-0 bg-black opacity-30" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 h-full flex items-center">
        <div className="text-white">
          <h1 className="text-5xl font-bold mb-4">
            Find Your Perfect Stay
          </h1>

          <p className="text-xl">
            Discover amazing hotels and book your next adventure
          </p>
        </div>
      </div>
    </div>
  );
}