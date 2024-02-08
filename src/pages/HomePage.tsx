import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { userState } from "../store/userState";

export default function HomePage() {
  const currentUser = useRecoilValue(userState);
  const navigate = useNavigate();
  return (
    <div className="flex flex-col h-100 justify-center items-center gap-16">
      <p className="text-5xl font-extrabold mt-44">
        <span className="text-accent">나만의 책장</span>을 만들어 보세요.
      </p>
      <p className="line-clamp-2 leading-6 px-5 ">
        읽은 책을 빠짐없이 기록하고, 직접 만든 책장에 추가해서 더 풍요로운
        독서생활을 즐겨보세요 🎉
      </p>
      <section className="flex flex-col sm:flex-row gap-4">
        <button
          className="btn btn-home"
          onClick={() => {
            navigate("/info");
          }}
        >
          무엇을 할 수 있나요?
        </button>
        <button
          className="btn btn-home"
          onClick={() => {
            if (currentUser) navigate("/bookshelf");
            else navigate("/login");
          }}
        >
          책장 보러가기 &rarr;
        </button>
      </section>
    </div>
  );
}
