export default function Hero() {
  return (
    <section className="min-h-screen bg-[var(--color-bg)] text-white relative">
      <div className="container mx-auto px-4 py-16 lg:py-24">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[80vh]">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="space-y-6">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight unbounded-600">
                Turn your social{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                  media posts and
                </span>{' '}
                website content{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
                  into revenue
                </span>
              </h1>

              <p className="text-lg lg:text-xl text-purple-100 max-w-lg leading-relaxed">
                Create, Share, Earn. Your content deserves to pay you affiliate links to make it happen.
              </p>
            </div>

            <div className="pt-4 pb-20">
              <button className="bg-red-500 hover:bg-red-600 text-white font-semibold px-8 py-4 rounded-lg text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-xl uppercase tracking-wide">
                Join Kanqoo
              </button>
            </div>
          </div>

          {/* Right Image Section */}
          <div className="relative lg:h-full min-h-[500px] flex items-center justify-center">
            <div className="text-purple-300 text-center space-y-4">
              <div className="w-fit mx-autorounded-full flex items-center justify-center">
                <img src="https://cdn.sites.convertsocial.net/convertsocial.net/2023/01/skdnfkjqwnej2.png" alt="ConvertSocial" className="max-w-full max-h-full" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 -left-20 w-60 h-60 bg-blue-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-1/4 w-40 h-40 bg-pink-500/10 rounded-full blur-2xl"></div>
      </div>

      {/* Curved Bottom Section */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden">
        <svg
          className="relative block w-full h-20 sm:h-32 lg:h-35"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M0,0V120H1200V0C1200,0 900,120 600,60C300,0 0,0 0,0Z"
            fill="#fdfdfd"
          />
        </svg>
      </div>

      {/* Alternative curved bottom - you can use this instead */}
      {/* 
      <div className="absolute bottom-0 left-0 w-full overflow-hidden">
        <svg 
          className="relative block w-full h-20 sm:h-32 lg:h-40" 
          viewBox="0 0 1200 120" 
          preserveAspectRatio="none"
        >
          <path 
            d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" 
            fill="rgba(255,255,255,0.1)"
          />
        </svg>
      </div>
      */}
    </section>
  )
}