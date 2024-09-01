import { auth, signOut } from "@/auth";

const UserPgae = async () => {
  const session = await auth();
  return (
    <div>
      {JSON.stringify(session)}
      <form
        action={async () => {
          "use server";
          await signOut();
        }}
      >
        <button className="bg-black text-center text-white rounded-lg ml-4 p-2">
          Sign Out
        </button>
      </form>
    </div>
  );
};

export default UserPgae;
