import React, { Suspense } from 'react';
import { Helmet } from 'react-helmet';
import { Navbar, HeaderHome, AboutSectionHome, Footer } from '../components';

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

            <Footer />

        </main>
    )
};

export default Home;