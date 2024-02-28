import { cn } from "../../../lib/utils";
import { useNavigate } from "react-router-dom";

type NavButtonsProps = {
  user: string | null;
  classNames: string;
  closeNav: () => void;
  logOut: () => Promise<void>;
  direction: "row" | "col";
};

export default function NavButtons({
  user,
  classNames,
  closeNav,
  logOut,
  direction,
}: NavButtonsProps) {
  return (
    <div>
      {user && (
        <LoggedInButtons
          classNames={classNames}
          closeNav={closeNav}
          logOut={logOut}
          direction={direction}
        />
      )}
      {!user && (
        <LoggedOutButtons
          classNames={classNames}
          closeNav={closeNav}
          direction={direction}
        />
      )}
    </div>
  );
}

type LoggedOutButtonsProps = {
  classNames: string;
  closeNav: () => void;
  direction: "row" | "col";
};

type LoggedInButtonsProps = LoggedOutButtonsProps & {
  logOut: () => Promise<void>;
};

function LoggedInButtons({
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

function LoggedOutButtons({
  classNames,
  closeNav,
  direction,
}: LoggedOutButtonsProps) {
  const navigate = useNavigate();
  const buttonsCommonClass =
    "justify-center items-center py-2 h-[48px] rounded-lg border border-l-border dark:border-d-border text-l-text-primary dark:text-d-text-primary hover:bg-l-bg-secondary dark:hover:bg-d-bg-secondary w-[80px] h-[45px] border-none hidden sm:flex";

  return (
    <section
      className={cn("flex", {
        "flex-row": direction === "row",
        "flex-col": direction === "col",
      })}
    >
      <button
        onClick={() => {
          navigate("/signup");
          closeNav();
        }}
        className={cn(buttonsCommonClass, classNames)}
      >
        회원가입
      </button>
      <button
        onClick={() => {
          navigate("/login");
          closeNav();
        }}
        className={cn(buttonsCommonClass, classNames)}
      >
        로그인
      </button>
    </section>
  );
}
