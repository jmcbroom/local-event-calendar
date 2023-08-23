import Link from "next/link";
import NavMenu from "./NavMenu";

export const sections = [
  {
    href: `/events`,
    text: `events`,
  },
  {
    href: `/venues`,
    text: `venues`,
  },
];

const Header = ({ }) => {
  return (
    <header className="bg-primary-light dark:bg-primary-dark bg-opacity-80 px-4">
      <div className="max-w-5xl py-2 mx-auto flex items-center justify-between">
        <Link href={`/`} passHref>
          <h1 className="header font-bold text-gray-700 dark:text-gray-300 text-xl m-0">
            calendar
            <span className="text-gray-500 dark:text-gray-400">.det.city</span>
          </h1>
        </Link>
        <NavMenu />
      </div>
    </header>
  );
};

export default Header;
