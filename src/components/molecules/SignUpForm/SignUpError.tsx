import { FieldErrors } from "react-hook-form";
import { TSignUpSchema } from "../../../lib/types";

type SignUpErrorProps = {
  errors: FieldErrors<TSignUpSchema>;
};

export default function SignUpError({ errors }: SignUpErrorProps) {
  return (
    <>
      {errors.email && (
        <p className="text-error">{`${errors.email.message}`}</p>
      )}
      {errors.password && (
        <p className="text-error">{`${errors.password.message}`}</p>
      )}
      {errors.confirmPassword && (
        <p className="text-error">{`${errors.confirmPassword.message}`}</p>
      )}
    </>
  );
}
