import { Book } from "../../lib/types";

type TitleAndAuthorInfoProps = {
  onClick: () => void;
  book: Book;
};
export default function TitleAndAuthorInfo({
  onClick,
  book,
}: TitleAndAuthorInfoProps) {
  const { title, author } = book;

  return (
    <>
      <div
        className="font-semibold text-start text-md cursor-pointer w-full"
        onClick={onClick}
      >
        {title}
      </div>
      <div className="text-xs text-l-text-secondary">
        {author.length > 30 ? author.slice(0, 30) + " ..." : author}
      </div>
    </>
  );
}
