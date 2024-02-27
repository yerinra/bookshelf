import { useNavigate } from "react-router-dom";
import Button from "../components/atoms/Button";
import H1 from "../components/atoms/H1";
import { SEOMetaTags } from "../components/molecules/SEOMetaTags";

export default function ErrorPage() {
  const navigate = useNavigate();
  return (
    <>
      <SEOMetaTags title={`Error - BOOK:SHELF`} desc={`에러 페이지입니다.`} />
      <section className="flex flex-col items-center gap-10 mt-10">
        <H1>Oops! Wrong Path!</H1>
        <div className="w-[320px]">
          <Button
            theme="accent"
            onClick={() => {
              navigate("/");
            }}
          >
            Go to Home
          </Button>
        </div>
      </section>
    </>
  );
}
