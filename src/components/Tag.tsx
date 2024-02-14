import { twMerge } from "tailwind-merge";

type Tag = {
  selectedTag: string | null;
  handleSelectTag: (tagName: string) => void;
  tag: string;
};
export default function Tag({ selectedTag, handleSelectTag, tag }: Tag) {
  return (
    <button
      className={twMerge(
        "w-fit text-sm py-1 px-3 border bg-l-bg-secondary border-l-border rounded-3xl dark:border-d-border dark:bg-d-bg-secondary text-l-text-primary dark:text-d-text-secondary hover:bg-l-border transition-all hover:dark:bg-d-border",
        selectedTag == tag &&
          "bg-accent hover:bg-accent-fade border-accent dark:bg-accent dark:border-accent dark:text-l-text-primary dark:hover:bg-accent-fade "
      )}
      onClick={() => handleSelectTag(tag)}
    >
      {`#${tag}`}
    </button>
  );
}
