import { auth } from "../../service/firebase";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { userState } from "../../store/userState";
import SearchInput from "../molecules/NavBar/SearchInput";
import { toast } from "sonner";
import Logo from "../molecules/NavBar/Logo";
import { HamburgerMenuIcon } from "@radix-ui/react-icons";
import Button from "../atoms/Button";
import { Suspense, lazy, useState } from "react";
import NavButtons from "../molecules/NavBar/NavButtons";
import Spinner from "../molecules/Spinner";
const BackgroundBlur = lazy(() => import("../molecules/NavBar/BackgroundBlur"));
const SlidingMenu = lazy(() => import("../molecules/NavBar/SlidingMenu"));

export default function NavBar() {
  const [user, setUser] = useRecoilState(userState);
  const [navOpen, setNavOpen] = useState(false);
  const navigate = useNavigate();

  const logOut = async () => {
    try {
      await signOut(auth);
      setUser(null);
      navigate("/");
      toast.success("성공적으로 로그아웃 되었습니다.");
    } catch (err) {
      console.error(err);
    }
  };

  const closeNav = () => {
    setNavOpen(false);
  };

  return (
    <nav className="flex items-center md:mx-20 py-3">
      <Button theme="ghost-menu" onClick={() => setNavOpen(true)}>
        <HamburgerMenuIcon width={28} height={28} />
      </Button>
      <Logo />
      <Suspense fallback={<Spinner />}>
        <BackgroundBlur navOpen={navOpen} closeNav={closeNav} />
        <SlidingMenu
          user={user}
          navOpen={navOpen}
          logOut={logOut}
          onClose={closeNav}
        />
      </Suspense>
      <div className="flex flex-1 items-center">
        <SearchInput />
      </div>
      <div className="flex gap-3 items-center pr-2">
        <NavButtons
          user={user}
          classNames="hidden sm:flex"
          closeNav={closeNav}
          logOut={logOut}
          direction="row"
        />
      </div>
    </nav>
  );
}
