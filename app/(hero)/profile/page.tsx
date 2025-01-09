import ProfileComponent from "./_components/profile-card";
import { ProfileDetails } from "./_components/profile-details";

const ProfilePage = () => {
  return (
    <div>
      {/* Background section */}
      <div className="bg-red-300 h-[44vh] w-full"></div>

      <div className="md:mx-[7rem] lg:mx-[14.25rem]">
        {/* ProfileComponent section */}
        <div className="z-10 absolute top-[18rem] left-1/2 transform -translate-x-1/2">
          <ProfileComponent />
        </div>

        {/* Profile content section */}
        <div className="mt-[19.5rem]">
          <ProfileDetails />
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
