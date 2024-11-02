import { auth, signOut } from "@/auth";
import AddServiceForm from "@/test/AddService";
import FetchData from "@/test/FetchData";
import PhoneAuth from "@/test/PhoneSms";
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
      {/* <UpdateUserForm /> */}
      {/* <PhoneAuth/> */}
      {/* <h1>User ID: {session?.user?.id}</h1> */}
      <h1>Add Service Here</h1>
      <AddServiceForm />

      {/* <h1>Fetch User Details and Services</h1> */}
      {/* <FetchData /> */}
    </div>
  );
};

export default UserPgae;
