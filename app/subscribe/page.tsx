"use client";

import { useUser } from "@clerk/nextjs";
import { useMutation } from "@tanstack/react-query";
import { Toaster, toast } from "react-hot-toast";
import { availablePlans } from "@/lib/plans";
import Spinner from "@/components/spinner";

export default function SubscribePage() {
  const { user } = useUser();

  const checkoutMutation = useMutation({
    mutationFn: async (planType: string) => {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          planType,
          userId: user?.id,
          email: user?.emailAddresses[0]?.emailAddress,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Something went wrong");
      }

      const { url } = await response.json();
      window.location.href = url;
    },
    onSuccess: () => {
      toast.success("Redirecting to checkout...");
    },
    onError: (error: any) => {
      toast.error(error.message || "Something went wrong");
    },
  });

  const handleSubscribe = (planType: string) => {
    if (!user) {
      toast.error("Please sign in to subscribe");
      return;
    }
    checkoutMutation.mutate({ planType });
  };

  return (
    <div className="h-screen w-full bg-gradient-to-br from-slate-50 via-white to-emerald-50 flex items-center m-0 p-0">
      <Toaster position="top-center" />
      <div className="container mx-auto px-6 w-full">
        <div className="text-center mb-16">
          <h1 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-6">
            Choose Your Plan
          </h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto font-light">
            Select the perfect plan for your nutrition journey. All plans include unlimited AI meal plans and premium features.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {availablePlans.map((plan, index) => (
            <div
              key={plan.interval}
              className={`relative bg-white rounded-2xl shadow-lg border-2 transition-all duration-300 hover:shadow-xl transform hover:scale-105 ${
                plan.isPopular
                  ? "border-emerald-500 shadow-emerald-100"
                  : "border-slate-200 hover:border-emerald-300"
              }`}
            >
              {plan.isPopular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white px-6 py-2 rounded-full text-sm font-semibold shadow-lg">
                    Most Popular
                  </span>
                </div>
              )}

              <div className="p-8">
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-slate-900 mb-2">{plan.name}</h3>
                  <div className="mb-4">
                    <span className="text-4xl font-bold text-slate-900">${plan.amount}</span>
                    <span className="text-slate-600 ml-2">/{plan.interval}</span>
                  </div>
                  <p className="text-slate-600 leading-relaxed">{plan.description}</p>
                </div>

                <div className="space-y-4 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center gap-3">
                      <div className="w-5 h-5 bg-emerald-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <svg className="w-3 h-3 text-emerald-600" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <span className="text-slate-700">{feature}</span>
                    </div>
                  ))}
                </div>

                <button
                  onClick={() => handleSubscribe(plan.interval)}
                  disabled={checkoutMutation.isPending}
                  className={`w-full py-4 px-6 rounded-lg font-semibold text-lg transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center gap-3 ${
                    plan.isPopular
                      ? "bg-emerald-600 hover:bg-emerald-700 text-white"
                      : "bg-slate-100 hover:bg-emerald-50 text-slate-700 hover:text-emerald-700 border border-slate-300 hover:border-emerald-300"
                  }`}
                >
                  {checkoutMutation.isPending ? (
                    <>
                      <Spinner />
                      <span>Processing...</span>
                    </>
                  ) : (
                    <>
                      <span>Get Started</span>
                      <span>→</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-16">
          <p className="text-slate-600 mb-4">
            All plans include a 30-day money-back guarantee
          </p>
          <div className="flex items-center justify-center gap-8 text-sm text-slate-500">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
              <span>Cancel anytime</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
              <span>Secure payment</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
              <span>24/7 support</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}