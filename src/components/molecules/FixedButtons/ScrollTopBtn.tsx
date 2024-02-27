import { ChevronUpIcon } from "@radix-ui/react-icons";

export default function ScrollTopBtn() {
  return (
    <button
      className="bottom-5 right-5 fixed text-3xl rounded-full block sm:block"
      onClick={() => {
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
      }}
      aria-label="go to the top"
    >
      <ChevronUpIcon width="20" height="20" />
    </button>
  );
}
