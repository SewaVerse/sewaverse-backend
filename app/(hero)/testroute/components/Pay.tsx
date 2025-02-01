"use client";

import { useState } from "react";
import toast from "react-hot-toast";

import { Button } from "@/components/ui/button";

const PayWithKhalti = () => {
  const [loading, setLoading] = useState(false);

  const handlePayment = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/payment/khalti", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          return_url: "https://testing.com/",
          website_url: "https://testing.com/",
          amount: 10000,
          purchase_order_id: "wakanada_01",
          purchase_order_name: "wakanda 02",
          customer_info: {
            name: "test shrestha",
            email: "example@gmail.com",
            phone: "9801856451",
          },
          product_details: [
            {
              identity: "shark_1",
              name: "shark_2",
              total_price: 10000,
              quantity: 1,
              unit_price: 10000,
            },
          ],
        }),
      });

      const data = await response.json();
      if (response.ok) {
        window.location.href = data.payment_url; // Redirect to Khalti Payment Page
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error("Payment initiation failed", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center my-[20rem]">
      <Button onClick={handlePayment} disabled={loading}>
        {loading ? "Processing..." : "Pay With Khalti"}
      </Button>
    </div>
  );
};

export default PayWithKhalti;
