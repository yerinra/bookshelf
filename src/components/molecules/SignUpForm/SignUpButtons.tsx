import Button from "../../atoms/Button";
import { useNavigate } from "react-router-dom";

type SignUpButtonsProps = {
  isSubmitting: boolean;
};

export default function SignUpButtons({ isSubmitting }: SignUpButtonsProps) {
  const navigate = useNavigate();
  return (
    <>
      <Button theme="reverse" type="submit" disabled={isSubmitting}>
        회원 가입하기
      </Button>
      <Button theme="accent" onClick={() => navigate("/login")}>
        로그인 하러가기
      </Button>
    </>
  );
}
