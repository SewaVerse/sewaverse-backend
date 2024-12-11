import { Button } from "@/components/ui/button";
import { IconType } from "react-icons";

interface AuthSocialButtonProps {
  icon: IconType;
  onClick: () => void;
  name?: string;
}

const AuthSocialButton: React.FC<AuthSocialButtonProps> = ({
  name,
  icon: Icon,
  onClick,
}) => {
  return (
    <Button
      variant={"outline"}
      type="button"
      onClick={onClick}
      className="w-full flex items-center"
    >
      <Icon /> {name}
    </Button>
  );
};

export default AuthSocialButton;
