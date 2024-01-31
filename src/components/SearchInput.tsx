import { useState } from "react";
import { useNavigate } from "react-router-dom";

const SearchInput = () => {
  const [keyword, setKeyword] = useState<string>("");
  const navigate = useNavigate();
  const handleChange = (e) => {
    setKeyword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setKeyword("");
    navigate(`/books/${keyword}`);
  };

  return (
    <form
      className="form-control hidden md:flex px-5 w-full"
      onSubmit={handleSubmit}
    >
      <input
        type="text"
        value={keyword}
        placeholder="책의 제목을 입력하세요. "
        className=" rounded-md px-3 py-2 outline-none bg-base-200"
        onChange={handleChange}
      />
    </form>
  );
};

export default SearchInput;
