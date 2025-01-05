import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const ProfileComponent = () => {
  return (
    <Card className="flex flex-row bg-white shadow-2xl mx-4 sm:mx-8 md:mx-30 lg:mx-48 sm:h-[4rem] md:h-auto lg:h-auto justify-between rounded-[1.5rem] sm:rounded-[2rem] md:rounded-[3rem] lg:rounded-[3rem] p-2 sm:p-2 md:p-4">
      {/* Avatar Section */}
      <div className="w-full md:w-1/3 flex justify-center items-center mb-4 md:mb-0">
        <Avatar className="w-[5rem] h-[5rem] sm:w-[10rem] sm:h-[10rem] md:w-[10rem] md:h-[10rem] lg:w-[15rem] lg:h-[15rem] border-4 sm:border-4 md:border-8 lg:border-8 border-white shadow-2xl">
          <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </div>

      {/* Profile Details Section */}
      <div className="w-full md:w-2/3 flex flex-col gap-1 sm:gap-1 md:gap-4 lg:gap-4">
        {/* Section 1 */}
        <div>
          <h1 className="text-base sm:text-base md:text-2xl lg:text-4xl font-bold text-[#023994]">
            Manish Maharjan
          </h1>
          <div className="flex flex-row sm:flex-col md:flex-row lg:flex-row font-medium text-xs sm:text-sm md:text-base gap-1 sm:gap-2 md:gap-3 w-full">
            <p>Joined on: 1st Jan, 2025</p>
            <p className="text-muted-foreground">|</p>
            <p>100 Services Delivered</p>
          </div>
        </div>

        {/* Section 2 */}
        <div className="flex flex-row gap-2 sm:gap-2 md:gap-16 font-medium">
          <span>
            <h1 className="text-muted-foreground text-xs sm:text-sm md:text-base">
              Profession
            </h1>
            <p className="gradient-text text-xs sm:text-sm md:text-base">
              Software Developer
            </p>
          </span>
          <span>
            <h1 className="text-muted-foreground text-xs sm:text-sm md:text-base">
              Experience
            </h1>
            <p className="gradient-text text-xs sm:text-sm md:text-base">
              3 Years
            </p>
          </span>
          <span>
            <h1 className="text-muted-foreground text-xs sm:text-sm md:text-base">
              Ratings
            </h1>
            <p className="gradient-text text-xs sm:text-sm md:text-base">4.5</p>
          </span>
        </div>

        {/* Section 3 */}
        <span className="font-medium">
          <h1 className="text-muted-foreground text-xs sm:text-sm md:text-base">
            Offered Services
          </h1>
          <p className="gradient-text text-xs sm:text-sm md:text-base">
            Hair Cutting
          </p>
        </span>

        {/* Section 4 */}
        <span className="font-medium">
          <h1 className="text-muted-foreground text-xs sm:text-sm md:text-base">
            Location of Services
          </h1>
          <p className="gradient-text text-xs sm:text-sm md:text-base">
            Kathmandu, Nepal
          </p>
        </span>

        {/* Section 5 */}
        <span className="font-medium">
          <h1 className="text-muted-foreground text-xs sm:text-sm md:text-base">
            Core Skills
          </h1>
          <span className="flex gap-2 sm:gap-2 md:gap-8">
            <Button
              variant="brand"
              className="rounded-lg px-2 py-1 text-xs sm:text-sm md:text-base"
            >
              Web Design
            </Button>
            <Button
              variant="brand"
              className="rounded-lg px-2 py-1 text-xs sm:text-sm md:text-base"
            >
              Typescript
            </Button>
            <Button
              variant="brand"
              className="rounded-lg px-2 py-1 text-xs sm:text-sm md:text-base"
            >
              UIUX Design
            </Button>
          </span>
        </span>
      </div>
      <Card>Manish</Card>
    </Card>
  );
};

export default ProfileComponent;
