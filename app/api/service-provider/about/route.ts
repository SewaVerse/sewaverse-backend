import { updateServiceProviderProfile } from "@/app/data-access/serviceProviderProfile";
import { getExistingServiceProviderProfile } from "@/app/data-access/serviceProviderProfile";
import { AboutSchema } from "@/app/schemas/providerSteps/aboutSchema";
import roleAsyncHandler from "@/app/utils/asyncHelper/roleAsyncHandler";
import { currentNextAuthUser } from "@/lib/auth";
import { NextResponse } from "next/server";

export const POST = roleAsyncHandler(
  "SERVICE_PROVIDER",
  async (request: Request) => {
    const data = (await request.json()) as AboutSchema;

    console.error(data);

    // const user = await getcurrentUser();
    const user = await currentNextAuthUser();

    if (!user)
      return NextResponse.json({ message: "User not found" }, { status: 404 });

    const serviceProviderProfile = await getExistingServiceProviderProfile(
      user?.id!
    );
    // console.error("serviceProviderProfile", serviceProviderProfile);

    if (serviceProviderProfile) {
      await updateServiceProviderProfile(user?.id, data);
    }

    // await createServiceProviderProfile(data);

    return NextResponse.json(
      { success: true, message: "About added Successfully" },
      { status: 201 }
    );
  }
);
