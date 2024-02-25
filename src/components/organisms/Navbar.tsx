import { auth } from "../../service/firebase";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { userState } from "../../store/userState";
import SearchInput from "../molecules/NavBar/SearchInput";
import { toast } from "sonner";
import Logo from "../molecules/NavBar/Logo";
import LoggedOutButtons from "../molecules/NavBar/LoggedOutButtons";
import LoggedInButtons from "../molecules/NavBar/LoggedInButtons";

export default function NavBar() {
  const [user, setUser] = useRecoilState(userState);
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

  return (
    <nav className="flex justify-between mx-20 py-3">
      <Logo />
      <section className="flex items-center">
        <SearchInput />
      </section>
      <section className="flex gap-3 items-center pr-2">
        {user && <LoggedInButtons logOut={logOut} />}
        {!user && <LoggedOutButtons />}
      </section>
    </nav>
  );
}
