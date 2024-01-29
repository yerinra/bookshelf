import { useParams } from "react-router-dom";
import useBook from "../hooks/useBook";

const BookDetailPage: React.FC = () => {
  const { isbn } = useParams();

  const { isLoading, isError, data } = useBook(isbn);
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
  // const { title, author, description, cover, publisher, isbn13 } = selectedData[0];
  // console.log(book?[0].subInfo.itemPage)
  // console.log(JSON.stringify(selectedData));

  return (
    <div>
      {isLoading && <div>Loading...</div>}
      {selectedData &&
        selectedData.map((data) => (
          <section key={data.isbn13}>
            <img src={data.cover} alt="book cover image" />
            <div>{data.title}</div>
            <div>{data.author}</div>
            <div>{data.description}</div>
            <div>{data.publisher}</div>
            <div>{data.itemPage}쪽</div>
            <div>{data.isbn13}</div>
          </section>
        ))}
    </div>
  );
};

export default BookDetailPage;
