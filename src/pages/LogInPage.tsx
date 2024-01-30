import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithGoogle, logInWithEmailAndPassword } from "../service/auth";
import { useRecoilState } from "recoil";
import { loginState, userState } from "../store/userState";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../service/firebase";

const LogInPage: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const [login, setLogin] = useRecoilState(loginState);
  const [currentUser, setCurrentUser] = useRecoilState(userState);

  useEffect(() => {
    if (currentUser || login) navigate("/");
  }, [currentUser, login]);

  const navigate = useNavigate();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { name, value },
    } = e;

    if (name === "email") setEmail(value);
    else if (name === "password") setPassword(value);
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const data = await logInWithEmailAndPassword(email, password);
      setCurrentUser(data?.user?.uid);
      navigate("/bookshelf");
    } catch (err) {
      // console.log(err);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const data = await signInWithGoogle();
      setCurrentUser(data?.user?.uid);
      navigate("/bookshelf");
    } catch (err) {
      // console.error(err);
    }
  };

  return (
    <>
      <h1>로그인</h1>
      {/* {currentUser && (
        <div className="flex gap-4 items-start text-start mx-10 mb-5 border border-1 border-slate-700 px-7 py-5 rounded-lg">
          <div className="skeleton w-[85px] h-[115px] rounded-lg shrink-0"></div>
          <div className="flex flex-col gap-3">
            <div className="skeleton w-120 mt-1 h-5 rounded-sm" />
            <div className="skeleton w-20 h-4" />
            <div className="skeleton w-32 h-6 rounded-lg" />
          </div>
        </div>
      )} */}
      <section className="flex flex-col mx-auto max-w-xs my-20 gap-2 ">
        <form onSubmit={handleSubmit} className="flex flex-col gap-2">
          <input
            name="email"
            type="email"
            placeholder="Email"
            value={email}
            required
            onChange={handleInputChange}
            className="input input-bordered w-full"
          />
          <input
            name="password"
            type="password"
            placeholder="Password"
            value={password}
            required
            onChange={handleInputChange}
            className="input input-bordered w-full"
          />
          <button
            type="submit"
            onClick={handleSubmit}
            className="btn btn-primary"
          >
            로그인
          </button>
        </form>
        <button onClick={handleGoogleLogin} className="btn">
          구글 계정으로 로그인
        </button>
        <button
          onClick={() => navigate("/signup")}
          className="btn btn-outline btn-primary"
        >
          회원가입
        </button>
      </section>
    </>
  );
};

export default LogInPage;
