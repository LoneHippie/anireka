import React, { Suspense } from 'react';
import { Helmet } from 'react-helmet';

import Navbar from '../components/Navbar';
import HeaderHome from '../components/HeaderHome';
import AboutSectionHome from '../components/AboutSectionHome';

// import styles from './home.module.scss';

const Home: React.FC<{}> = () => {

    const FeaturedSectionHome = React.useMemo(() => React.lazy(() => import('../components/FeaturedSectionHome')), []);

    return (
        <main>

            <Helmet>
                <html lang="en" />
                <meta name="description" content="Search for anime and get fresh recommendations" />
                <title>Anireka | Anime Search and Recommendations</title>
            </Helmet>

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