import { HashTags } from "../lib/types";
import Tag from "./Tag";
type Tags = {
  allTags: HashTags;
  handleSelectTag: (tagName: string) => void;
  selectedTag: string | null;
};

export default function Tags({ allTags, handleSelectTag, selectedTag }: Tags) {
  return (
    <div className="flex gap-5 mb-3 py-5 p-10 rounded-lg dark:border-d-border ">
      <div className="flex flex-row md:flex-col gap-2 flex-wrap">
        {allTags &&
          allTags.map((tag, i) => (
            <Tag
              key={`${tag}-${i}`}
              tag={tag}
              handleSelectTag={handleSelectTag}
              selectedTag={selectedTag}
            />
          ))}
      </div>
    </div>
  );
}
