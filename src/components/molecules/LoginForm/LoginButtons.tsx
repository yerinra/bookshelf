import Button from "../../atoms/Button";
import { useNavigate } from "react-router-dom";

type LoginButtonsProps = {
  handleClick: () => Promise<void>;
};

export default function LoginButtons({ handleClick }: LoginButtonsProps) {
  const navigate = useNavigate();
  return (
    <>
      <div className="w-[280px] sm:w-[320px]">
        <Button onClick={handleClick} theme="accent">
          구글 계정으로 로그인
        </Button>
      </div>

      <div className="w-[280px] sm:w-[320px]">
        <Button onClick={() => navigate("/signup")} theme="reverse">
          회원가입
        </Button>
      </div>
    </>
  );
}
