import { twMerge } from "tailwind-merge";

type Tag = {
  selectedTag: string | null;
  handleSelectTag: (tagName: string) => void;
  tag: string;
};
export default function Tag({ selectedTag, handleSelectTag, tag }: Tag) {
  return (
    <button
      // className={`py-1 px-3 border border-l-border rounded-3xl ${
      //   selectedTag == tag && "bg-accent border-accent"
      // }`}
      className={twMerge("py-1 px-3 border border-l-border rounded-3xl")}
      onClick={() => handleSelectTag(tag)}
    >
      {tag}
    </button>
  );
}
