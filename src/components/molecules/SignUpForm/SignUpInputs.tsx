import { UseFormRegister } from "react-hook-form";
import { TSignUpSchema } from "../../../lib/types";

type SignUpInputsProps = {
  register: UseFormRegister<TSignUpSchema>;
};

export default function SignUpInputs({ register }: SignUpInputsProps) {
  const inputClassNames =
    "placeholder:text-l-text-secondary bg-l-bg-primary dark:bg-d-bg-secondary border border-l-border dark:border-d-border hover:border-l-text-secondary focus:border-l-text-primary focus:dark:border-d-text-primary hover:dark:border-d-text-secondary  w-full px-3 py-2 rounded-lg focus:outline-l-text-secondary focus:dark:outline-d-text-secondary w-full";

  return (
    <>
      <input
        {...register("email")}
        type="email"
        placeholder="Email"
        className={inputClassNames}
      />
      <input
        {...register("password")}
        type="password"
        placeholder="Password"
        className={inputClassNames}
      />
      <input
        {...register("confirmPassword")}
        type="password"
        placeholder="Confirm Password"
        className={inputClassNames}
      />
    </>
  );
}
