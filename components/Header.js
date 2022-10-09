import Link from "next/link";
import { useRouter } from "next/router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

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

const Header = ({ nav, showNav, siteTitle, description }) => {
  const router = useRouter();

  return (
    <header>
      <div className="container">
        <Link href="/" passHref>
          <h1 className="md:w-1/3 font-bold">{siteTitle}</h1>
        </Link>

        <nav>
          <ul>
            <Link href={`/events`} passHref>
              <li className={"/events" === router.pathname ? "nav-here bg-event bg-opacity-50" : "bg-event bg-opacity-50"}>
                events
              </li>
            </Link>
            <Link href={`/venues`} passHref>
              <li className={"/venues" === router.pathname ? "nav-here bg-venue bg-opacity-50" : "bg-venue bg-opacity-50"}>
                venues
              </li>
            </Link>
          </ul>
          <div onClick={() => showNav(true)}>
            <FontAwesomeIcon icon={faBars} className="block md:hidden h-6 hover:cursor-pointer" />
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
