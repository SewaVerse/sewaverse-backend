import { redirect } from "next/navigation";

import { getServiceProviderByUserId } from "@/app/data-access/serviceProvider";
import { currentUser } from "@/lib/auth";

const SewaProviderVerificationPage = async () => {
  const user = await currentUser();
  const hasServiceProviderRole = user?.roles.includes("SERVICE_PROVIDER");

  if (!user || !hasServiceProviderRole) redirect("/");

  const serviceProvider = await getServiceProviderByUserId(user.id!);

  const current = serviceProvider?.verificationStep ?? 1;

  redirect(`/sewa-provider/verification/step-${current}`);
};

export default SewaProviderVerificationPage;
