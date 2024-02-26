import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../../atoms/Input";

const SearchInput = () => {
  const [keyword, setKeyword] = useState("");
  const navigate = useNavigate();
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setKeyword("");
    navigate(`/books/${keyword}`);
  };

  return (
    <form
      className="flex sm:flex mx-10 lg:mx-20 w-3/4 sm:w-full"
      onSubmit={handleSubmit}
    >
      <Input
        type="text"
        value={keyword}
        placeholder="책의 제목을 입력하세요."
        onChange={handleChange}
      />
    </form>
  );
};

export default SearchInput;
