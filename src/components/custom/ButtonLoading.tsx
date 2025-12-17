import { Loader2Icon, LogIn } from "lucide-react";

import { Button } from "@/components/ui/button";
import { JSX } from "react";

const ButtonLoading = ({
  type,
  text,
  loading,
  styles,
  icon,
  onClick,
}: {
  type: "button" | "submit" | "reset" | undefined;
  text: string;
  loading: boolean;
  icon?: JSX.Element;
  styles?: string;
  onClick?: () => void;
}) => {
  return (
    <Button type={type} className={styles} disabled={loading} onClick={onClick}>
      {loading ? "" : text}
      {loading ? <Loader2Icon className="animate-spin" /> : icon}
    </Button>
  );
};

export default ButtonLoading;
