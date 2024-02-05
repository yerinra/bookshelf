type Tag = {
  selectedTag: string | null;
  handleSelectTag: (tagName: string) => void;
  tag: string;
};
export default function Tag({ selectedTag, handleSelectTag, tag }: Tag) {
  return (
    <button
      className={`btn btn-xs btn-outline ${selectedTag == tag && "bg-black"}`}
      onClick={() => handleSelectTag(tag)}
    >
      {tag}
    </button>
  );
}
