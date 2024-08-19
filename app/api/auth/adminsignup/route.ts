import { NextResponse, NextRequest } from "next/server";
import UserModel from "@/models/User";
import bcrypt from "bcrypt";
import connectMongo from "@/lib/connectMongo";

export const dynamic = "force-dynamic";

export const POST = async (request: NextRequest) => {
  console.log("Running POST request: Add Admin");

  try {
    const { email, password, userType } = await request.json();
    const lowerCaseEmail = email.toLowerCase();
    await connectMongo();
    const existingUser = await UserModel.findOne({
      email: lowerCaseEmail,
      
    });

    if (existingUser) {
      if (existingUser.isVerified) {
        console.log("User Already Exist");
        return new NextResponse(JSON.stringify("User Already Exist"), {
          status: 200,
        });
      } else {
        // Update the existing user's information
        try {
          const hashedPassword = await bcrypt.hash(password, 10);
          await UserModel.updateOne(
            { email: lowerCaseEmail },
            {
              $set: {
                password: hashedPassword,
            
              },
            }
          );

          return new NextResponse(JSON.stringify("Signup Successfull !"), {
            status: 201,
          });
        } catch (error) {
          return new NextResponse(
            JSON.stringify({ error: "User update failed" }),
            { status: 500 }
          );
        }
      }
    } else {
      let hashedPassword = undefined;

      try {
        hashedPassword = await bcrypt.hash(password, 10);
      } catch (error) {
        return new NextResponse(JSON.stringify({ error: "hashed failed" }), {
          status: 400,
        });
      }
      // Create a new user document
      const newUser = new UserModel({
        email: lowerCaseEmail,
        password: hashedPassword,
        userType,
        isVerified: true,
        joinedDate: Date.now(),
      });

      try {
        const savedUser = await newUser.save();
        console.log("New Admin added");

        return new NextResponse(JSON.stringify("Signup Successfull !"), {
          status: 201,
        });
      } catch (error) {
        return new NextResponse(
          JSON.stringify({ error: "User creation failed" }),
          { status: 500 }
        );
      }
    }
  } catch (error) {
    return new NextResponse(JSON.stringify({ error: "Invalid request body" }), {
      status: 400,
    });
  }
};
