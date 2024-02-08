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
    <form className="hidden md:flex px-5 w-full" onSubmit={handleSubmit}>
      <input
        type="text"
        value={keyword}
        placeholder="책의 제목을 입력하세요. "
        className="input border w-full border-l-border dark:border-d-border px-3 py-2 rounded-lg"
        onChange={handleChange}
      />
    </form>
  );
};

export default SearchInput;
