import { useParams } from "react-router-dom";
// import useBooks from "../hooks/useBooks";
import { useEffect, useState } from "react";
import { fetchBooksData } from "../api/aladin";
import BookCard from "../components/BookCard";

const BookSearchResultPage2 = () => {
  const { keyword } = useParams();
  const pageNum = 1;
  const [books, setBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchBooks = async () => {
      setIsLoading(true);
      try {
        const { data } = await fetchBooksData(keyword, pageNum);
        // console.log(data?.item);
        setBooks(data?.item);
        setIsLoading(false);
      } catch (err) {
        setError(true);
        setIsLoading(false);
      }
    };
    fetchBooks();
  }, [keyword, pageNum]);

  return (
    <section className="text-left">
      {isLoading && <div>Loading...please wait...</div>}
      <h2 className="">{keyword + "에 대한 검색 결과입니다."}</h2>

      {books && books.length > 0 && (
        <div>
          {books &&
            books.length > 0 &&
            books?.map((bookData) => (
              <BookCard
                book={bookData}
                key={`${bookData?.isbn13}-${bookData.title}`}
              />
            ))}
        </div>
      )}
    </section>
  );
};

export default BookSearchResultPage2;
