import { useParams } from "react-router-dom";
import useBooks from "../hooks/useBooks";

function BookSearchResultPage() {
  const { keyword } = useParams();
  const { isLoading, data } = useBooks(keyword);
  console.log(data?.pages.map((v) => v.item)[0]);
  const finalData = data?.pages.map((v) => v.item)[0];
  return (
    <main>
      {isLoading && <div>loading...</div>}
      {data &&
        finalData?.length > 0 &&
        data?.pages.map((v) =>
          v.item.map((val, i) => <div key={i}>{val.title}</div>)
        )}
      {finalData?.length == 0 && <div>no data</div>}
    </main>
  );
}
export default BookSearchResultPage;
