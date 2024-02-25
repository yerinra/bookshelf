import { BookmarkFilledIcon, BookmarkIcon } from "@radix-ui/react-icons";
import Button from "../../atoms/Button";

type ButtonProps = {
  handleClick: () => void;
};

export function DefaultButton({ handleClick }: ButtonProps) {
  return (
    <>
      <Button onClick={handleClick}>
        <BookmarkFilledIcon width={20} height={20} className="mr-2" />
        <div>책장에 추가된 책입니다.</div>
      </Button>
    </>
  );
}

export function AddedButton({ handleClick }: ButtonProps) {
  return (
    <>
      <Button theme="reverse" onClick={handleClick}>
        <BookmarkIcon width={20} height={20} className="mr-2" />
        <div>책장에 추가하기</div>
      </Button>
    </>
  );
}
