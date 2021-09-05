import React from 'react';
import { Link } from 'react-router-dom';

import Example1 from '../images/example-card-eva.png';
import Example2 from '../images/example-card-fma.png';
import Example3 from '../images/example-card-soul.png';
import Clip from '../images/clip-slash-pink.svg';

import styles from './AboutSectionHome.module.scss';

const AboutSectionHome: React.FC<{}> = () => {

    return (
        <section className={styles.about}>
                
            <h2 className={styles.about_title}>Fast, Efficient</h2>

            <p>AniReka is a faster slimmed down alternative to other anime search websites like MyAnimeList with the mission of helping you find and explore new and exciting anime without the bloat and clunky user experience of other websites.</p>

            <div className={styles.about_example_cards}>
                <div className={styles.card_1}>
                    <img 
                        src={Example1}
                        alt="example of card for the anime Neon Genesis Evangelion"
                        loading="lazy"
                    />
                </div>

                <div className={styles.card_2}>
                    <img 
                        src={Example2}
                        alt="example of card for the anime Fullmetal Alchemist: Brotherhood"
                        loading="lazy"
                    />
                </div>

                <div className={styles.card_3}>
                    <img 
                        src={Example3}
                        alt="example of card for the anime Soul Eater"
                        loading="lazy"
                    />
                </div>
            </div>

            <p>Search by popularity, name, or browse with multiple genre filters with ease with our <Link to="/search">search engine.</Link> Newer to anime or not sure what you're looking for? Head to our <Link to="/survey">recommendation survey</Link> or scroll down to the featured section for curated results.</p>

            <img 
                className={styles.bottom_clip}
                src={Clip}
                alt=""
                aria-hidden="true"
            />

        </section>
    )
};

export default AboutSectionHome;