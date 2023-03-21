import * as React from 'react';
import Footer from './Footer';
import Navbar from './Navbar';

const Layout: React.FunctionComponent<React.PropsWithChildren> = ({ children }) => {
    return (
        <>
            <header>
                <Navbar />
            </header>
            <main>
                {children}
            </main>
            <footer>
                <Footer />
            </footer>
        </>
    );
};

export default Layout;
