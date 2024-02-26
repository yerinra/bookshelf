import { cn } from "../../../lib/utils";
import { useNavigate } from "react-router-dom";

type LoggedInButtonsProps = {
  logOut: () => Promise<void>;
  classNames: string;
};

export default function LoggedInButtons({
  logOut,
  classNames,
}: LoggedInButtonsProps) {
  const navigate = useNavigate();
  const buttonsCommonClass =
    "justify-center items-center py-2 h-[48px] rounded-lg border border-l-border dark:border-d-border text-l-text-primary dark:text-d-text-primary hover:bg-l-bg-secondary dark:hover:bg-d-bg-secondary w-[80px] h-[45px] border-none hidden sm:flex";
  return (
    <>
      <button
        onClick={() => {
          navigate("/bookshelf");
        }}
        className={cn(buttonsCommonClass, classNames)}
      >
        내 책장
      </button>
      <button onClick={logOut} className={cn(buttonsCommonClass, classNames)}>
        로그아웃
      </button>
    </>
  );
}
