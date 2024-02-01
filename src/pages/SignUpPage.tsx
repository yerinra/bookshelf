import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { signUpWithEmailAndPassword } from "../service/auth";
import { useRecoilValue } from "recoil";
import { loginState, userState } from "../store/userState";
import { db } from "../service/firebase";
import { doc, setDoc } from "firebase/firestore";

const SignUpPage = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const login = useRecoilValue(loginState);
  const user = useRecoilValue(userState);
  const navigate = useNavigate();

  // 이미 로그인한 사람이 회원가입 페이지 접근시 홈페이지로 리다이렉트.
  useEffect(() => {
    if (login || !user) navigate("/");
  }, [login, user, navigate]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.name === "email") setEmail(e.target.value);
    else if (e.target.name === "password") setPassword(e.target.value);
  };

  const handleClick = (e: React.MouseEvent<HTMLInputElement>) => {
    const { name } = e.target as HTMLInputElement;
    if (name === "email") setEmail("");
    else if (name === "password") setPassword("");
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();

      const data = await signUpWithEmailAndPassword(email, password);

      if (data) {
        await setDoc(doc(db, "users", data.uid), {
          userName: data?.displayName || data?.uid,
          uid: data?.uid,
        });
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <>
      <h1>회원가입</h1>
      <section className="flex flex-col mx-auto max-w-xs my-20 gap-2 ">
        <form onSubmit={handleSubmit} className="flex flex-col gap-2">
          <input
            name="email"
            type="email"
            placeholder="Email"
            value={email}
            required
            onChange={handleInputChange}
            onClick={handleClick}
            className="input input-bordered w-full"
          />
          <input
            name="password"
            type="password"
            placeholder="Password"
            value={password}
            required
            onChange={handleInputChange}
            onClick={handleClick}
            className="input input-bordered w-full"
          />
          <button type="submit" className="btn btn-primary">
            회원 가입하기
          </button>
          <button
            type="submit"
            onClick={() => navigate("/login")}
            className="btn btn-link"
          >
            로그인 하러가기
          </button>
        </form>
      </section>
    </>
  );
};

export default SignUpPage;
