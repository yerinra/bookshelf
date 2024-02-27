import { Link } from "react-router-dom";
import Button from "../../atoms/Button";
import { FrameIcon } from "@radix-ui/react-icons";

export default function Logo() {
  return (
    <Link to="/" className="hidden sm:flex items-center justify-center gap-3">
      <Button theme="circle-accent" aria="logo icon">
        <FrameIcon width="20" height="20" />
      </Button>
      <h1 className="text-xl font-black cursor-pointer">BOOK:SHELF</h1>
    </Link>
  );
}
