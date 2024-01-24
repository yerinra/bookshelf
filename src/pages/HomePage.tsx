import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();
  return (
    <div className="mx-7 h-screen flex flex-col justify-center items-center gap-16">
      <p className="text-5xl font-extrabold">
        <span className="bg-primary px-2 leading-snug cursor-none">
          {/* <span className="text-success hover:text-base-content"> */}
          나만의 책장
          {/* </span> */}
        </span>
        을 만들어 보세요.
      </p>
      <p className="line-clamp-2 leading-6 px-5">
        읽은 책을 빠짐없이 기록하고, 직접 만든 책장에 추가해서 더 풍요로운
        독서생활을 즐겨보세요 🎉
      </p>
      <section className="flex flex-col sm:flex-row gap-4">
        <button
          className="btn btn-outline btn-primary text-base-100 px-7"
          onClick={() => {
            navigate("/help");
          }}
        >
          무엇을 할 수 있나요?
        </button>
        <button
          className="btn btn-primary px-12"
          onClick={() => {
            navigate("/bookshelf");
          }}
        >
          책장 만들기 &rarr;
        </button>
      </section>
    </div>
  );
};

export default HomePage;
