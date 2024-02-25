import Button from "../../atoms/Button";
import { useNavigate } from "react-router-dom";

type LoggedInButtonsProps = {
  logOut: () => Promise<void>;
};

export default function LoggedInButtons({ logOut }: LoggedInButtonsProps) {
  const navigate = useNavigate();
  return (
    <>
      <Button
        onClick={() => {
          navigate("/bookshelf");
        }}
        theme="sm-nav"
      >
        내 책장
      </Button>
      <Button onClick={logOut} theme="md-nav">
        로그아웃
      </Button>
    </>
  );
}
