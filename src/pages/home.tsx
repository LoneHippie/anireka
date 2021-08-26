import React, { Suspense } from 'react';

import Navbar from '../components/Navbar';
import HeaderHome from '../components/HeaderHome';
import AboutSectionHome from '../components/AboutSectionHome';

// import styles from './home.module.scss';

const Home: React.FC<{}> = () => {

    const FeaturedSectionHome = React.useMemo(() => React.lazy(() => import('../components/FeaturedSectionHome')), []);

    return (
        <main>

            <Navbar />

            <HeaderHome />

            <AboutSectionHome />

            <Suspense fallback={<section></section>}>
                <FeaturedSectionHome />
            </Suspense>

        </main>
    )
};

export default Home;