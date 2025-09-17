"use client";

import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { Spinner } from "@/components/spinner";

interface DailyMealPlan {
  Breakfast?: string;
  Lunch?: string;
  Dinner?: string;
  Snacks?: string;
}

interface MealPlanData {
  mealPlan: { [day: string]: DailyMealPlan };
}

export default function MealPlanDashboard() {
  const [formData, setFormData] = useState({
    dietType: "balanced",
    calories: "2000",
    allergies: "",
    cuisine: "",
    snacks: true,
    days: "7",
  });

  const generateMealPlan = async (data: typeof formData) => {
    const response = await fetch("/api/generate-mealplan", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Failed to generate meal plan");
    }

    return response.json();
  };

  const { mutate, data, isPending } = useMutation<
    MealPlanData,
    Error,
    typeof formData
  >({
    mutationFn: (variables) => generateMealPlan(variables),
    onSuccess: () => {
      toast.success("Meal plan generated successfully!");
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to generate meal plan");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutate(formData);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  // const getMealPlanForDay = (day: string): DailyMealPlan | undefined => {
  //   if (!data?.mealPlan) return undefined;
  //   return data?.mealPlan[day];
  // };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-slate-50 via-white to-emerald-50 m-0 p-0">
      <div className="container mx-auto px-6 py-10 w-full">
        <div className="text-center mb-12">
          <h1 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-4">
            AI Meal Plan Generator
          </h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto font-light">
            Get personalized meal plans tailored to your dietary preferences and health goals
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-10 gap-12 max-w-7xl mx-auto">
          {/* Form Section */}
          <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-8 lg:col-span-3">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">Your Preferences</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Diet Type
                  </label>
                  <select
                    name="dietType"
                    value={formData.dietType}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                  >
                    <option value="balanced">Balanced</option>
                    <option value="vegetarian">Vegetarian</option>
                    <option value="vegan">Vegan</option>
                    <option value="keto">Keto</option>
                    <option value="paleo">Paleo</option>
                    <option value="mediterranean">Mediterranean</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Daily Calories
                  </label>
                  <input
                    type="number"
                    name="calories"
                    value={formData.calories}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                    placeholder="2000"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Allergies & Restrictions
                </label>
                <textarea
                  name="allergies"
                  value={formData.allergies}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                  placeholder="e.g., nuts, dairy, gluten"
                  rows={3}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Preferred Cuisine
                </label>
                <input
                  type="text"
                  name="cuisine"
                  value={formData.cuisine}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                  placeholder="e.g., Italian, Asian, Mexican"
                />
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Plan Duration
                  </label>
                  <select
                    name="days"
                    value={formData.days}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                  >
                    <option value="3">3 Days</option>
                    <option value="7">7 Days</option>
                    <option value="14">14 Days</option>
                  </select>
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    name="snacks"
                    checked={formData.snacks}
                    onChange={handleInputChange}
                    className="h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-slate-300 rounded"
                  />
                  <label className="ml-3 text-sm font-medium text-slate-700">
                    Include Snacks
                  </label>
                </div>
              </div>

              <button
                type="submit"
                disabled={isPending}
                className="w-full bg-emerald-600 hover:bg-emerald-700 disabled:bg-slate-400 text-white font-semibold py-4 px-6 rounded-lg transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center gap-3"
              >
                {isPending ? (
                  <>
                    <Spinner />
                    <span>Generating...</span>
                  </>
                ) : (
                  <>
                    <span>Generate Meal Plan</span>
                    <span>✨</span>
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Results Section */}
          <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-8 lg:col-span-7">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">Your Meal Plan</h2>
            
            {isPending ? (
              <div className="flex items-center justify-center py-12">
                <div className="text-center">
                  <Spinner />
                  <p className="text-slate-600 mt-4">Generating your personalized meal plan...</p>
                </div>
              </div>
            ) : data?.mealPlan ? (
              <div className="space-y-6">
                {Object.entries(data.mealPlan).map(([day, meals]) => (
                  <div key={day} className="border border-slate-200 rounded-xl p-6">
                    <h3 className="text-xl font-bold text-slate-900 mb-4">{day}</h3>
                    <div className="grid gap-4">
                      {Object.entries(meals).map(([mealType, meal]) => (
                        <div key={mealType} className="flex items-start gap-3">
                          <div className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-sm font-medium min-w-fit">
                            {mealType}
                          </div>
                          <p className="text-slate-700 leading-relaxed">{meal}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">🍽️</div>
                <p className="text-slate-600 text-lg">
                  Fill out the form to generate your personalized meal plan
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}