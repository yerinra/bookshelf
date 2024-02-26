import { useNavigate } from "react-router-dom";
import { signUpWithEmailAndPassword } from "../service/auth";
import { db } from "../service/firebase";
import { doc, setDoc } from "firebase/firestore";
import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import { TSignUpSchema, signUpSchema } from "../lib/types";
import H1 from "../components/atoms/H1";
import SignUpError from "../components/molecules/SignUpForm/SignUpError";
import SignUpButtons from "../components/molecules/SignUpForm/SignUpButtons";
import SignUpInputs from "../components/molecules/SignUpForm/SignUpInputs";

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

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-2 w-[280px] sm:w-[320px]"
      >
        <SignUpError errors={errors} />
        <SignUpInputs register={register} />
        <SignUpButtons isSubmitting={isSubmitting} />
      </form>
    </section>
  );
}
