export function OnboardingHeader() {
  return (
    <div className="text-center mb-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="mx-auto mb-8 animate-in zoom-in duration-500">
        <img 
          src="/logo.png" 
          alt="POS Logo" 
          className="h-32 w-32 object-contain mx-auto"
        />
      </div>
      <h1 className="text-5xl font-extrabold text-slate-900 mb-4 tracking-tight">
        Welcome to Your POS System
      </h1>
      <p className="text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
        Let's set up your business profile. Select your business type to personalize your experience.
      </p>
    </div>
  )
}
