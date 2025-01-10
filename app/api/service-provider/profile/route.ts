import { NextResponse } from "next/server";

import { getServiceProviderByUserIdWithInclude } from "@/app/data-access/serviceProvider";
import { getServiceProviderProfile } from "@/app/data-access/serviceProviderProfile";
import roleAsyncHandler from "@/app/utils/asyncHelper/roleAsyncHandler";
import { getcurrentUser } from "@/lib/auth";

export const GET = roleAsyncHandler("SERVICE_PROVIDER", async () => {
  const user = await getcurrentUser();

  const { id } = user!;

  const serviceProvider = await getServiceProviderByUserIdWithInclude(id, {
    addresses: true,
    offeredServices: true,
    serviceLocations: true,
  });

  if (!serviceProvider) {
    throw new Error("Service provider not found");
  }

  const profile = await getServiceProviderProfile(serviceProvider.id);

  if (!profile) {
    throw new Error("Service provider profile not found");
  }

  const { file, workExperiences, licenses, awards, ...rest } = profile;
  const serviceProviderWithProfile = {
    name: serviceProvider.name,
    email: serviceProvider.email,
    providerType: serviceProvider.providerType,
    isAdminVerified: serviceProvider.isAdminVerified,
    createdAt: serviceProvider.createdAt,
    profile: {
      ...rest,
      image: file,
    },
    addresses: serviceProvider.addresses,
    offeredServices: serviceProvider.offeredServices,
    serviceLocations: serviceProvider.serviceLocations,
    workExperiences,
    licenses,
    awards,
  };

  return NextResponse.json({
    success: true,
    message: "Success",
    serviceProvider: serviceProviderWithProfile,
  });
});
