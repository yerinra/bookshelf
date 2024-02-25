type HashtagInputProps = {
  onChangeTag: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onAddTag: (
    e: React.KeyboardEvent<HTMLInputElement>,
    isbn: string
  ) => Promise<void>;
  isbn13: string;
};

export default function HashtagInput({
  onChangeTag,
  onAddTag,
  isbn13,
}: HashtagInputProps) {
  return (
    <input
      className="w-32 mx-2 px-2 pb-0.5 bg-l-bg-secondary dark:bg-d-bg-secondary placeholder:text-l-text-secondary text-xs focus:outline-none"
      type="text"
      onChange={(e) => onChangeTag(e)}
      onKeyUp={(e) => onAddTag(e, isbn13)}
      placeholder="해시태그를 입력하세요"
    />
  );
}
