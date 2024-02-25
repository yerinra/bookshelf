import Button from "../../atoms/Button";
import { useNavigate } from "react-router-dom";

export default function LoggedOutButtons() {
  const navigate = useNavigate();
  return (
    <>
      <Button
        onClick={() => {
          navigate("/signup");
        }}
        theme="md-nav"
      >
        회원가입
      </Button>
      <Button
        onClick={() => {
          navigate("/login");
        }}
        theme="sm-nav"
      >
        로그인
      </Button>
    </>
  );
}
