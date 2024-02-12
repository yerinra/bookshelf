import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { signUpWithEmailAndPassword } from "../service/auth";
import { useRecoilValue } from "recoil";
import { loginState, userState } from "../store/userState";
import { db } from "../service/firebase";
import { doc, setDoc } from "firebase/firestore";
import { useForm, FieldValues } from "react-hook-form";

export default function SignUpPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    getValues,
  } = useForm();

  const login = useRecoilValue(loginState);
  const user = useRecoilValue(userState);
  const navigate = useNavigate();

  // 이미 로그인한 사람이 회원가입 페이지 접근시 홈페이지로 리다이렉트.
  useEffect(() => {
    if (login || user) navigate("/");
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

  const onSubmit = async (data: FieldValues) => {
    try {
      const userData = await signUpWithEmailAndPassword(
        data.email,
        data.password
      );

      if (userData) {
        await setDoc(doc(db, "users", userData.uid), {
          userName: userData?.displayName || userData?.uid,
          uid: userData?.uid,
        });
      }
    } catch (e) {
      console.error(e);
    } finally {
      reset();
    }
  };

  return (
    <section className="flex flex-col gap-2 w-100 h-100 items-center font-medium">
      <h1 className="py-10 font-extrabold text-4xl w-[320px] mt-20">Sign Up</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2">
        {errors.email && (
          <p className="text-red-500">{`${errors.email.message}`}</p>
        )}
        {errors.password && (
          <p className="text-red-500">{`${errors.password.message}`}</p>
        )}
        {errors.confirmPassword && (
          <p className="text-red-500">{`${errors.confirmPassword.message}`}</p>
        )}
        <input
          {...register("email", { required: "Email is required" })}
          type="email"
          placeholder="Email"
          onClick={handleClick}
          className="input w-[320px] pl-3 py-2 rounded-md"
        />
        <input
          {...register("password", {
            required: "Password is required",
            minLength: {
              value: 10,
              message: "Password must be at least 10 characters",
            },
          })}
          type="password"
          placeholder="Password"
          onClick={handleClick}
          className="input w-[320px] pl-3 py-2 rounded-md"
        />
        <input
          {...register("confirmPassword", {
            required: "Please confirm the password",
            validate: (value) =>
              value === getValues("password") || "Passwords must match.",
          })}
          type="password"
          placeholder="Confirm Password"
          onClick={handleClick}
          className="input w-[320px] pl-3 py-2 rounded-md"
        />
        <button
          type="submit"
          disabled={isSubmitting}
          className="btn w-[320px] btn-reverse"
        >
          회원 가입하기
        </button>
        <button
          type="submit"
          onClick={() => navigate("/login")}
          className="btn w-[320px] btn-accent"
        >
          로그인 하러가기
        </button>
      </form>
    </section>
  );
}
