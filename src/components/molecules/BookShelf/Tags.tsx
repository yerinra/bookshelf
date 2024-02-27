import { HashTags } from "../../../lib/types";
import Tag from "./Tag";

type Tags = {
  allTags: HashTags;
  handleSelectTag: (tagName: string) => void;
  selectedTag: string | null;
};

export default function Tags({ allTags, handleSelectTag, selectedTag }: Tags) {
  return (
    <section className="flex sm:flex-col gap-2 flex-wrap mb-3 sm:p-0 rounded-lg dark:border-d-border w-full justify-center items-center sm:items-start sm:justify-start sm:w-1/3">
      {allTags &&
        allTags.map((tag, i) => (
          <Tag
            key={`${tag}-${i}`}
            tag={tag}
            handleSelectTag={handleSelectTag}
            selectedTag={selectedTag}
          />
        ))}
    </section>
  );
}
