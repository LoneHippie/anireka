import React from 'react';

import Navbar from '../components/Navbar';
import HeaderHome from '../components/HeaderHome';
import AboutSectionHome from '../components/AboutSectionHome';
import FeaturedSectionHome from '../components/FeaturedSectionHome';

// import styles from './home.module.scss';

const Home: React.FC<{}> = () => {

    return (
        <main>

            <Navbar />

            <HeaderHome />

            <AboutSectionHome />

            <FeaturedSectionHome />

        </main>
    )
};

export default Home;