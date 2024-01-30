import { IoRemoveCircle } from "react-icons/io5";
import { CiBookmarkRemove } from "react-icons/ci";

export default function MyBook({
  book,
  handleTagRemove,
  handleTagChange,
  handleAddTag,
  handleBookRemove,
}) {
  return (
    <div
      key={`${book.isbn13}-${book.title}`}
      className="flex flex-col relative gap-10 justify-center items-center border border-neutral-700 rounded-lg w-[461px] h-[340px] p-5"
    >
      <ul className="flex flex-col gap-3">
        <li className="font-bold text-xl ">{book.title}</li>
        <li className="text-neutral-400 text-sm">{book.author}</li>
        <li className="flex gap-1 justify-center flex-wrap">
          {book.hashtags &&
            book.hashtags?.map((tag, i) => (
              <button className="btn btn-xs" key={i}>
                <div className="tagName">{tag}</div>
                <div
                  onClick={() => {
                    handleTagRemove(tag, book.isbn13);
                  }}
                >
                  x
                </div>
              </button>
            ))}
        </li>
      </ul>

      <input
        className="w-36 pl-2 pb-0.5 border border-neutral-400 border-t-0 border-l-0 border-r-0 border-b-3 placeholder:text-neutral-400 text-sm focus:outline-none"
        type="text"
        onChange={(e) => handleTagChange(e)}
        onKeyUp={(e) => handleAddTag(e, book.isbn13)}
        placeholder="해시태그를 입력하세요"
      />
      <button
        className="p-2 absolute top-0 right-0"
        onClick={() => handleBookRemove(book.isbn13)}
      >
        <CiBookmarkRemove className="text-3xl hover:text-red-600" />
      </button>
    </div>
  );
}
