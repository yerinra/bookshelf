import { Cross1Icon } from "@radix-ui/react-icons";

type BookRemoveBtnProps = {
  onBookRemove: (isbn13: string) => Promise<void>;
  isbn13: string;
};

export default function BookRemoveBtn({
  onBookRemove,
  isbn13,
}: BookRemoveBtnProps) {
  return (
    <button
      className="p-2 absolute top-1 right-1"
      onClick={() => onBookRemove(isbn13)}
      aria-label="remove book"
    >
      <Cross1Icon className="text-3xl " />
    </button>
  );
}
