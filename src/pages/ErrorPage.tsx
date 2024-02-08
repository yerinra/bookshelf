import { useNavigate } from "react-router-dom";

export default function ErrorPage() {
  const navigate = useNavigate();
  return (
    <section className="flex flex-col items-center gap-10 mt-10">
      <h1 className="text-accent text-5xl font-semibold">Oops! Wrong Path!</h1>

      <button
        className="btn px-3"
        onClick={() => {
          navigate("/");
        }}
      >
        Go to Home
      </button>
    </section>
  );
}
