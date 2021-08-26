import React from 'react';
import { MediaMini } from '../application/customTypes';

import CardMini from './CardMini';

import featuredAction from '../curatedAnimes/featured_action.json';
import featuredDrama from '../curatedAnimes/featured_drama.json';
import featuredPsychological from '../curatedAnimes/featured_psychological.json';

import styles from './FeaturedSectionHome.module.scss';

const FeaturedSectionHome: React.FC<{}> = () => {

    const featuredRow = (featuredAnimes: Array<MediaMini>, genre: string): JSX.Element => {
        const row1 = (): JSX.Element => {
            let jsx = [];

            for (let i = 0; i < 3; i++) {
                jsx.push(
                    <CardMini 
                        key={`${genre}-card-${i}`}
                        anime={featuredAnimes[i]}
                        index={i}
                        isRecommendation={true}
                    />
                )
            }

            return (
                <div className={styles.card_row}>
                    {jsx}
                </div>
            )
        }
        const row2 = (): JSX.Element => {
            let jsx = [];

            for (let i = 3; i < 6; i++) {
                jsx.push(
                    <CardMini 
                        key={`${genre}-card-${i}`}
                        anime={featuredAnimes[i]}
                        index={i}
                        isRecommendation={true}
                    />
                )
            }

            return (
                <div className={styles.card_row}>
                    {jsx}
                </div>
            )
        }
        const row3 = (): JSX.Element => {
            let jsx = [];

            for (let i = 6; i < 9; i++) {
                jsx.push(
                    <CardMini 
                        key={`${genre}-card-${i}`}
                        anime={featuredAnimes[i]}
                        index={i}
                        isRecommendation={true}
                    />
                )
            }

            return (
                <div className={styles.card_row}>
                    {jsx}
                </div>
            )
        }

        return (
            <>
                {row1()}
                {row2()}
                {row3()}
            </>
        )
    };

    return (
        <section className={styles.featured} id="featured">
            
            <h2>Featured Anime</h2>

            <div className={styles.featured_sliders}>
                <section>
                    <h3>Action</h3>
                    <div className={styles.slider}>
                        { featuredRow(featuredAction, 'action') }
                    </div>
                </section>
                <section>
                    <h3>Drama</h3>
                    <div className={styles.slider}>
                        { featuredRow(featuredDrama, 'drama') }
                    </div>
                </section>
                <section>
                    <h3>Psychological</h3>
                    <div className={styles.slider}>
                        { featuredRow(featuredPsychological, 'psychological') }
                    </div>
                </section>
            </div>

        </section>
    )
};

export default FeaturedSectionHome;