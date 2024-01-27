import { useNavigate } from "react-router-dom";

export interface BookResult {
  title: string;
  author: string;
  publisher: string;
  pubDate: string;
  isbn13: string;
  cover: string;
  salesPoint: number;
}

const BookCard: React.FC = ({ book }) => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/book/${isbn13}`);
  };

  const { title, author, publisher, pubDate, cover, isbn13, salesPoint } = book;
  return (
    <div className="flex gap-4 items-start text-start mx-10 mb-5 border border-1 border-slate-700 px-7 py-5 rounded-lg">
      <img
        onClick={handleClick}
        src={cover}
        className="rounded-lg cursor-pointer"
      />
      <div className="flex flex-col gap-2">
        <div
          className="font-semibold text-md cursor-pointer"
          onClick={handleClick}
        >
          {title}
        </div>
        <div className="text-gray-400 text-xs">
          {author.length > 30 ? author.slice(0, 30) + " ..." : author}
        </div>
        {/* <div className="text-xs">{publisher}</div> */}
        <button className="btn btn-outline btn-xs max-w-32 mt-1">
          내 책장에 추가하기
        </button>
      </div>
    </div>
  );
};
export default BookCard;
