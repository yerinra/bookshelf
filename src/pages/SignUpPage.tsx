import { useNavigate } from "react-router-dom";
import { signUpWithEmailAndPassword } from "../service/auth";
import { db } from "../service/firebase";
import { doc, setDoc } from "firebase/firestore";
import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import { TSignUpSchema, signUpSchema } from "../lib/types";
import H1 from "../components/H1";
import Button from "../components/button/Button";

export default function SignUpPage() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<TSignUpSchema>({ resolver: zodResolver(signUpSchema) });

  const navigate = useNavigate();

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
      navigate("/");
    } catch (e) {
      console.error(e);
    } finally {
      reset();
    }
  };

  return (
    <section className="flex flex-col gap-2 w-100 h-100 items-center font-medium">
      <H1>Sign Up</H1>

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
        <Button theme="reverse" type="submit" disabled={isSubmitting}>
          회원 가입하기
        </Button>
        <Button theme="accent" onClick={() => navigate("/login")}>
          로그인 하러가기
        </Button>
      </form>
    </section>
  );
}
