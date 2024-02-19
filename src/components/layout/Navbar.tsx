import { auth } from "../../service/firebase";
import { signOut } from "firebase/auth";
import { FrameIcon } from "@radix-ui/react-icons";
import { Link, useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { userState } from "../../store/userState";
import SearchInput from "../SearchInput";
import { toast } from "sonner";

export default function NavBar() {
  const navigate = useNavigate();
  const [user, setUser] = useRecoilState(userState);

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
      <Link to="/" className="flex items-center justify-center gap-3">
        <button className="p-2 text-2xl font-extrabold bg-[#ffbb55] rounded-full">
          <FrameIcon width="20" height="20" />
        </button>
        <h1 className="text-xl font-extrabold cursor-pointer">BOOK:SHELF</h1>
      </Link>
      <section className="flex items-center">
        <SearchInput />
      </section>
      <section className="flex gap-3 items-center pr-2">
        {user ? <LoggedInButtons logOut={logOut} /> : <LoggedOutButtons />}
      </section>
    </nav>
  );
}

type LoggedInButtonsProps = {
  logOut: () => Promise<void>;
};

function LoggedInButtons({ logOut }: LoggedInButtonsProps) {
  const navigate = useNavigate();
  return (
    <>
      <button
        onClick={() => {
          navigate("/bookshelf");
        }}
        className="btn btn-nav hidden sm:block"
      >
        내 책장
      </button>
      <button onClick={logOut} className="btn btn-nav hidden md:block">
        로그아웃
      </button>
    </>
  );
}

function LoggedOutButtons() {
  const navigate = useNavigate();

  return (
    <>
      <button
        onClick={() => {
          navigate("/signup");
        }}
        className="btn btn-nav hidden md:block"
      >
        회원가입
      </button>
      <button
        onClick={() => {
          navigate("/login");
        }}
        className="btn btn-nav hidden sm:block"
      >
        로그인
      </button>
    </>
  );
}
