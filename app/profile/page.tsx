"use client";

import { Spinner } from "@/components/spinner";
import { useUser } from "@clerk/nextjs";
import toast, { Toaster } from "react-hot-toast";
import Image from "next/image";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { availablePlans } from "@/lib/plans";
import { useState } from "react";
import { useRouter } from "next/navigation";

async function fetchSubscriptionStatus() {
  const response = await fetch("/api/profile/subscription-status");
  return response.json();
}
async function updatePlan(newPlan: string) {
  const response = await fetch("/api/profile/change-plan", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ newPlan }),
  });
  return response.json();
}

async function unsubscribe(newPlan: string) {
  const response = await fetch("/api/profile/unsubscribe", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
  });
  return response.json();
}

export default function Profile() {
  const [selectedPlan, setSelectedPlan] = useState<string>("");
  const { isLoaded, isSignedIn, user } = useUser();
  const queryClient = useQueryClient();
  const router = useRouter();
  const {
    data: subscription,
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ["subscription"],
    queryFn: fetchSubscriptionStatus,
    enabled: isLoaded && isSignedIn,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  const {
    data: updatedPlan,
    mutate: updatePlanMutation,
    isPending: isUpdatePlanPending,
  } = useMutation({
    mutationFn: updatePlan,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["subscription"] });
      toast.success("Plan updated successfully!");
      refetch();
    },
    onError: (error) => {
      toast.error("Failed to update plan. Please try again.");
    },
  });

  const {
    data: canceledPlan,
    mutate: unsubscribeMutation,
    isPending: isUnsubscribePending,
  } = useMutation({
    mutationFn: unsubscribe,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["subscription"] });
      router.push("/subscribe");
    },
    onError: (error) => {
      toast.error("Error Unsubscribing");
    },
  });

  const currentPlan = availablePlans.find(
    (plan) => plan.interval === subscription?.subscription.subscriptionTier
  );

  function handleUpdatePlan() {
    if (selectedPlan) {
      updatePlanMutation(selectedPlan);
    }
    setSelectedPlan("");
  }

  function handleUnsubscribe() {
    if (
      confirm(
        "Are you sure you want to unsubscribe? You will lose access to premium features"
      )
    ) {
      // i change it
      unsubscribeMutation(selectedPlan);
    }
  }

  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-emerald-100">
        <Spinner /> <span>Loading...</span>
      </div>
    );
  }

  if (!isSignedIn) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-emerald-100">
        <p> Please sign in to view your profile.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-emerald-100 p-4">
      <Toaster position="top-center" />
      <div className="w-full max-w-5xl bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="flex flex-col md:flex-row">
          <div className="w-full md:w-1/3 p-6 bg-emerald-500 text-white flex flex-col items-center">
            {user.imageUrl && (
              <Image
                src={user.imageUrl}
                alt="User Avatar "
                width={100}
                height={100}
                className="rounded-full mb-4"
              />
            )}
            <h1 className="text-2xl font-bold mb-2">
              {user.firstName} {user.lastName}
            </h1>
            <p className="mb-4">{user.primaryEmailAddress?.emailAddress}</p>
          </div>
          <div className="w-full md:w-2/3 p-6 bg-gray-50">
            <h2 className="text-2xl font-bold mb-6 text-emerald-700">
              Subscription Details
            </h2>
            {isLoading ? (
              <div className="flex items-center">
                <Spinner />{" "}
                <span className="ml-2"> Loading subscription details...</span>
              </div>
            ) : isError ? (
              <p className="text-red-500">{error?.message}</p>
            ) : subscription ? (
              <div className="space-y-6">
                <div className="bg-white shadow-md rounded-lg p-4 border border-emerald-200">
                  <h3 className="text-xl font-semibold mb-2 text-emerald-600">
                    Current Plan
                  </h3>
                  {currentPlan ? (
                    <div>
                      <>
                        <p>
                          <strong> Plan: </strong>
                          {currentPlan.name}
                        </p>
                        <p>
                          <strong> Amount: </strong>
                          {currentPlan.amount}
                          {currentPlan.currency}
                        </p>
                        <p>
                          <strong> Status: </strong>
                          Active
                        </p>
                      </>
                    </div>
                  ) : (
                    <p className="text-red-500"> Current Plan not Found.</p>
                  )}
                </div>
                <div className="bg-white shadow-md rounded-lg p-4 border border-emerald-200">
                  <h3 className="text-xl font-semibold mb-2 text-emerald-600">
                    {" "}
                    Change Subscription Plan
                  </h3>
                  {currentPlan && (
                    <>
                      <select
                        defaultValue={currentPlan?.interval}
                        className="w-full px-3 py-2 border border-emerald-300 rounded-md text-black focus:outline-none focus:ring-2 focus:ring-emerald-400"
                        disabled={isUpdatePlanPending}
                        onChange={(
                          event: React.ChangeEvent<HTMLSelectElement>
                        ) => setSelectedPlan(event.target.value)}
                      >
                        <option value="" disabled>
                          Select New Plan
                        </option>
                        {availablePlans.map((plan, key) => (
                          <option key={key} value={plan.interval}>
                            {plan.name} - ${plan.amount} / {plan.interval}
                          </option>
                        ))}
                      </select>
                      <button
                        onClick={handleUpdatePlan}
                        className="mt-3 p-2 bg-emerald-500 rounded-lg text-white"
                      >
                        Save Change
                      </button>
                      {isUpdatePlanPending && (
                        <div className="flex items-center mt-2">
                          <Spinner /> <span> Updating Plan...</span>
                        </div>
                      )}
                    </>
                  )}
                </div>

                <div className="bg-white shadow-md rounded-lg p-4 border border-emerald-200">
                  <h3 className="text-xl font-semibold mb-2 text-emerald-600">
                    {" "}
                    Unsubscribe
                  </h3>
                  <button
                    onClick={handleUnsubscribe}
                    disabled={isUnsubscribePending}
                    className={`w-full bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 transition-colors ${
                      isUnsubscribePending
                        ? "opacity-50 cursor-not-allowed"
                        : ""
                    }`}
                  >
                    {isUnsubscribePending ? "Unsubscribing..." : "Unsubscribe"}
                  </button>
                </div>
              </div>
            ) : (
              <p> You are not subscribed to any plan.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
