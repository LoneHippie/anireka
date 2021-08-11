import React from 'react';

import Navbar from '../components/Navbar';
import HeaderSlash from '../components/HeaderSlash';

import styles from './home.module.scss';

const Home: React.FC<{}> = () => {

    return (
        <main>

            <Navbar />

            <HeaderSlash />

            <section className={styles.home_body}>
                
                <div className={styles.body_title}>Title</div>

            </section>

        </main>
    )
};

export default Home;