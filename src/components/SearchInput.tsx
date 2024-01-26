import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SearchInput() {
  const [keyword, setKeyword] = useState<string>("");
  const navigate = useNavigate();
  const handleChange = (e) => {
    setKeyword(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(`/books/${keyword}`);
  };

  return (
    <form
      className="form-control hidden md:flex px-5 w-full"
      onSubmit={handleSubmit}
    >
      <input
        type="text"
        placeholder="책의 제목을 입력하세요. "
        className="border-solid border-[1px] border-base-300 rounded-md px-3 py-2 outline-none"
        onChange={handleChange}
      />
    </form>
  );
}
