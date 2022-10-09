import { sections } from "./Header";
import Link from "next/link";

const Footer = (props) => {
  return (
    <footer>
      <div className="container">
        <div className="w-full md:w-1/2 pt-8 md:pt-0">
          <h1>{props.siteTitle}</h1>
          <Link href="/contact-us">
            <button>contact</button>
          </Link>
        </div>
        <div className="w-full md:w-1/2 footer-nav">
          {sections.map((s) => (
            <Link href={s.href} key={s.href}>
              <span>{s.text}</span>
            </Link>
          ))}
        </div>
      </div>
      <p className="container text-xs leading-10">
        &copy; {new Date().getFullYear()} {props.organization}
      </p>
    </footer>
  );
};

export default Footer;
