import React from "react";
import Link from "next/link";

const NavMenu = () => {
  return (
    <nav className="flex items-center justify-between">
      <ul className="flex items-center justify-between">
        <li className="mx-2">
          <Link href={`/`} passHref>
            <a className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100">
              home
            </a>
          </Link>
        </li>
        <li className="mx-2">
          <Link href={`/events`} passHref>
            <a className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100">
              events
            </a>
          </Link>
        </li>
        <li className="mx-2">
          <Link href={`/venues`} passHref>
            <a className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100">
              venues
            </a>
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavMenu;
