import { currentRole } from "@/lib/auth";
import connectMongo from "@/lib/connectMongo";
import Services from "@/models/Services/Services";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export const GET = async (request: NextRequest) => {
  console.log("Running GET request:User Get Service by id");

  const user = await currentRole();
  // const user = "SERVICE_PROVIDER";

  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  console.log(id);

  try {
    await connectMongo();
    if (user === "SERVICE_PROVIDER" || user === "COMPANY") {
      const doc = await Services.find({ linkedUserId: id });
      return NextResponse.json(doc, { status: 201 });
    } else {
      return NextResponse.json({ message: "Forbidden" }, { status: 400 });
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Invalid request body" },
      { status: 400 }
    );
  }
};
