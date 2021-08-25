import React from 'react';

import Navbar from '../components/Navbar';
import HeaderHome from '../components/HeaderHome';
import AboutSectionHome from '../components/AboutSectionHome';

// import styles from './home.module.scss';

const Home: React.FC<{}> = () => {

    return (
        <main>

            <Navbar />

            <HeaderHome />

            <AboutSectionHome />

        </main>
    )
};

export default Home;