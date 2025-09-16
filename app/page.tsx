import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen w-full m-0 p-0">
      {/* Hero Section */}
      <section className="relative overflow-hidden h-screen w-full flex items-center bg-gradient-to-br from-slate-50 via-white to-emerald-50">
        <div className="container mx-auto px-6 w-full">
          <div className="text-center max-w-5xl mx-auto">
            <div className="mb-8">
              <span className="inline-block bg-emerald-100 text-emerald-800 px-4 py-2 rounded-full text-sm font-medium mb-6">
                ✨ AI-Powered Nutrition
              </span>
            </div>
            <h1 className="text-5xl lg:text-7xl font-bold text-slate-900 mb-8 leading-tight">
              Smart Meal Planning
              <span className="block bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                Made Simple
              </span>
            </h1>
            <p className="text-xl lg:text-2xl text-slate-600 mb-12 max-w-4xl mx-auto leading-relaxed font-light">
              Transform your nutrition journey with AI-powered meal plans that adapt to your lifestyle, 
              dietary preferences, and health goals.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
              <Link
                href="/mealplan"
                className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center gap-3"
              >
                <span>Get Started</span>
                <span>→</span>
              </Link>
              <Link
                href="/subscribe"
                className="bg-white text-slate-700 border border-slate-300 hover:border-emerald-300 hover:bg-emerald-50 px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center gap-3"
              >
                <span>View Plans</span>
                <span>💎</span>
              </Link>
            </div>
            <div className="flex items-center justify-center gap-8 text-sm text-slate-500">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                <span>Personalized Plans</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                <span>Nutrition Tracking</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                <span>AI Insights</span>
              </div>
            </div>
          </div>
        </div>
        {/* Floating Food Icons */}
        <div className="absolute top-20 left-20 text-6xl opacity-10 animate-bounce delay-300">🥗</div>
        <div className="absolute top-40 right-20 text-4xl opacity-10 animate-bounce delay-1000">🍎</div>
        <div className="absolute bottom-20 left-20 text-5xl opacity-10 animate-bounce delay-2000">🥑</div>
        <div className="absolute bottom-40 right-10 text-3xl opacity-10 animate-bounce delay-500">🥕</div>
      </section>

      {/* How It Works Section */}
      <section className="h-screen w-full bg-white flex items-center m-0 p-0">
        <div className="container mx-auto px-6 w-full">
          <div className="text-center mb-20">
            <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-6">
              How It Works
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto font-light">
              Get your personalized meal plan in three simple steps
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-12 max-w-6xl mx-auto">
            {/* Step 1 */}
            <div className="text-center group">
              <div className="relative mb-8">
                <div className="bg-slate-100 text-slate-700 rounded-2xl h-20 w-20 flex items-center justify-center mx-auto mb-6 group-hover:bg-emerald-100 group-hover:text-emerald-700 transition-all duration-300">
                  <span className="text-2xl">👤</span>
                </div>
                <div className="absolute -top-2 -right-2 bg-emerald-600 text-white rounded-full h-8 w-8 flex items-center justify-center font-bold text-sm">
                  1
                </div>
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4">Create Profile</h3>
              <p className="text-slate-600 leading-relaxed">
                Sign up and tell us about your dietary preferences, health goals, and lifestyle.
              </p>
            </div>

            {/* Step 2 */}
            <div className="text-center group">
              <div className="relative mb-8">
                <div className="bg-slate-100 text-slate-700 rounded-2xl h-20 w-20 flex items-center justify-center mx-auto mb-6 group-hover:bg-emerald-100 group-hover:text-emerald-700 transition-all duration-300">
                  <span className="text-2xl">⚙️</span>
                </div>
                <div className="absolute -top-2 -right-2 bg-emerald-600 text-white rounded-full h-8 w-8 flex items-center justify-center font-bold text-sm">
                  2
                </div>
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4">Set Preferences</h3>
              <p className="text-slate-600 leading-relaxed">
                Specify your calorie goals, dietary restrictions, and cuisine preferences.
              </p>
            </div>

            {/* Step 3 */}
            <div className="text-center group">
              <div className="relative mb-8">
                <div className="bg-slate-100 text-slate-700 rounded-2xl h-20 w-20 flex items-center justify-center mx-auto mb-6 group-hover:bg-emerald-100 group-hover:text-emerald-700 transition-all duration-300">
                  <span className="text-2xl">🍽️</span>
                </div>
                <div className="absolute -top-2 -right-2 bg-emerald-600 text-white rounded-full h-8 w-8 flex items-center justify-center font-bold text-sm">
                  3
                </div>
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4">Get Your Plan</h3>
              <p className="text-slate-600 leading-relaxed">
                Receive your AI-generated meal plan with detailed recipes and nutrition info.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="h-screen w-full bg-gradient-to-br from-slate-50 to-emerald-50 flex items-center m-0 p-0">
        <div className="container mx-auto px-6 w-full">
          <div className="text-center mb-20">
            <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-6">
              Why Choose KusiNotes?
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto font-light">
              Experience the future of meal planning with our cutting-edge AI technology
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="bg-white rounded-xl p-8 shadow-sm hover:shadow-lg transition-all duration-300 border border-slate-200">
              <div className="text-3xl mb-4">🤖</div>
              <h3 className="text-xl font-bold text-slate-900 mb-4">AI-Powered Intelligence</h3>
              <p className="text-slate-600 leading-relaxed">
                Advanced AI creates personalized meal plans based on your unique preferences and dietary needs.
              </p>
            </div>
            
            <div className="bg-white rounded-xl p-8 shadow-sm hover:shadow-lg transition-all duration-300 border border-slate-200">
              <div className="text-3xl mb-4">⚡</div>
              <h3 className="text-xl font-bold text-slate-900 mb-4">Lightning Fast</h3>
              <p className="text-slate-600 leading-relaxed">
                Generate complete weekly meal plans in seconds, not hours of manual planning.
              </p>
            </div>
            
            <div className="bg-white rounded-xl p-8 shadow-sm hover:shadow-lg transition-all duration-300 border border-slate-200">
              <div className="text-3xl mb-4">🎯</div>
              <h3 className="text-xl font-bold text-slate-900 mb-4">Precision Nutrition</h3>
              <p className="text-slate-600 leading-relaxed">
                Every meal is calculated for optimal nutrition, calories, and macro balance.
              </p>
            </div>

            <div className="bg-white rounded-xl p-8 shadow-sm hover:shadow-lg transition-all duration-300 border border-slate-200">
              <div className="text-3xl mb-4">📱</div>
              <h3 className="text-xl font-bold text-slate-900 mb-4">Mobile Optimized</h3>
              <p className="text-slate-600 leading-relaxed">
                Access your meal plans anywhere with our responsive, mobile-first design.
              </p>
            </div>
            
            <div className="bg-white rounded-xl p-8 shadow-sm hover:shadow-lg transition-all duration-300 border border-slate-200">
              <div className="text-3xl mb-4">🔄</div>
              <h3 className="text-xl font-bold text-slate-900 mb-4">Always Fresh</h3>
              <p className="text-slate-600 leading-relaxed">
                Get new meal plans regularly to keep your nutrition journey exciting and varied.
              </p>
            </div>
            
            <div className="bg-white rounded-xl p-8 shadow-sm hover:shadow-lg transition-all duration-300 border border-slate-200">
              <div className="text-3xl mb-4">💡</div>
              <h3 className="text-xl font-bold text-slate-900 mb-4">Smart Insights</h3>
              <p className="text-slate-600 leading-relaxed">
                Learn about your eating patterns and get personalized nutrition recommendations.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}