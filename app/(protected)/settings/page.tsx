import { auth, signOut } from "@/auth";
import UpdateUserForm from "@/test/UpdateUser";

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
      <UpdateUserForm />
    </div>
  );
};

export default UserPgae;
