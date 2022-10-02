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
  }
];

const Header = ({ nav, showNav, siteTitle, description }) => {
  const router = useRouter();

  return (
    <header>
      <div className="container">
        <Link href="/" passHref>
          <h1 className="md:w-1/3 font-semibold">{siteTitle}</h1>
        </Link>

        <nav>
          <ul>
            {sections.map((s) => (
              <Link href={s.href} key={s.text} passHref>
                <li
                  className={
                    s.href === router.pathname ? "nav-here hover:bg-white" : ""
                  }
                >
                  {s.text}
                </li>
              </Link>
            ))}
          </ul>
          <div onClick={() => showNav(true)}>
            <FontAwesomeIcon icon={faBars} className="block md:hidden h-6" />
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
