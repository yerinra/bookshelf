import { Cross1Icon, Cross2Icon } from "@radix-ui/react-icons";
import { useNavigate } from "react-router-dom";
import Rating from "./Rating";

export default function MyBook({
  book,
  handleTagRemove,
  handleTagChange,
  handleAddTag,
  handleBookRemove,
  updateRating,
}) {
  const navigate = useNavigate();

  return (
    <div
      key={`${book.isbn13}-${book.title}`}
      className="flex flex-col max-w-sm min-w-[375px] relative gap-5 justify-center items-start border border-l-border dark:border-d-border rounded-lg px-4 py-2 mb-2"
    >
      <ul className="flex flex-col w-full items-start gap-3 p-3 rounded-xl">
        <li
          className="font-bold text-md cursor-pointer"
          onClick={() => navigate(`/book/${book.isbn13}`)}
        >
          {book.title}
        </li>
        <li className="text-xs">{book.author}</li>
        <li className="flex gap-1 justify-center flex-wrap">
          {book.hashtags &&
            book.hashtags?.map((tag: string, i: number) => (
              <button
                className="flex gap-1 justify-center items-center text-xs py-1 px-2 border bg-l-bg-secondary border-l-border rounded-3xl dark:border-d-border dark:bg-d-bg-secondary cursor-default"
                key={i}
              >
                <div className="tagName">{tag}</div>
                <div
                  className="cursor-pointer"
                  onClick={() => {
                    handleTagRemove(tag, book.isbn13);
                  }}
                >
                  <Cross2Icon width="12" />
                </div>
              </button>
            ))}
        </li>
      </ul>
      <Rating
        isbn13={book.isbn13}
        savedRating={book.rating}
        updateRating={updateRating}
      />
      <input
        className="w-32 mx-2 px-2 pb-0.5 bg-l-bg-secondary dark:bg-d-bg-secondary placeholder:text-l-text-secondary text-xs focus:outline-none"
        type="text"
        onChange={(e) => handleTagChange(e)}
        onKeyUp={(e) => handleAddTag(e, book.isbn13)}
        placeholder="해시태그를 입력하세요"
      />
      <button
        className="p-2 absolute top-1 right-1"
        onClick={() => handleBookRemove(book.isbn13)}
      >
        <Cross1Icon className="text-3xl " />
      </button>
    </div>
  );
}
