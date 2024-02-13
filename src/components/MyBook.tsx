import {
  Cross1Icon,
  Cross2Icon,
  StarFilledIcon,
  StarIcon,
} from "@radix-ui/react-icons";

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
      className="flex flex-col relative gap-10 justify-center items-center border border-l-border dark:border-d-border rounded-lg p-2 mt-2"
    >
      <ul className="flex flex-col gap-3 p-3 rounded-xl">
        <li className="font-bold text-lg ">{book.title}</li>
        <li className="text-xs">{book.author}</li>
        <li className="flex gap-1 justify-center flex-wrap">
          {book.hashtags &&
            book.hashtags?.map((tag: string, i: number) => (
              <button className="btn btn-xs btn-outline" key={i}>
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
      <section className="flex gap-1">
        {[1, 2, 3, 4, 5].map((v) => (
          <button>
            <StarIcon />
          </button>
        ))}
      </section>
      <input
        className="w-32 pl-2 pb-0.5 bg-l-bg-primary border border-l-text-secondary border-t-0 border-l-0 border-r-0 border-b-3 placeholder:text-l-text-secondary text-xs focus:outline-none "
        type="text"
        onChange={(e) => handleTagChange(e)}
        onKeyUp={(e) => handleAddTag(e, book.isbn13)}
        placeholder="해시태그를 입력하세요"
      />
      <button
        className="p-2 absolute top-0 right-0"
        onClick={() => handleBookRemove(book.isbn13)}
      >
        <Cross1Icon className="text-3xl " />
      </button>
    </div>
  );
}
