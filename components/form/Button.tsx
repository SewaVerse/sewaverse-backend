import { Loader2 } from "lucide-react";
import React from "react";

import {
  Button as ShadButton,
  ButtonProps as ShadButtonProps,
} from "@/components/ui/button";

interface ButtonProps extends ShadButtonProps {
  isLoading?: boolean;
}

const Button: React.FC<ButtonProps> = ({ children, isLoading, ...props }) => {
  return (
    <ShadButton type="submit" variant={"brand"} {...props}>
      {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : children}
    </ShadButton>
  );
};

export default Button;
