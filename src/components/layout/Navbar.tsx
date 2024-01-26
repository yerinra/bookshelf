import { useState } from "react";
import { auth } from "../../service/firebase";
import { signOut } from "firebase/auth";
import { BsBookshelf } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { loginState, userState } from "../../store/userState";
import SearchInput from "../SearchInput";

const NavBar = () => {
  const navigate = useNavigate();
  const [login, setLogin] = useRecoilState(loginState);
  const [user, setUser] = useRecoilState(userState);

  const logOut = async () => {
    try {
      await signOut(auth);
      setLogin(false);
      setUser(null);
      navigate("/");
    } catch (err) {
      // console.error(err);
    }
  };

  return (
    <nav className="flex justify-between mx-7 py-3">
      <Link to={"/"} className="flex items-center justify-center gap-3">
        <button className="p-2 text-2xl font-extrabold bg-primary rounded-full">
          <BsBookshelf />
        </button>
        <h1 className="text-xl font-extrabold cursor-pointer">BOOK:SHELF</h1>
      </Link>
      <section className="flex items-center w-1/3">
        <SearchInput />
      </section>
      <section className="flex gap-3 items-center pr-2">
        {user ? (
          <>
            <button
              onClick={() => {
                navigate("/bookshelf");
              }}
              className="btn btn-ghost text-primary"
            >
              내 책장
            </button>
            <button onClick={logOut} className="btn btn-ghost hidden sm:block">
              로그아웃
            </button>
          </>
        ) : (
          <>
            <button
              onClick={() => {
                navigate("/signup");
              }}
              className="btn btn-ghost hidden sm:block"
            >
              회원가입
            </button>
            <button
              onClick={() => {
                navigate("/login");
              }}
              className="btn btn-ghost text-primary"
            >
              로그인
            </button>
          </>
        )}
      </section>
    </nav>
  );
};

export default NavBar;
