import { faWindowClose } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import { useState } from 'react';
import Footer from './Footer';
import Header, { sections } from './Header';
import { Helmet } from "react-helmet";
import { ThemeProvider } from '../hooks/ThemeContext';

export default function Layout(props) {

  let [nav, showNav] = useState(false)

  return (
    <ThemeProvider>

      <Helmet>
        <meta charSet="utf-8" />
        <title>calendar.det.city</title>
        <link rel="canonical" href="https://calendar.det.city" />
      </Helmet>
      {!nav && <Header { ...{nav, showNav, ...props}} />}

      {nav && 
        <div className="absolute w-screen h-screen bg-tertiary bg-opacity-70 p-4">
          <FontAwesomeIcon icon={faWindowClose} onClick={() => showNav(false)} className='h-6 absolute right-6 top-5 text-dkgray' />
          <div className="">
            {sections.map(s => (
              <Link href={s.href} key={s.href} passHref>
                <h3 className="font-medium underline text-dkgray" onClick={() => showNav(false)}>{s.text}</h3>
              </Link>
            ))}
          </div>
        </div>
      }

      {!nav && <main>
        {props.children}
      </main>}

      {!nav && <Footer {...props} />}
    </ThemeProvider>
  )
}
