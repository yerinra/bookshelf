import { MdKeyboardArrowUp } from "react-icons/md";

export default function ScrollTopBtn() {
  return (
    <button
      className="bottom-5 right-5 fixed text-3xl rounded-full hidden sm:block bg-base-100"
      onClick={() => {
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
      }}
    >
      <MdKeyboardArrowUp />
    </button>
  );
}
