import { BookmarkFilledIcon, BookmarkIcon } from "@radix-ui/react-icons";

type BookMarkBtnProps = {
  onClick: () => Promise<void>;
  added: boolean;
};

export default function BookMarkBtn({ onClick, added }: BookMarkBtnProps) {
  return (
    <button
      className="mt-3"
      onClick={onClick}
      aria-label="add or remove book to bookshelf"
    >
      {added && <BookmarkFilledIcon width="20" height="20" />}
      {!added && <BookmarkIcon width="20" height="20" />}
    </button>
  );
}
