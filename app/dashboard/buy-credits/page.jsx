"use client";

import React, { useState, useContext } from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { UserDetailContext } from "@/app/_context/UserDetailContext"; // adjust path if needed

export default function BuyCreditsPage() {
  const creditsOptions = [
    { credits: 5, amount: 0.99 },
    { credits: 10, amount: 1.99 },
    { credits: 25, amount: 3.99 },
    { credits: 50, amount: 6.99 },
    { credits: 100, amount: 9.99 },
  ];

  const [selectedOption, setSelectedOption] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const router = useRouter();
  const { userDetail, setUserDetail } = useContext(UserDetailContext) || {};

  // sandbox fallback; use your NEXT_PUBLIC_PAYPAL_CLIENT_ID in env for production
  const paypalClientId = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID || "sb";

  const formatPrice = (n) => `$${n.toFixed(2)}`;
  const selectOption = (option) => setSelectedOption(option);

  /**
   * Called after successful payment capture.
   * - Sends payment details to backend (/api/update-credits).
   * - On success: updates UserDetailContext and navigates to /dashboard.
   */
  const onPaymentSuccess = async (details) => {
    console.log("Payment Success...", details);
    setIsProcessing(true);

    try {
      // Replace with how you identify user in your app (token/session)
      const userId = typeof window !== "undefined" ? localStorage.getItem("userId") : null;

      const res = await fetch("/api/update-credits", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId,
          creditsAdded: selectedOption?.credits ?? 0,
          paymentDetails: details,
        }),
      });

      if (!res.ok) {
        const txt = await res.text();
        console.error("Failed to update credits on backend:", txt);
        alert("Payment succeeded but updating credits failed. Contact support.");
        return;
      }

      const json = await res.json();
      console.log("Backend update response:", json);

      // Update local user context safely
      if (typeof setUserDetail === "function") {
        setUserDetail((prev) => {
          const prevCredits = prev?.credits ?? userDetail?.credits ?? 0;
          return {
            ...(prev ?? userDetail ?? {}),
            credits: prevCredits + (selectedOption?.credits ?? 0),
          };
        });
      }

      // Navigate to dashboard after update
      router.push("/dashboard");
    } catch (err) {
      console.error("Error updating credits:", err);
      alert("Payment succeeded but an error occurred while updating credits.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <PayPalScriptProvider
      options={{
        "client-id": paypalClientId,
        currency: "USD",
        intent: "capture",
      }}
    >
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-10">
            <h1 className="font-extrabold text-4xl">Buy More Credits</h1>
            <p className="mt-3 text-lg text-gray-600">Buy credits to unlock more features.</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8 items-stretch">
            {creditsOptions.map((item) => {
              const isSelected = selectedOption?.credits === item.credits;
              return (
                <div
                  key={item.credits}
                  className={`bg-white rounded-2xl p-8 shadow-lg flex flex-col items-center justify-between transition-transform transform hover:-translate-y-1
                    ${isSelected ? "border-2 border-purple-500 ring-2 ring-purple-200" : "border border-transparent"}`}
                >
                  <div className="w-full flex flex-col items-center gap-2">
                    <h2 className="font-extrabold text-4xl">{item.credits}</h2>
                    <h3 className="font-medium text-xl text-gray-700">Credits</h3>
                  </div>

                  <div className="w-full mt-6">
                    <Button
                      className="w-full py-3 rounded-lg bg-purple-600 hover:bg-purple-700 text-white"
                      onClick={() => selectOption(item)}
                    >
                      Select
                    </Button>
                  </div>

                  <div className="w-full mt-5 text-center">
                    <div className="font-medium text-primary-600 text-lg text-purple-600">
                      {formatPrice(item.amount)}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* PayPal Buttons area */}
          <div className="mt-20">
            {selectedOption?.amount ? (
              <div>
                <PayPalButtons
                  style={{ layout: "horizontal" }}
                  // ensure PayPal re-initializes when the amount changes
                  forceReRender={[String(selectedOption.amount)]}
                  createOrder={(data, actions) => {
                    if (!actions || !actions.order || typeof actions.order.create !== "function") {
                      console.error("PayPal actions.order.create not available", { data, actions });
                      return Promise.reject(new Error("PayPal actions not available"));
                    }
                    const value = selectedOption.amount.toFixed(2);
                    return actions.order.create({
                      purchase_units: [
                        {
                          amount: {
                            value,
                            currency_code: "USD",
                          },
                        },
                      ],
                    });
                  }}
                  onApprove={(data, actions) => {
                    if (!actions || !actions.order || typeof actions.order.capture !== "function") {
                      console.error("PayPal actions.order.capture not available", { data, actions });
                      alert("Payment could not be completed (internal).");
                      return Promise.resolve();
                    }
                    return actions.order.capture().then((details) => {
                      onPaymentSuccess(details);
                    });
                  }}
                  onCancel={(data) => {
                    console.log("Payment Cancelled", data);
                  }}
                  onError={(err) => {
                    console.error("PayPal SDK error (onError):", err);
                    alert("Payment service encountered an error. Check console for details.");
                  }}
                />
              </div>
            ) : (
              <div className="text-center text-gray-500">Select a pack to see payment options</div>
            )}
          </div>

          {/* Selected pack display */}
          <div className="mt-12 flex items-center justify-center">
            <div className="max-w-2xl w-full bg-white rounded-xl p-6 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="text-left">
                <div className="text-sm text-gray-600">Selected pack</div>
                <div className="font-bold text-xl">
                  {selectedOption ? `${selectedOption.credits} credits` : "No pack selected"}
                </div>
                <div className="text-purple-600 mt-1">{selectedOption ? formatPrice(selectedOption.amount) : ""}</div>
              </div>

              <div className="flex gap-4">
                <button
                  onClick={() => setSelectedOption(null)}
                  className="px-4 py-2 rounded-md border border-gray-200 bg-white text-gray-700 hover:bg-gray-50"
                >
                  Clear
                </button>

                <button
                  onClick={() => {
                    if (!selectedOption) return;
                    window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
                  }}
                  className="px-4 py-2 rounded-md bg-purple-600 text-white hover:bg-purple-700"
                  disabled={isProcessing}
                >
                  {isProcessing ? "Processing..." : "Proceed to Pay"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PayPalScriptProvider>
  );
}
