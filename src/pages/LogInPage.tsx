import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithGoogle, logInWithEmailAndPassword } from "../service/auth";

const LogInPage = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

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
      // console.log(data);
      if (data) navigate("/");
    } catch (err) {
      // console.log(err);
    }
  };

  const handleGoogleLogin = async () => {
    const data = await signInWithGoogle();
    console.log(data);
  };

  return (
    <>
      <h1>로그인</h1>
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
