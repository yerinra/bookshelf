import { Cross2Icon } from "@radix-ui/react-icons";

type HashtagsProps = {
  isbn13: string;
  hashtags: string[];
  handleTagRemove: (tagName: string, isbn13: string) => Promise<void>;
};

export default function Hashtags({
  isbn13,
  hashtags,
  handleTagRemove,
}: HashtagsProps) {
  return (
    <ul className="flex gap-1 justify-center flex-wrap">
      {hashtags.map((tag: string, i: number) => (
        <li
          className="flex gap-1 justify-center items-center text-xs py-1 px-2 border bg-l-bg-secondary border-l-border rounded-3xl dark:border-d-border dark:bg-d-bg-secondary cursor-default"
          key={i}
        >
          <div className="tagName">{tag}</div>
          <button
            className="cursor-pointer"
            onClick={() => {
              handleTagRemove(tag, isbn13);
            }}
          >
            <Cross2Icon width="12" />
          </button>
        </li>
      ))}
    </ul>
  );
}
