export function OnboardingHeader() {
  return (
    <div className="text-center mb-8 sm:mb-10 md:mb-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="mx-auto mb-6 sm:mb-8 animate-in zoom-in duration-500">
        <img 
          src="/logo.png" 
          alt="POS Logo" 
          className="h-20 w-20 sm:h-24 sm:w-24 md:h-28 md:w-28 lg:h-32 lg:w-32 object-contain mx-auto"
        />
      </div>
      <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-slate-900 mb-3 sm:mb-4 tracking-tight">
        Welcome to Your POS System
      </h1>
      <p className="text-sm sm:text-base md:text-lg lg:text-xl text-slate-600 max-w-lg sm:max-w-xl md:max-w-2xl mx-auto leading-relaxed">
        Let's set up your business profile. Select your business type to personalize your experience.
      </p>
    </div>
  )
}
