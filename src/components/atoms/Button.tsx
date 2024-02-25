import React from "react";
import { cn } from "../../lib/utils";

type ButtonProps = {
  children: React.ReactNode;
  theme?: string;
  onClick?: () => void;
  disabled?: boolean;
  type?: "submit";
};

export default function Button({
  children,
  theme,
  onClick,
  disabled,
  type,
}: ButtonProps) {
  let customClassNames;
  switch (theme) {
    case "accent":
      customClassNames = "bg-accent hover:bg-accent-fade";
      break;
    case "reverse":
      customClassNames =
        "bg-d-bg-primary text-d-text-primary dark:bg-l-bg-primary dark:text-l-text-primary hover:bg-d-bg-secondary hover:dark:bg-l-bg-secondary";
      break;
    case "rounded-accent":
      customClassNames =
        "rounded-[100px] w-[200px] hover:bg-l-text-primary  hover:text-l-bg-primary hover:dark:bg-d-bg-secondary bg-accent hover:bg-accent-fade hover:dark:bg-[#F3B251] dark:text-l-text-primary";
      break;
    case "rounded-reverse":
      customClassNames =
        "rounded-[100px] w-[200px] border-l-text-secondary dark:border-d-text-secondary hover:bg-l-text-primary hover:text-d-text-primary";
      break;
    case "circle-accent":
      customClassNames =
        "p-2 text-2xl flex justify-center items-center font-extrabold bg-accent border-none rounded-full hover:bg-accent w-[48px]";
      break;
    case "sm-nav":
      customClassNames = "w-[80px] h-[45px] border-none hidden sm:block";
      break;
    case "md-nav":
      customClassNames = "w-[80px] h-[45px] border-none hidden md:block";
      break;
    default:
      "";
  }

  return (
    <button
      className={cn(
        "flex justify-center items-center py-2 h-[48px] rounded-lg border border-l-border dark:border-d-border text-l-text-primary dark:text-d-text-primary hover:bg-l-bg-secondary dark:hover:bg-d-bg-secondary w-full",
        customClassNames
      )}
      onClick={onClick}
      disabled={disabled}
      type={type}
    >
      {children}
    </button>
  );
}
