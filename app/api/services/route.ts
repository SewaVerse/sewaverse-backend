import { currentRole, currentUser } from "@/lib/auth";
import connectMongo from "@/lib/connectMongo";
import Services from "@/models/Services/Services";
import { NextResponse, NextRequest } from "next/server";

export const dynamic = "force-dynamic";

export const POST = async (request: NextRequest) => {
  console.log("Running POST request: Admin Add/Update Service");

  const role = await currentRole();
  const user = await currentUser();

  try {
    const Data = await request.json();
    await connectMongo();

    if (role === "SERVICE_PROVIDER" || role === "COMPANY") {
      const existingDoc = await Services.findOne({ _id: Data?._id });

      if (existingDoc) {
        await existingDoc.updateOne(Data);
        return NextResponse.json(
          { message: "Service Updated" },
          { status: 201 }
        );
      } else {
        const newDoc = new Services({ ...Data, linkedUserId: user._id });
        await newDoc.save();
        return NextResponse.json(
          { message: "New Service Added" },
          { status: 201 }
        );
      }
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

export const GET = async () => {
  console.log("Running GET request:User Get all Services");
  const role = await currentRole();
  const user = await currentUser();

//   const user = {
//     _id: "66cad8967308cd2f29cdeee7",
//   };

  try {
    await connectMongo();
    if (role === "USER") {
      const docs = await Services.find().sort({
        createdDate: -1,
      });
      return NextResponse.json(docs, { status: 201 });
    } else if (role === "SERVICE_PROVIDER") {
      const docs = await Services.find({
        linkedUserId: user._id,
      });
      return NextResponse.json(docs, { status: 201 });
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
