import { BookInfo } from "../../../lib/types";
import { AddedButton, DefaultButton } from "./BookAddButton";

type BookMetaDataProps = {
  book: BookInfo;
  added: boolean;
  handleClick: () => void;
};

export default function BookMetaData({
  book,
  added,
  handleClick,
}: BookMetaDataProps) {
  return (
    <section className="flex flex-col md:flex-row">
      <img
        src={book.cover}
        alt="book cover image"
        className="rounded-lg max-w-[200px] mx-auto  mb-8 object-cover"
      />
      <section className="flex flex-col gap-3 md:ml-8 text-start mb-28">
        <p className="font-extrabold text-2xl">{book.title}</p>
        <p className="text-neutral-400">{book.author}</p>
        <p>{book.description}</p>
        <p>총 {book.itemPage}쪽</p>
        <div className="md:max-w-[320px]">
          {!added && <AddedButton handleClick={handleClick} />}
          {!!added && <DefaultButton handleClick={handleClick} />}
        </div>
      </section>
    </section>
  );
}
