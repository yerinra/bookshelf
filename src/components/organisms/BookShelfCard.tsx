import { useNavigate } from "react-router-dom";
import Rating from "../molecules/BookShelf/Rating";
import type { Book } from "../../lib/types";
import Hashtags from "../molecules/BookShelf/Hashtags";
import BookRemoveBtn from "../molecules/BookShelf/BookRemoveBtn";
import HashtagInput from "../molecules/BookShelf/HashtagInput";
import TitleAndAuthorInfo from "../molecules/TitleAndAuthorInfo";

type BookShelfCardProps = {
  book: Book;
  handleTagRemove: (tagName: string, isbn13: string) => Promise<void>;
  handleTagChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleAddTag: (
    e: React.KeyboardEvent<HTMLInputElement>,
    isbn: string
  ) => Promise<void>;
  handleBookRemove: (isbn13: string) => Promise<void>;
  updateRating: (isbn13: string, num: number) => Promise<void>;
};

export default function BookShelfCard({
  book,
  handleTagRemove,
  handleTagChange,
  handleAddTag,
  handleBookRemove,
  updateRating,
}: BookShelfCardProps) {
  const navigate = useNavigate();

  return (
    <section className="flex flex-col w-full relative gap-5 justify-center items-start  px-4 py-2 mb-2 hover:bg-l-bg-secondary hover:dark:bg-d-bg-secondary">
      <div className="flex flex-col w-full items-start gap-3 p-3 rounded-xl">
        <TitleAndAuthorInfo
          onClick={() => navigate(`/book/${book.isbn13}`)}
          book={book}
        />
        <Hashtags
          isbn13={book.isbn13}
          hashtags={book.hashtags || []}
          handleTagRemove={handleTagRemove}
        />
      </div>
      <Rating
        isbn13={book.isbn13}
        savedRating={book.rating || 0}
        updateRating={updateRating}
      />
      <HashtagInput
        onChangeTag={handleTagChange}
        onAddTag={handleAddTag}
        isbn13={book.isbn13}
      />
      <BookRemoveBtn onBookRemove={handleBookRemove} isbn13={book.isbn13} />
    </section>
  );
}
