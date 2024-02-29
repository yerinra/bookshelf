import { useNavigate } from "react-router-dom";
import { LoggedOutButtonsProps } from "./NavButtons";
import { cn } from "../../../lib/utils";

type LoggedInButtonsProps = LoggedOutButtonsProps & {
  logOut: () => Promise<void>;
};

export default function LoggedInButtons({
  logOut,
  classNames,
  closeNav,
  direction,
}: LoggedInButtonsProps) {
  const navigate = useNavigate();
  const buttonsCommonClass =
    "justify-center items-center py-2 h-[48px] rounded-lg border border-l-border dark:border-d-border text-l-text-primary dark:text-d-text-primary hover:bg-l-bg-secondary dark:hover:bg-d-bg-secondary w-[80px] h-[45px] border-none";
  return (
    <section
      className={cn("flex", {
        "flex-row": direction === "row",
        "flex-col": direction === "col",
      })}
    >
      <button
        onClick={() => {
          navigate("/bookshelf");
          closeNav();
        }}
        className={cn(buttonsCommonClass, classNames)}
      >
        내 책장
      </button>
      <button
        onClick={() => {
          logOut();
          closeNav();
        }}
        className={cn(buttonsCommonClass, classNames)}
      >
        로그아웃
      </button>
    </section>
  );
}
