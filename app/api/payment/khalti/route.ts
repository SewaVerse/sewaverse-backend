import { NextResponse } from "next/server";

import { asyncHandler } from "@/app/utils/asyncHelper/asyncHandler";

const KHALTI_SECRET_KEY = process.env.KHALTI_SECRET_KEY;
const KHALTI_API_URL = process.env.KHALTI_API_URL;

// console.warn("Khalti Secret Key:", `${KHALTI_SECRET_KEY}`);

export const POST = asyncHandler(async (request: Request) => {
  if (!KHALTI_SECRET_KEY) {
    console.error("Khalti secret key is missing");
    return NextResponse.json(
      { success: false, message: "Khalti secret key is missing" },
      { status: 500 }
    );
  }
  const body = await request.json();

  const payload = {
    return_url: body.return_url,
    website_url: body.website_url,
    amount: body.amount,
    ttl: body.ttl,
    bank: body.bank,
    modes: body.modes,
    purchase_order_id: body.purchase_order_id,
    purchase_order_name: body.purchase_order_name,
    customer_info: body.customer_info,
    amount_breakdown: body.amount_breakdown,
    product_details: body.product_details,
  };

  try {
    if (!KHALTI_API_URL) {
      throw new Error("KHALTI_API_URL is not defined");
    }
    console.warn("Payload", payload, KHALTI_API_URL, KHALTI_SECRET_KEY);

    const response = await fetch(`${KHALTI_API_URL}/epayment/initiate/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Key ${KHALTI_SECRET_KEY}`,
      },
      body: JSON.stringify(payload),
    });

    const result = await response.json();
    if (!response.ok) {
      throw new Error(result.detail || "Failed to initiate payment");
    }

    return NextResponse.json(result, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 400 }
    );
  }
});
