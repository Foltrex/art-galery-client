import Link from 'next/link';
import * as React from 'react';
import styles from './navbar.module.css';

interface INavbarProps {
}

const Navbar: React.FunctionComponent<INavbarProps> = (props) => {
  return (
    <>
        <div className={styles.navbar}>
          <Link href='/' className={styles['logo-link']} >
            Art Galery
          </Link>
        </div>
    </>
  );
};

export default Navbar;
