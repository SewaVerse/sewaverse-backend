import connectMongo from "@/lib/connectMongo";
import Services from "@/models/Services/Services";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (request: NextRequest) => {
  console.log("Get Request Running: Get services by id");

  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  console.log(id);

  try {
    await connectMongo();
    const doc = await Services.findOne({ _id: id });
    return NextResponse.json(doc, { status: 200 });
  } catch (error: any) {
    console.log("Something went wrong", error);
    return NextResponse.json(
      { message: "Something went worng", error },
      { status: 400 }
    );
  }
};
