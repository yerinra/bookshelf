import { cn } from "../../../lib/utils";
import { useNavigate } from "react-router-dom";

export default function LoggedOutButtons({
  classNames,
}: {
  classNames: string;
}) {
  const navigate = useNavigate();
  const buttonsCommonClass =
    "justify-center items-center py-2 h-[48px] rounded-lg border border-l-border dark:border-d-border text-l-text-primary dark:text-d-text-primary hover:bg-l-bg-secondary dark:hover:bg-d-bg-secondary w-[80px] h-[45px] border-none hidden sm:flex";

  return (
    <>
      <button
        onClick={() => {
          navigate("/signup");
        }}
        className={cn(buttonsCommonClass, classNames)}
      >
        회원가입
      </button>
      <button
        onClick={() => {
          navigate("/login");
        }}
        className={cn(buttonsCommonClass, classNames)}
      >
        로그인
      </button>
    </>
  );
}
