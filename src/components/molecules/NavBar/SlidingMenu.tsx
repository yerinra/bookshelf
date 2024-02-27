import Button from "../../atoms/Button";
import { Cross1Icon, FrameIcon } from "@radix-ui/react-icons";
import { useNavigate } from "react-router-dom";
import NavButtons from "./NavButtons";

type SlidingMenuProps = {
  user: string | null;
  navOpen: boolean;
  onClose: () => void;
  logOut: () => Promise<void>;
};

export default function SlidingMenu({
  user,
  navOpen,
  onClose,
  logOut,
}: SlidingMenuProps) {
  const navigate = useNavigate();
  return (
    <section
      className={`z-[100] absolute top-0 left-0 h-screen w-screen ${
        navOpen ? "" : "-ml-[640px]"
      } sm:hidden transition-all duration-300 ease-in-out`}
    >
      <div className="flex flex-col justify-center sm:hidden h-screen w-[200px] bg-l-bg-primary dark:bg-d-bg-primary absolute left-0 top-0">
        <button
          className="ml-auto m-4 cursor-pointer"
          onClick={onClose}
          aria-label="toggle navigation menu"
        >
          <Cross1Icon width="20" height="20" />
        </button>
        <section className="flex flex-col gap-2 justify-center items-center mt-10">
          <div className="mb-5">
            <Button
              theme="circle-accent"
              onClick={() => {
                navigate("/");
                onClose();
              }}
            >
              <FrameIcon width="20" height="20" />
            </Button>
          </div>

          <NavButtons
            user={user}
            classNames="flex sm:hidden"
            closeNav={onClose}
            logOut={logOut}
            direction="col"
          />
        </section>
        <h1 className="mt-auto pb-4 font-semibold">BOOKSHELF</h1>
      </div>
    </section>
  );
}
