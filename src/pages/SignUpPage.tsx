import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signUpWithEmailAndPassword } from "../service/auth";

const SignUpPage = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleInputChange = (e) => {
    if (e.target.name === "email") setEmail(e.target.value);
    else if (e.target.name === "password") setPassword(e.target.value);
  };

  const handleClick = (e) => {
    if (e.target.name === "email") setEmail("");
    else if (e.target.name === "password") setPassword("");
  };

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await signUpWithEmailAndPassword(email, password);
    console.log(data);
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
          <button
            type="submit"
            onClick={handleSubmit}
            className="btn btn-primary"
          >
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
