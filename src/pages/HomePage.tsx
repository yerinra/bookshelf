import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { userState } from "../store/userState";
import Button from "../components/atoms/Button";
import { SEOMetaTags } from "../components/molecules/SEOMetaTags";

export default function HomePage() {
  const currentUser = useRecoilValue(userState);
  const navigate = useNavigate();

  return (
    <>
      <SEOMetaTags
        title="BOOK:SHELF - 나의 온라인 책장"
        desc="나만의 온라인 책장을 만들어 보세요!"
      />
      <main className="flex flex-col h-100 items-center gap-y-16 sm:mx-10 mt-auto">
        <p className="text-4xl sm:text-5xl font-extrabold md:mt-24 px-10">
          <span className="text-accent">나만의 책장📚</span>을 만들어 보세요.
        </p>
        <p className="leading-6 px-5 ">
          읽은 책을 빠짐없이 기록하고, 직접 만든 책장에 추가해서 더 풍요로운
          독서생활을 즐겨보세요 🎉
        </p>
        <section className="flex flex-col sm:flex-row gap-4">
          <Button
            theme="rounded-reverse"
            onClick={() => {
              navigate("/info");
            }}
          >
            무엇을 할 수 있나요?
          </Button>
          <Button
            theme="rounded-accent"
            onClick={() => {
              if (currentUser) navigate("/bookshelf");
              else navigate("/login");
            }}
          >
            책장 보러가기<span className="ml-2">&rarr;</span>
          </Button>
        </section>
      </main>
    </>
  );
}
