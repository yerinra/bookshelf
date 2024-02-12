import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { signUpWithEmailAndPassword } from "../service/auth";
import { useRecoilValue } from "recoil";
import { loginState, userState } from "../store/userState";
import { db } from "../service/firebase";
import { doc, setDoc } from "firebase/firestore";
import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import { TSignUpSchema, signUpSchema } from "../lib/types";

export default function SignUpPage() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<TSignUpSchema>({ resolver: zodResolver(signUpSchema) });

  const login = useRecoilValue(loginState);
  const user = useRecoilValue(userState);
  const navigate = useNavigate();

  // 이미 로그인한 사람이 회원가입 페이지 접근시 홈페이지로 리다이렉트.
  useEffect(() => {
    if (login || user) navigate("/");
  }, [login, user, navigate]);

  const onSubmit = async (data: TSignUpSchema) => {
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
          <p className="errorMessage">{`${errors.email.message}`}</p>
        )}
        {errors.password && (
          <p className="errorMessage">{`${errors.password.message}`}</p>
        )}
        {errors.confirmPassword && (
          <p className="errorMessage">{`${errors.confirmPassword.message}`}</p>
        )}
        <input
          {...register("email")}
          type="email"
          placeholder="Email"
          className="input w-[320px] pl-3 py-2 rounded-md"
        />
        <input
          {...register("password")}
          type="password"
          placeholder="Password"
          className="input w-[320px] pl-3 py-2 rounded-md"
        />
        <input
          {...register("confirmPassword")}
          type="password"
          placeholder="Confirm Password"
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
