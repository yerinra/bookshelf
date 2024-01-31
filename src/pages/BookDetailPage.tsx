import { useParams } from "react-router-dom";
import useBook from "../hooks/useBook";
import { useEffect, useState } from "react";
import { collection, doc, onSnapshot, setDoc } from "firebase/firestore";
import { db } from "../service/firebase";
import { useRecoilState, useRecoilValue } from "recoil";
import { userState } from "../store/userState";
import { booksState } from "../store/booksState";
import { FaCheck } from "react-icons/fa";

const BookDetailPage = () => {
  const { isbn } = useParams();
  const currentUser = useRecoilValue(userState);
  const [bookList, setBookList] = useRecoilState(booksState);
  const { isLoading, isError, data } = useBook(isbn);
  const [added, setAdded] = useState(false);

  const selectedData = data?.map((v) => {
    return {
      author: v.author,
      title: v.title,
      cover: v.cover,
      description: v.description,
      isbn13: v.isbn13,
      pubDate: v.pubDate,
      itemPage: v?.subInfo?.itemPage,
    };
  });

  useEffect(() => {
    const getAllBooks = async () => {
      try {
        onSnapshot(collection(db, "users", currentUser, "books"), (doc) => {
          const mapped = doc?.docs?.map((doc) => doc?.data());
          setBookList(mapped);
          // console.log(mapped.map((v) => v.isbn13));
          // console.log(selectedData?.isbn13);
          if (mapped.filter((v) => v?.isbn13 === isbn).length !== 0) {
            setAdded(true);
          } else {
            setAdded(false);
          }
        });
      } catch (e) {
        console.error(e);
      }
    };
    if (currentUser && data) getAllBooks();
  }, [currentUser, data]);

  useEffect(() => {
    console.log(added);
    // console.log(selectedData);
  }, []);
  const handleAdd = async (isbn13, title, author, cover) => {
    try {
      await setDoc(doc(db, "users", currentUser, "books", isbn), {
        // books: arrayUnion({
        title: selectedData[0].title,
        author: selectedData[0].author,
        cover: selectedData[0].cover,
        isbn13: isbn,
        hashtags: [],
        itemPage: selectedData[0].itemPage,
        // }),
      });
      console.log(bookList);
    } catch (err) {
      console.error(err);
    }
    setAdded(true);
  };

  return (
    <div className="mt-16 mx-20">
      {isLoading && <div className="skeleton w-[200px] h-[300px]" />}
      {selectedData &&
        selectedData.map((data) => (
          <section
            key={data.isbn13}
            className="flex flex-col md:flex-row gap-8"
          >
            <img
              src={data.cover}
              alt="book cover image"
              className="rounded-lg max-w-[240px] mx-auto"
            />
            <div className="flex flex-col gap-3 text-start">
              <div className="font-extrabold text-2xl">{data.title}</div>
              <div className="text-neutral-400">{data.author}</div>
              <div>{data.description}</div>
              <div>{data.publisher}</div>
              <div>총 {data.itemPage}쪽</div>
              <button
                className="btn btn-outline"
                disabled={added}
                onClick={() =>
                  handleAdd(
                    isbn,
                    selectedData.title,
                    selectedData.author,
                    selectedData.cover
                  )
                }
              >
                {added ? <FaCheck /> : "책장에 추가하기"}
              </button>
            </div>
          </section>
        ))}
    </div>
  );
};

export default BookDetailPage;
