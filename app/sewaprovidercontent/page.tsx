import { currentNextAuthUser } from "@/lib/auth";

export default async function SewaProviderWelcomePage() {
  const user = await currentNextAuthUser();
  return (
    <div className="flex flex-col items-center justify-center p-10  bg-white my-28  ">
      {/* Greeting Section */}
      <div className="flex flex-col items-center text-center px-6">
        <h1 className=" text-2xl md:text-3xl font-semibold text-gray-800 my-4">
          Namaste{" "}
          <span className="text-purple-600 capitalize">{user?.name}</span>,
        </h1>
        <p className="text-black text-base md:text-lg">
          We’ve received your details and are currently reviewing to ensure a
          safe, reliable, and trustworthy <br /> platform. You’ll hear back from
          us soon with an update on your verification status.
        </p>

        <p className="mt-6 text-black font-medium  ">
          <strong>In the meantime</strong>, let’s build a fantastic profile to
          showcase you and your amazing services.
        </p>

        {/* Redirection Notice */}
        <p className="mt-4 text-blue-600 text-sm md:text-base italic  decoration-blue-800">
          Redirecting you to the next step...
        </p>
      </div>
    </div>
  );
}
