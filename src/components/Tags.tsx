import { HashTags } from "../lib/types";
import Tag from "./Tag";
type Tags = {
  allTags: HashTags;
  handleSelectTag: (tagName: string) => void;
  selectedTag: string | null;
};

export default function Tags({ allTags, handleSelectTag, selectedTag }: Tags) {
  return (
    <div className="flex flex-col gap-5 mt-5 mb-3 py-5 border border-base-content p-10 rounded-lg shrink-0">
      <h2 className="font-bold text-start ml-2">나의 태그</h2>
      <div className="flex flex-col gap-2 flex-wrap">
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
