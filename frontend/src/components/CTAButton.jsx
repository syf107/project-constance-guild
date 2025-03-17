import { Link } from "react-router";

export default function CTAButton({ text }) {
  return (
    <Link
      to="/register"
      className="indent-0 self-center w-fit border-4 border-double px-5 py-2 text-xl text-center font-bold hover:text-amber-800 hover:bg-green-500  bg-green-800 text-amber-500 hover:cursor-pointer transition-colors duration-200"
    >
      {text}
    </Link>
  );
}
