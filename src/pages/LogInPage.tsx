import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithGoogle, logInWithEmailAndPassword } from "../service/auth";
import { useRecoilState, useRecoilValue } from "recoil";
import { userState } from "../store/userState";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../service/firebase";

const LogInPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [currentUser, setCurrentUser] = useRecoilState(userState);
  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser) navigate("/");
  }, [currentUser, navigate]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name === "email") setEmail(value);
    else if (name === "password") setPassword(value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      const data = await logInWithEmailAndPassword(email, password);
      if (data?.user) {
        setCurrentUser(data?.user?.displayName || data.user.uid);
        navigate("/bookshelf");
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const data = await signInWithGoogle();
      if (data?.user.uid) {
        setCurrentUser(data?.user?.displayName || data.user.uid);
        await setDoc(doc(db, "users", data?.user?.uid), {
          userName: data?.user?.displayName || data?.user?.uid,
          uid: data?.user?.uid,
        });
      }
      navigate("/bookshelf");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <section className="flex flex-col gap-2 w-100 h-100 items-center font-medium">
      <h1 className="py-10 font-extrabold text-4xl w-[320px] mt-20">Login</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-2">
        <input
          name="email"
          type="email"
          placeholder="Email"
          value={email}
          required
          onChange={handleInputChange}
          className="input w-[320px] pl-3 py-2 rounded-md"
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          value={password}
          required
          onChange={handleInputChange}
          className="input w-[320px] pl-3 py-2 rounded-md"
        />
        <button type="submit" className="btn">
          로그인
        </button>
      </form>
      <button onClick={handleGoogleLogin} className="btn w-[320px] btn-accent">
        구글 계정으로 로그인
      </button>
      <button
        onClick={() => navigate("/signup")}
        className="btn w-[320px] btn-reverse"
      >
        회원가입
      </button>
    </section>
  );
};

export default LogInPage;
